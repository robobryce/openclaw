import { resolveSendableOutboundReplyParts } from "openclaw/plugin-sdk/reply-payload";
import { getReplyPayloadMetadata } from "../reply-payload.js";
import type { ReplyPayload } from "../types.js";
import { createBlockReplyCoalescer } from "./block-reply-coalescer.js";
import type { BlockStreamingCoalescing } from "./block-streaming.js";

export type BlockReplyPipeline = {
  enqueue: (payload: ReplyPayload) => void;
  flush: (options?: { force?: boolean }) => Promise<void>;
  stop: () => void;
  hasBuffered: () => boolean;
  didStream: () => boolean;
  isAborted: () => boolean;
  hasSentPayload: (payload: ReplyPayload) => boolean;
  getSentMediaUrls: () => readonly string[];
};

export type BlockReplyBuffer = {
  shouldBuffer: (payload: ReplyPayload) => boolean;
  onEnqueue?: (payload: ReplyPayload) => void;
  finalize?: (payload: ReplyPayload) => ReplyPayload;
};

export function createAudioAsVoiceBuffer(params: {
  isAudioPayload: (payload: ReplyPayload) => boolean;
}): BlockReplyBuffer {
  let seenAudioAsVoice = false;
  return {
    onEnqueue: (payload) => {
      if (payload.audioAsVoice) {
        seenAudioAsVoice = true;
      }
    },
    shouldBuffer: (payload) => params.isAudioPayload(payload),
    finalize: (payload) => (seenAudioAsVoice ? { ...payload, audioAsVoice: true } : payload),
  };
}

export function createBlockReplyPayloadKey(payload: ReplyPayload): string {
  const reply = resolveSendableOutboundReplyParts(payload);
  return JSON.stringify({
    text: reply.trimmedText,
    mediaList: reply.mediaUrls,
    replyToId: payload.replyToId ?? null,
  });
}

export function createBlockReplyContentKey(payload: ReplyPayload): string {
  const reply = resolveSendableOutboundReplyParts(payload);
  // Content-only key used for final-payload suppression after block streaming.
  // This intentionally ignores replyToId so a streamed threaded payload and the
  // later final payload still collapse when they carry the same content.
  return JSON.stringify({ text: reply.trimmedText, mediaList: reply.mediaUrls });
}

const withTimeout = async <T>(
  promise: Promise<T>,
  timeoutMs: number,
  timeoutError: Error,
): Promise<T> => {
  if (!timeoutMs || timeoutMs <= 0) {
    return promise;
  }
  let timer: NodeJS.Timeout | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(timeoutError), timeoutMs);
  });
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timer) {
      clearTimeout(timer);
    }
  }
};

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

// Exponential backoff capped at 30s. Sequence: 1s, 2s, 4s, 8s, 16s, 30s, 30s…
const computeRetryBackoffMs = (attempt: number): number => {
  const base = 1_000 * 2 ** Math.max(0, attempt - 1);
  return Math.min(30_000, base);
};

