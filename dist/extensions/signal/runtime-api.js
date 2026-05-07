import { t as formatDocsLink } from "../../links-dQIIPEtq.js";
import { t as formatCliCommand } from "../../command-format-ut6bcRZg.js";
import { l as normalizeE164 } from "../../utils-D5swhEXt.js";
import { n as normalizeAccountId, t as DEFAULT_ACCOUNT_ID } from "../../account-id-Bj7l9NI7.js";
import { o as SignalConfigSchema } from "../../zod-schema.providers-whatsapp-dJW3tOV6.js";
import { r as buildChannelConfigSchema } from "../../config-schema-BX6riGDG.js";
import { a as chunkText } from "../../chunk-Dhvlxa7H.js";
import { n as deleteAccountFromConfigSection, r as setAccountEnabledInConfigSection } from "../../config-helpers-G0n6NcyZ.js";
import { n as formatPairingApproveHint } from "../../helpers-CCJpztFr.js";
import "../../text-runtime-DiIsWJZ1.js";
import { r as emptyPluginConfigSchema } from "../../config-schema-DjfXik5t.js";
import { s as migrateBaseNameToDefaultAccount, t as applyAccountNameToChannelSection } from "../../setup-helpers-CZcbnIfg.js";
import { c as getChatChannelMeta } from "../../core-DAU5xPEB.js";
import { t as createPluginRuntimeStore } from "../../runtime-store-E8xAaq8m.js";
import { n as resolveAllowlistProviderRuntimeGroupPolicy, r as resolveDefaultGroupPolicy } from "../../runtime-group-policy-DMTxD3cx.js";
import { t as resolveChannelMediaMaxBytes } from "../../media-limits-CaEJGysP.js";
import { t as PAIRING_APPROVED_MESSAGE } from "../../pairing-message-SmMNqErm.js";
import { c as collectStatusIssuesFromLastError, d as createDefaultChannelRuntimeState, n as buildBaseChannelStatusSummary, t as buildBaseAccountStatusSnapshot } from "../../status-helpers-BthQYPrV.js";
import { t as detectBinary } from "../../detect-binary-DV90ZjEm.js";
import "../../setup-tools-DNMkkORy.js";
import "../../reply-runtime-CVC35hLN.js";
import "../../media-runtime-BKpWDq5M.js";
import "../../channel-status-WxT0f96D.js";
import { i as resolveSignalAccount, n as listSignalAccountIds, r as resolveDefaultSignalAccountId, t as listEnabledSignalAccounts } from "../../accounts-CGktK6r-.js";
import { d as looksLikeSignalTargetId, f as normalizeSignalMessagingTarget } from "../../identity-D_Oddoji.js";
import { n as sendReactionSignal, t as removeReactionSignal } from "../../reaction-runtime-api-B0UxnEFQ.js";
import { n as resolveSignalReactionLevel, t as signalMessageActions } from "../../message-actions-ClzKqVT4.js";
import "../../config-api-D5BVuqIP.js";
import { r as installSignalCli } from "../../install-signal-cli-CJIDpZWQ.js";
import { t as monitorSignalProvider } from "../../monitor-BI3b9Ztx.js";
import { t as sendMessageSignal } from "../../send-gplQqe1Y.js";
import { t as probeSignal } from "../../probe-CIufW6ra.js";
//#region extensions/signal/src/runtime.ts
const { setRuntime: setSignalRuntime, clearRuntime: clearSignalRuntime } = createPluginRuntimeStore({
	pluginId: "signal",
	errorMessage: "Signal runtime not initialized"
});
//#endregion
export { DEFAULT_ACCOUNT_ID, PAIRING_APPROVED_MESSAGE, SignalConfigSchema, applyAccountNameToChannelSection, buildBaseAccountStatusSnapshot, buildBaseChannelStatusSummary, buildChannelConfigSchema, chunkText, collectStatusIssuesFromLastError, createDefaultChannelRuntimeState, deleteAccountFromConfigSection, detectBinary, emptyPluginConfigSchema, formatCliCommand, formatDocsLink, formatPairingApproveHint, getChatChannelMeta, installSignalCli, listEnabledSignalAccounts, listSignalAccountIds, looksLikeSignalTargetId, migrateBaseNameToDefaultAccount, monitorSignalProvider, normalizeAccountId, normalizeE164, normalizeSignalMessagingTarget, probeSignal, removeReactionSignal, resolveAllowlistProviderRuntimeGroupPolicy, resolveChannelMediaMaxBytes, resolveDefaultGroupPolicy, resolveDefaultSignalAccountId, resolveSignalAccount, resolveSignalReactionLevel, sendMessageSignal, sendReactionSignal, setAccountEnabledInConfigSection, setSignalRuntime, signalMessageActions };
