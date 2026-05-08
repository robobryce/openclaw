import { m as resolveSendableOutboundReplyParts } from "./reply-payload-WdE48c4D.js";
import { n as getReplyPayloadMetadata } from "./reply-payload-Dp9nSOiP.js";
//#region src/auto-reply/reply/block-reply-coalescer.ts
function createBlockReplyCoalescer(params) {
	const { config, shouldAbort, onFlush } = params;
	const minChars = Math.max(1, Math.floor(config.minChars));
	const maxChars = Math.max(minChars, Math.floor(config.maxChars));
	const idleMs = Math.max(0, Math.floor(config.idleMs));
	const joiner = config.joiner ?? "";
	const flushOnEnqueue = config.flushOnEnqueue === true;
	let bufferText = "";
	let bufferReplyToId;
	let bufferAudioAsVoice;
	let bufferIsReasoning;
	let bufferIsCompactionNotice;
	let idleTimer;
	const clearIdleTimer = () => {
		if (!idleTimer) return;
		clearTimeout(idleTimer);
		idleTimer = void 0;
	};
	const resetBuffer = () => {
		bufferText = "";
		bufferReplyToId = void 0;
		bufferAudioAsVoice = void 0;
		bufferIsReasoning = void 0;
		bufferIsCompactionNotice = void 0;
	};
	const scheduleIdleFlush = () => {
		if (idleMs <= 0) return;
		clearIdleTimer();
		idleTimer = setTimeout(() => {
			flush({ force: false });
		}, idleMs);
	};
	const flush = async (options) => {
		clearIdleTimer();
		if (shouldAbort()) {
			resetBuffer();
			return;
		}
		if (!bufferText) return;
		if (!options?.force && !flushOnEnqueue && bufferText.length < minChars) {
			scheduleIdleFlush();
			return;
		}
		const payload = {
			text: bufferText,
			replyToId: bufferReplyToId,
			audioAsVoice: bufferAudioAsVoice,
			isReasoning: bufferIsReasoning,
			isCompactionNotice: bufferIsCompactionNotice
		};
		resetBuffer();
		await onFlush(payload);
	};
	const enqueue = (payload) => {
		if (shouldAbort()) return;
		const reply = resolveSendableOutboundReplyParts(payload);
		const hasMedia = reply.hasMedia;
		const text = reply.text;
		const hasText = reply.hasText;
		if (hasMedia) {
			flush({ force: true });
			onFlush(payload);
			return;
		}
		if (!hasText) return;
		if (flushOnEnqueue) {
			if (bufferText) flush({ force: true });
			bufferReplyToId = payload.replyToId;
			bufferAudioAsVoice = payload.audioAsVoice;
			bufferIsReasoning = payload.isReasoning;
			bufferIsCompactionNotice = payload.isCompactionNotice;
			bufferText = text;
			flush({ force: true });
			return;
		}
		const replyToConflict = Boolean(bufferText && payload.replyToId && (!bufferReplyToId || bufferReplyToId !== payload.replyToId));
		const visibilityConflict = bufferText && (bufferIsReasoning !== payload.isReasoning || bufferIsCompactionNotice !== payload.isCompactionNotice);
		if (bufferText && (replyToConflict || bufferAudioAsVoice !== payload.audioAsVoice || visibilityConflict)) flush({ force: true });
		if (!bufferText) {
			bufferReplyToId = payload.replyToId;
			bufferAudioAsVoice = payload.audioAsVoice;
			bufferIsReasoning = payload.isReasoning;
			bufferIsCompactionNotice = payload.isCompactionNotice;
		}
		const nextText = bufferText ? `${bufferText}${joiner}${text}` : text;
		if (nextText.length > maxChars) {
			if (bufferText) {
				flush({ force: true });
				bufferReplyToId = payload.replyToId;
				bufferAudioAsVoice = payload.audioAsVoice;
				bufferIsReasoning = payload.isReasoning;
				bufferIsCompactionNotice = payload.isCompactionNotice;
				if (text.length >= maxChars) {
					onFlush(payload);
					return;
				}
				bufferText = text;
				scheduleIdleFlush();
				return;
			}
			onFlush(payload);
			return;
		}
		bufferText = nextText;
		if (bufferText.length >= maxChars) {
			flush({ force: true });
			return;
		}
		scheduleIdleFlush();
	};
	return {
		enqueue,
		flush,
		hasBuffered: () => Boolean(bufferText),
		stop: () => clearIdleTimer()
	};
}
//#endregion
//#region src/auto-reply/reply/block-reply-pipeline.ts
function createAudioAsVoiceBuffer(params) {
	let seenAudioAsVoice = false;
	return {
		onEnqueue: (payload) => {
			if (payload.audioAsVoice) seenAudioAsVoice = true;
		},
		shouldBuffer: (payload) => params.isAudioPayload(payload),
		finalize: (payload) => seenAudioAsVoice ? {
			...payload,
			audioAsVoice: true
		} : payload
	};
}
function createBlockReplyPayloadKey(payload) {
	const reply = resolveSendableOutboundReplyParts(payload);
	return JSON.stringify({
		text: reply.trimmedText,
		mediaList: reply.mediaUrls,
		replyToId: payload.replyToId ?? null
	});
}
function createBlockReplyContentKey(payload) {
	const reply = resolveSendableOutboundReplyParts(payload);
	return JSON.stringify({
		text: reply.trimmedText,
		mediaList: reply.mediaUrls
	});
}
const withTimeout = async (promise, timeoutMs, timeoutError) => {
	if (!timeoutMs || timeoutMs <= 0) return promise;
	let timer;
	const timeoutPromise = new Promise((_, reject) => {
		timer = setTimeout(() => reject(timeoutError), timeoutMs);
	});
	try {
		return await Promise.race([promise, timeoutPromise]);
	} finally {
		if (timer) clearTimeout(timer);
	}
};
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const computeRetryBackoffMs = (attempt) => {
	const base = 1e3 * 2 ** Math.max(0, attempt - 1);
	return Math.min(3e4, base);
};
function createBlockReplyPipeline(params) {
	const { onBlockReply, timeoutMs, coalescing, buffer } = params;
	const sentKeys = /* @__PURE__ */ new Set();
	const sentContentKeys = /* @__PURE__ */ new Set();
	const sentMediaUrls = /* @__PURE__ */ new Set();
	const pendingKeys = /* @__PURE__ */ new Set();
	const seenKeys = /* @__PURE__ */ new Set();
	const bufferedKeys = /* @__PURE__ */ new Set();
	const bufferedPayloadKeys = /* @__PURE__ */ new Set();
	const bufferedPayloads = [];
	const streamedTextFragments = [];
	let bufferedAssistantMessageIndex;
	let sendChain = Promise.resolve();
	let aborted = false;
	let didStream = false;
	const hasSeenOrQueuedPayloadKey = (payloadKey) => seenKeys.has(payloadKey) || sentKeys.has(payloadKey) || pendingKeys.has(payloadKey);
	const flushBufferedAssistantBlock = () => {
		bufferedAssistantMessageIndex = void 0;
		coalescer?.flush({ force: true });
	};
	const sendPayload = (payload, bypassSeenCheck = false) => {
		const payloadKey = createBlockReplyPayloadKey(payload);
		const contentKey = createBlockReplyContentKey(payload);
		if (!bypassSeenCheck) {
			if (seenKeys.has(payloadKey)) return;
			seenKeys.add(payloadKey);
		}
		if (sentKeys.has(payloadKey) || pendingKeys.has(payloadKey)) return;
		pendingKeys.add(payloadKey);
		sendChain = sendChain.then(async () => {
			let attempt = 0;
			while (true) {
				attempt++;
				const attemptAbort = new AbortController();
				const timeoutError = /* @__PURE__ */ new Error(`block reply delivery timed out after ${timeoutMs}ms (attempt ${attempt})`);
				try {
					await withTimeout(Promise.resolve(onBlockReply(payload, {
						abortSignal: attemptAbort.signal,
						timeoutMs
					})), timeoutMs, timeoutError);
					if (attempt > 1) console.info(`[block-reply-pipeline] delivered on attempt ${attempt} (after ${attempt - 1} retries)`);
					return true;
				} catch (err) {
					attemptAbort.abort();
					const wait = computeRetryBackoffMs(attempt);
					console.warn(`[block-reply-pipeline] delivery attempt ${attempt} failed: ${String(err)}; retrying in ${wait}ms`);
					await sleep(wait);
				}
			}
		}).then((didSend) => {
			if (!didSend) return;
			sentKeys.add(payloadKey);
			sentContentKeys.add(contentKey);
			const reply = resolveSendableOutboundReplyParts(payload);
			for (const mediaUrl of reply.mediaUrls) sentMediaUrls.add(mediaUrl);
			if (!reply.hasMedia && reply.trimmedText) streamedTextFragments.push(reply.trimmedText);
			didStream = true;
		}).catch((err) => {
			console.error(`[block-reply-pipeline] unexpected pipeline error: ${String(err)}`);
		}).finally(() => {
			pendingKeys.delete(payloadKey);
		});
	};
	const coalescer = coalescing ? createBlockReplyCoalescer({
		config: coalescing,
		shouldAbort: () => aborted,
		onFlush: (payload) => {
			bufferedAssistantMessageIndex = void 0;
			bufferedKeys.clear();
			sendPayload(payload, true);
		}
	}) : null;
	const bufferPayload = (payload) => {
		buffer?.onEnqueue?.(payload);
		if (!buffer?.shouldBuffer(payload)) return false;
		const payloadKey = createBlockReplyPayloadKey(payload);
		if (hasSeenOrQueuedPayloadKey(payloadKey) || bufferedPayloadKeys.has(payloadKey)) return true;
		seenKeys.add(payloadKey);
		bufferedPayloadKeys.add(payloadKey);
		bufferedPayloads.push(payload);
		return true;
	};
	const flushBuffered = () => {
		if (!bufferedPayloads.length) return;
		for (const payload of bufferedPayloads) sendPayload(buffer?.finalize?.(payload) ?? payload, true);
		bufferedPayloads.length = 0;
		bufferedPayloadKeys.clear();
	};
	const enqueue = (payload) => {
		if (bufferPayload(payload)) return;
		if (resolveSendableOutboundReplyParts(payload).hasMedia) {
			coalescer?.flush({ force: true });
			sendPayload(payload, false);
			return;
		}
		if (coalescer) {
			const assistantMessageIndex = getReplyPayloadMetadata(payload)?.assistantMessageIndex;
			if (assistantMessageIndex !== void 0 && bufferedAssistantMessageIndex !== void 0 && assistantMessageIndex !== bufferedAssistantMessageIndex && coalescer.hasBuffered()) flushBufferedAssistantBlock();
			const payloadKey = createBlockReplyPayloadKey(payload);
			if (hasSeenOrQueuedPayloadKey(payloadKey) || bufferedKeys.has(payloadKey)) return;
			seenKeys.add(payloadKey);
			bufferedKeys.add(payloadKey);
			bufferedAssistantMessageIndex = assistantMessageIndex;
			coalescer.enqueue(payload);
			return;
		}
		sendPayload(payload, false);
	};
	const flush = async (options) => {
		await coalescer?.flush(options);
		bufferedAssistantMessageIndex = void 0;
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
			if (sentContentKeys.has(payloadKey)) return true;
			if (!didStream || streamedTextFragments.length === 0) return false;
			const reply = resolveSendableOutboundReplyParts(payload);
			if (reply.hasMedia || !reply.trimmedText) return false;
			const normalize = (text) => text.replace(/\s+/g, "");
			return normalize(streamedTextFragments.join("")) === normalize(reply.trimmedText);
		},
		getSentMediaUrls: () => Array.from(sentMediaUrls)
	};
}
//#endregion
export { createBlockReplyContentKey as n, createBlockReplyPipeline as r, createAudioAsVoiceBuffer as t };
