import { a as resolveServicePrefixedAllowTarget, c as resolveServicePrefixedTarget, i as parseChatTargetPrefixesOrThrow, o as resolveServicePrefixedChatTarget, r as parseChatAllowTargetPrefixes, s as resolveServicePrefixedOrChatAllowTarget, t as createAllowedChatSenderMatcher } from "../../chat-target-prefixes-CD-a_zj2.js";
import { a as listIMessageAccountIds, i as listEnabledIMessageAccounts, o as resolveDefaultIMessageAccountId, s as resolveIMessageAccount } from "../../media-contract-CMYIpYsR.js";
import { a as resolveIMessageConversationIdFromTarget, c as isAllowedIMessageSender, d as parseIMessageAllowTarget, f as parseIMessageTarget, i as normalizeIMessageAcpConversationId, l as looksLikeIMessageExplicitTargetId, m as normalizeIMessageMessagingTarget, n as resolveIMessageInboundConversationId, o as formatIMessageChatTarget, p as looksLikeIMessageTargetId, r as matchIMessageAcpConversation, s as inferIMessageTargetChatType, u as normalizeIMessageHandle } from "../../sanitize-outbound-vFVap9dp.js";
import { n as createIMessageConversationBindingManager, t as __testing } from "../../conversation-bindings-HC_glKKy.js";
import { n as resolveIMessageGroupToolPolicy, t as resolveIMessageGroupRequireMention } from "../../group-policy-BlKzXFAx.js";
import { a as imessageSetupAdapter } from "../../setup-core-DCZcnIkx.js";
import { n as createIMessagePluginBase, r as imessageSetupWizard, t as imessagePlugin } from "../../channel-Crw_7LrL.js";
import { t as IMESSAGE_LEGACY_OUTBOUND_SEND_DEP_KEYS } from "../../outbound-send-deps-C8bSz2OL.js";
import { r as DEFAULT_IMESSAGE_PROBE_TIMEOUT_MS, t as probeIMessage } from "../../probe-CBUWG7dX.js";
//#region extensions/imessage/src/channel.setup.ts
const imessageSetupPlugin = { ...createIMessagePluginBase({
	setupWizard: imessageSetupWizard,
	setup: imessageSetupAdapter
}) };
//#endregion
export { DEFAULT_IMESSAGE_PROBE_TIMEOUT_MS, IMESSAGE_LEGACY_OUTBOUND_SEND_DEP_KEYS, __testing, createAllowedChatSenderMatcher, createIMessageConversationBindingManager, formatIMessageChatTarget, imessagePlugin, imessageSetupPlugin, inferIMessageTargetChatType, isAllowedIMessageSender, listEnabledIMessageAccounts, listIMessageAccountIds, looksLikeIMessageExplicitTargetId, looksLikeIMessageTargetId, matchIMessageAcpConversation, normalizeIMessageAcpConversationId, normalizeIMessageHandle, normalizeIMessageMessagingTarget, parseChatAllowTargetPrefixes, parseChatTargetPrefixesOrThrow, parseIMessageAllowTarget, parseIMessageTarget, probeIMessage, resolveDefaultIMessageAccountId, resolveIMessageAccount, resolveIMessageConversationIdFromTarget, resolveIMessageGroupRequireMention, resolveIMessageGroupToolPolicy, resolveIMessageInboundConversationId, resolveServicePrefixedAllowTarget, resolveServicePrefixedChatTarget, resolveServicePrefixedOrChatAllowTarget, resolveServicePrefixedTarget };