export function createBlockReplyPipeline(params: {
  onBlockReply: (
    payload: ReplyPayload,
    options?: { abortSignal?: AbortSignal; timeoutMs?: number },
  ) => Promise<void> | void;
  timeoutMs: number;
  coalescing?: BlockStreamingCoalescing;
  buffer?: BlockReplyBuffer;
}): BlockReplyPipeline {
  const { onBlockReply, timeoutMs, coalescing, buffer } = params;
  const sentKeys = new Set<string>();
  const sentContentKeys = new Set<string>();
  const sentMediaUrls = new Set<string>();
  const pendingKeys = new Set<string>();
  const seenKeys = new Set<string>();
  const bufferedKeys = new Set<string>();
  const bufferedPayloadKeys = new Set<string>();
  const bufferedPayloads: ReplyPayload[] = [];
  const streamedTextFragments: string[] = [];
  let bufferedAssistantMessageIndex: number | undefined;
  let sendChain: Promise<void> = Promise.resolve();
  let aborted = false;
  let didStream = false;

  const hasSeenOrQueuedPayloadKey = (payloadKey: string) =>
    seenKeys.has(payloadKey) || sentKeys.has(payloadKey) || pendingKeys.has(payloadKey);

  const flushBufferedAssistantBlock = () => {
    bufferedAssistantMessageIndex = undefined;
    void coalescer?.flush({ force: true });
  };

  const sendPayload = (payload: ReplyPayload, bypassSeenCheck: boolean = false) => {
    if (aborted) {
      return;
    }
    const payloadKey = createBlockReplyPayloadKey(payload);
    const contentKey = createBlockReplyContentKey(payload);
    if (!bypassSeenCheck) {
      if (seenKeys.has(payloadKey)) {
        return;
      }
      seenKeys.add(payloadKey);
    }
    if (sentKeys.has(payloadKey) || pendingKeys.has(payloadKey)) {
      return;
    }
    pendingKeys.add(payloadKey);

    sendChain = sendChain
      .then(async () => {
        // Retry-until-success delivery. The previous behavior — abort the
        // entire pipeline (`aborted = true`) on the first 15s timeout —
        // silently dropped every remaining chunk in the turn, which the
        // user perceived as missing replies. Per the "no drops, ever"
        // contract documented in gateroom issue #339, every retryable
        // failure (timeout, transient network/Mattermost error) is
        // retried with exponential backoff capped at 30s; ordering is
        // preserved by the existing `sendChain` serialization.
        //
        // Trade-off: a permanently-bad payload (e.g., the upstream
        // refuses it deterministically) head-of-lines the rest of the
        // turn. We surface every retry via `console.warn` so a stuck
        // chunk is visible in journalctl rather than silent.
        let attempt = 0;
        // eslint-disable-next-line no-constant-condition
        while (true) {
          attempt++;
          const attemptAbort = new AbortController();
          const timeoutError = new Error(
            `block reply delivery timed out after ${timeoutMs}ms (attempt ${attempt})`,
          );
          try {
            await withTimeout(
              Promise.resolve(
                onBlockReply(payload, {
                  abortSignal: attemptAbort.signal,
                  timeoutMs,
                }),
              ),
              timeoutMs,
              timeoutError,
            );
            if (attempt > 1) {
              console.info(
                `[block-reply-pipeline] delivered on attempt ${attempt} (after ${attempt - 1} retries)`,
              );
            }
            return true;
          } catch (err) {
            // Cancel the in-flight upstream call so a slow delivery doesn't
            // race the retry's fresh call.
            attemptAbort.abort();
            const wait = computeRetryBackoffMs(attempt);
            console.warn(
              `[block-reply-pipeline] delivery attempt ${attempt} failed: ${String(err)}; retrying in ${wait}ms`,
            );
            await sleep(wait);
          }
        }
      })
      .then((didSend) => {
        if (!didSend) {
          return;
        }
        sentKeys.add(payloadKey);
        sentContentKeys.add(contentKey);
        const reply = resolveSendableOutboundReplyParts(payload);
        for (const mediaUrl of reply.mediaUrls) {
          sentMediaUrls.add(mediaUrl);
        }
        if (!reply.hasMedia && reply.trimmedText) {
          streamedTextFragments.push(reply.trimmedText);
        }
        didStream = true;
      })
      .catch((err) => {
        // The retry loop above exits only via successful `return true`,
        // so reaching this branch is a programmer-level surprise (e.g.
        // the loop itself threw synchronously). Don't silently drop.
        console.error(`[block-reply-pipeline] unexpected pipeline error: ${String(err)}`);
      })
      .finally(() => {
        pendingKeys.delete(payloadKey);
      });
  };

  const coalescer = coalescing
    ? createBlockReplyCoalescer({
        config: coalescing,
        shouldAbort: () => aborted,
        onFlush: (payload) => {
          bufferedAssistantMessageIndex = undefined;
          bufferedKeys.clear();
          sendPayload(payload, /* bypassSeenCheck */ true);
        },
      })
    : null;

  const bufferPayload = (payload: ReplyPayload) => {
    buffer?.onEnqueue?.(payload);
    if (!buffer?.shouldBuffer(payload)) {
      return false;
    }
    const payloadKey = createBlockReplyPayloadKey(payload);
    if (hasSeenOrQueuedPayloadKey(payloadKey) || bufferedPayloadKeys.has(payloadKey)) {
      return true;
    }
    seenKeys.add(payloadKey);
    bufferedPayloadKeys.add(payloadKey);
    bufferedPayloads.push(payload);
    return true;
  };

  const flushBuffered = () => {
    if (!bufferedPayloads.length) {
      return;
    }
    for (const payload of bufferedPayloads) {
      const finalPayload = buffer?.finalize?.(payload) ?? payload;
      sendPayload(finalPayload, /* bypassSeenCheck */ true);
    }
    bufferedPayloads.length = 0;
    bufferedPayloadKeys.clear();
  };

  const enqueue = (payload: ReplyPayload) => {
    if (aborted) {
      return;
    }
    if (bufferPayload(payload)) {
      return;
    }
    const hasMedia = resolveSendableOutboundReplyParts(payload).hasMedia;
    if (hasMedia) {
      void coalescer?.flush({ force: true });
      sendPayload(payload, /* bypassSeenCheck */ false);
      return;
    }
    if (coalescer) {
      const assistantMessageIndex = getReplyPayloadMetadata(payload)?.assistantMessageIndex;
      if (
        assistantMessageIndex !== undefined &&
        bufferedAssistantMessageIndex !== undefined &&
        assistantMessageIndex !== bufferedAssistantMessageIndex &&
        coalescer.hasBuffered()
      ) {
        // Logical assistant blocks must not be merged together by the generic
        // coalescer. Force-flush the previous buffered block before starting a
        // new assistant-message block.
        flushBufferedAssistantBlock();
      }
      const payloadKey = createBlockReplyPayloadKey(payload);
      if (hasSeenOrQueuedPayloadKey(payloadKey) || bufferedKeys.has(payloadKey)) {
        return;
      }
      seenKeys.add(payloadKey);
      bufferedKeys.add(payloadKey);
      bufferedAssistantMessageIndex = assistantMessageIndex;
      coalescer.enqueue(payload);
      return;
    }
    sendPayload(payload, /* bypassSeenCheck */ false);
  };

  const flush = async (options?: { force?: boolean }) => {
    await coalescer?.flush(options);
    bufferedAssistantMessageIndex = undefined;
    flushBuffered();
    await sendChain;
  };

  const stop = () => {
    coalescer?.stop();
  };

  return {
    enqueue,
    flush,
    stop,
    hasBuffered: () => coalescer?.hasBuffered() || bufferedPayloads.length > 0,
    didStream: () => didStream,
    isAborted: () => aborted,
    hasSentPayload: (payload) => {
      const payloadKey = createBlockReplyContentKey(payload);
      if (sentContentKeys.has(payloadKey)) {
        return true;
      }
      if (!didStream || streamedTextFragments.length === 0) {
        return false;
      }
      const reply = resolveSendableOutboundReplyParts(payload);
      if (reply.hasMedia || !reply.trimmedText) {
        return false;
      }
      const normalize = (text: string) => text.replace(/\s+/g, "");
      return normalize(streamedTextFragments.join("")) === normalize(reply.trimmedText);
    },
    getSentMediaUrls: () => Array.from(sentMediaUrls),
  };
}
