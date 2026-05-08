import { u as resolveStorePath } from "./paths-BmdY-Qui.js";
import { a as updateLastRoute, n as readSessionUpdatedAt, r as recordSessionMetaFromInbound } from "./store-DPr34eb5.js";
import "./sessions-w65gbqiC.js";
import { a as createReplyDispatcherWithTyping, c as withReplyDispatcher, o as dispatchReplyFromConfig, s as settleReplyDispatcher } from "./dispatch-BDWDnRCB.js";
import { u as saveMediaBuffer } from "./store-yO9n3Sa2.js";
import { r as fetchRemoteMedia } from "./fetch-fBPR6Vgy.js";
import { n as resolveChannelGroupRequireMention, t as resolveChannelGroupPolicy } from "./group-policy-sHYDXuCI.js";
import { a as chunkText, c as resolveTextChunkLimit, i as chunkMarkdownTextWithMode, o as chunkTextWithMode, r as chunkMarkdownText, s as resolveChunkMode, t as chunkByNewline } from "./chunk-2yGTHeC0.js";
import { t as loadChannelOutboundAdapter } from "./load-RNY0hirT.js";
import { i as resolveAgentRoute, t as buildAgentSessionKey } from "./resolve-route-DKDXty1t.js";
import { i as resolveHumanDelayConfig, r as resolveEffectiveMessagesConfig } from "./identity-BJqKZTLs.js";
import { n as shouldHandleTextCommands } from "./commands-text-routing-NdPQ_D8J.js";
import "./commands-registry-CbILglW_.js";
import { i as matchesMentionWithExplicit, n as buildMentionRegexes, r as matchesMentionPatterns } from "./mentions-B5RV0RtN.js";
import { t as finalizeInboundContext } from "./inbound-context-lwvobuu0.js";
import { t as dispatchReplyWithBufferedBlockDispatcher } from "./provider-dispatcher-Cyz637tU.js";
import { t as convertMarkdownTables } from "./tables-DPya_LrH.js";
import { i as shouldComputeCommandAuthorized, r as isControlCommandMessage, t as hasControlCommand } from "./command-detection-4EqIZse5.js";
import { a as resolveEnvelopeFormatOptions, r as formatInboundEnvelope, t as formatAgentEnvelope } from "./envelope-Dx5eONEL.js";
import { n as resolveInboundDebounceMs, t as createInboundDebouncer } from "./inbound-debounce-CeQdorYl.js";
import { i as shouldAckReaction, n as removeAckReactionAfterReply, r as removeAckReactionHandleAfterReply, t as createAckReactionHandle } from "./ack-reactions-BwiLBGzr.js";
import { t as resolveCommandAuthorizedFromAuthorizers } from "./command-gating-BM56-zBM.js";
import { n as resolveInboundMentionDecision, t as implicitMentionKindWhen } from "./mention-gating-KuO-YfdQ.js";
import { n as setChannelConversationBindingMaxAgeBySessionKey, t as setChannelConversationBindingIdleTimeoutBySessionKey } from "./conversation-bindings-Dwv2c0KB.js";
import { t as recordInboundSession } from "./session-CuZPzZXO.js";
import { a as runPreparedChannelTurn, i as runChannelTurn, o as runResolvedChannelTurn, r as dispatchAssembledChannelTurn, s as buildChannelTurnContext } from "./kernel-BiyY5wxY.js";
import { t as resolveMarkdownTableMode } from "./markdown-tables-BqtpCxKP.js";
import { n as recordChannelActivity, t as getChannelActivity } from "./channel-activity-BwoQNm-p.js";
import { t as buildPairingReply } from "./pairing-messages-tfRhYGcz.js";
import { a as readChannelAllowFromStore, d as upsertChannelPairingRequest } from "./pairing-store-DLrmY769.js";
import { t as createChannelRuntimeContextRegistry } from "./channel-runtime-contexts-CtGkqGQr.js";
//#region src/plugins/runtime/runtime-channel.ts
function createRuntimeChannel() {
	return {
		text: {
			chunkByNewline,
			chunkMarkdownText,
			chunkMarkdownTextWithMode,
			chunkText,
			chunkTextWithMode,
			resolveChunkMode,
			resolveTextChunkLimit,
			hasControlCommand,
			resolveMarkdownTableMode,
			convertMarkdownTables
		},
		reply: {
			dispatchReplyWithBufferedBlockDispatcher,
			createReplyDispatcherWithTyping,
			resolveEffectiveMessagesConfig,
			resolveHumanDelayConfig,
			dispatchReplyFromConfig,
			withReplyDispatcher,
			settleReplyDispatcher,
			finalizeInboundContext,
			formatAgentEnvelope,
			/** @deprecated Prefer `BodyForAgent` + structured user-context blocks (do not build plaintext envelopes for prompts). */
			formatInboundEnvelope,
			resolveEnvelopeFormatOptions
		},
		routing: {
			buildAgentSessionKey,
			resolveAgentRoute
		},
		pairing: {
			buildPairingReply,
			readAllowFromStore: ({ channel, accountId, env }) => readChannelAllowFromStore(channel, env, accountId),
			upsertPairingRequest: ({ channel, id, accountId, meta, env, pairingAdapter }) => upsertChannelPairingRequest({
				channel,
				id,
				accountId,
				meta,
				env,
				pairingAdapter
			})
		},
		media: {
			fetchRemoteMedia,
			saveMediaBuffer
		},
		activity: {
			record: recordChannelActivity,
			get: getChannelActivity
		},
		session: {
			resolveStorePath,
			readSessionUpdatedAt,
			recordSessionMetaFromInbound,
			recordInboundSession,
			updateLastRoute
		},
		mentions: {
			buildMentionRegexes,
			matchesMentionPatterns,
			matchesMentionWithExplicit,
			implicitMentionKindWhen,
			resolveInboundMentionDecision
		},
		reactions: {
			createAckReactionHandle,
			shouldAckReaction,
			removeAckReactionAfterReply,
			removeAckReactionHandleAfterReply
		},
		groups: {
			resolveGroupPolicy: resolveChannelGroupPolicy,
			resolveRequireMention: resolveChannelGroupRequireMention
		},
		debounce: {
			createInboundDebouncer,
			resolveInboundDebounceMs
		},
		commands: {
			resolveCommandAuthorizedFromAuthorizers,
			isControlCommandMessage,
			shouldComputeCommandAuthorized,
			shouldHandleTextCommands
		},
		outbound: { loadAdapter: loadChannelOutboundAdapter },
		turn: {
			run: runChannelTurn,
			runResolved: runResolvedChannelTurn,
			buildContext: buildChannelTurnContext,
			runPrepared: runPreparedChannelTurn,
			dispatchAssembled: dispatchAssembledChannelTurn
		},
		threadBindings: {
			setIdleTimeoutBySessionKey: ({ channelId, targetSessionKey, accountId, idleTimeoutMs }) => setChannelConversationBindingIdleTimeoutBySessionKey({
				channelId,
				targetSessionKey,
				accountId,
				idleTimeoutMs
			}),
			setMaxAgeBySessionKey: ({ channelId, targetSessionKey, accountId, maxAgeMs }) => setChannelConversationBindingMaxAgeBySessionKey({
				channelId,
				targetSessionKey,
				accountId,
				maxAgeMs
			})
		},
		runtimeContexts: createChannelRuntimeContextRegistry()
	};
}
//#endregion
export { createRuntimeChannel as t };
