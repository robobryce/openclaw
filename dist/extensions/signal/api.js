import { i as resolveSignalAccount, n as listSignalAccountIds, r as resolveDefaultSignalAccountId, t as listEnabledSignalAccounts } from "../../accounts-aLqQteEA.js";
import { a as isSignalSenderAllowed, c as resolveSignalRecipient, d as looksLikeSignalTargetId, f as normalizeSignalMessagingTarget, i as isSignalGroupAllowed, l as resolveSignalSender, n as formatSignalSenderDisplay, o as normalizeSignalAllowRecipient, r as formatSignalSenderId, s as resolveSignalPeerId, t as formatSignalPairingIdLine, u as looksLikeUuid } from "../../identity-CzKefpW_.js";
import { i as resolveSignalOutboundTarget, n as createSignalPluginBase, r as signalSetupWizard, t as signalPlugin } from "../../channel-BXM-r6A6.js";
import { n as markdownToSignalTextChunks, t as markdownToSignalText } from "../../format-e6l4-fNr.js";
import { n as sendReactionSignal, t as removeReactionSignal } from "../../reaction-runtime-api-Bb1rbTcR.js";
import { n as resolveSignalReactionLevel, t as signalMessageActions } from "../../message-actions-BUuC7c61.js";
import { r as normalizeSignalAccountInput, s as signalSetupAdapter } from "../../setup-core-Ct0v9Xs6.js";
import { a as looksLikeArchive, n as extractSignalCliArchive, o as pickAsset, r as installSignalCli } from "../../install-signal-cli-Cbf1L2Bd.js";
import { t as monitorSignalProvider } from "../../monitor-B3Lvhknx.js";
import { n as sendReadReceiptSignal, r as sendTypingSignal, t as sendMessageSignal } from "../../send-CSy_XchY.js";
import { t as probeSignal } from "../../probe-BTlJqyW2.js";
//#region extensions/signal/src/channel.setup.ts
const signalSetupPlugin = { ...createSignalPluginBase({
	setupWizard: signalSetupWizard,
	setup: signalSetupAdapter
}) };
//#endregion
export { extractSignalCliArchive, formatSignalPairingIdLine, formatSignalSenderDisplay, formatSignalSenderId, installSignalCli, isSignalGroupAllowed, isSignalSenderAllowed, listEnabledSignalAccounts, listSignalAccountIds, looksLikeArchive, looksLikeSignalTargetId, looksLikeUuid, markdownToSignalText, markdownToSignalTextChunks, monitorSignalProvider, normalizeSignalAccountInput, normalizeSignalAllowRecipient, normalizeSignalMessagingTarget, pickAsset, probeSignal, removeReactionSignal, resolveDefaultSignalAccountId, resolveSignalAccount, resolveSignalOutboundTarget, resolveSignalPeerId, resolveSignalReactionLevel, resolveSignalRecipient, resolveSignalSender, sendMessageSignal, sendReactionSignal, sendReadReceiptSignal, sendTypingSignal, signalMessageActions, signalPlugin, signalSetupPlugin };
