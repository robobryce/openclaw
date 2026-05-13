import { t as formatDocsLink } from "../../links-dQIIPEtq.js";
import { t as formatCliCommand } from "../../command-format-ut6bcRZg.js";
import { l as normalizeE164 } from "../../utils-Cs_zUMxj.js";
import { n as normalizeAccountId, t as DEFAULT_ACCOUNT_ID } from "../../account-id-BQglYFe1.js";
import { o as SignalConfigSchema } from "../../zod-schema.providers-whatsapp-DuTfGWr_.js";
import { r as buildChannelConfigSchema } from "../../config-schema-C9dJig7h.js";
import { a as chunkText } from "../../chunk-2yGTHeC0.js";
import { n as deleteAccountFromConfigSection, r as setAccountEnabledInConfigSection } from "../../config-helpers-BQ1npaBe.js";
import { n as formatPairingApproveHint } from "../../helpers-0MvO7C3B.js";
import "../../text-runtime-BwruZakL.js";
import { r as emptyPluginConfigSchema } from "../../config-schema-D2jcl2zK.js";
import { s as migrateBaseNameToDefaultAccount, t as applyAccountNameToChannelSection } from "../../setup-helpers-CLAbCTy7.js";
import { c as getChatChannelMeta } from "../../core-BGteDoGl.js";
import { t as createPluginRuntimeStore } from "../../runtime-store-BrGF12E6.js";
import { n as resolveAllowlistProviderRuntimeGroupPolicy, r as resolveDefaultGroupPolicy } from "../../runtime-group-policy-Csd9vOWJ.js";
import { t as resolveChannelMediaMaxBytes } from "../../media-limits-DqBuvyjp.js";
import { t as PAIRING_APPROVED_MESSAGE } from "../../pairing-message-MtgX9qjd.js";
import { c as collectStatusIssuesFromLastError, d as createDefaultChannelRuntimeState, n as buildBaseChannelStatusSummary, t as buildBaseAccountStatusSnapshot } from "../../status-helpers-Q6qpKJsI.js";
import { t as detectBinary } from "../../detect-binary-B3MLg9Dr.js";
import "../../setup-tools-DBqtm4nF.js";
import "../../reply-runtime-Bxp5-La7.js";
import "../../media-runtime-ElMrhsqI.js";
import "../../channel-status-C6g3kAWJ.js";
import { i as resolveSignalAccount, n as listSignalAccountIds, r as resolveDefaultSignalAccountId, t as listEnabledSignalAccounts } from "../../accounts-DicMCTLT.js";
import { d as looksLikeSignalTargetId, f as normalizeSignalMessagingTarget } from "../../identity-BWMW1T-Y.js";
import { n as sendReactionSignal, t as removeReactionSignal } from "../../reaction-runtime-api-DZrrNj29.js";
import { n as resolveSignalReactionLevel, t as signalMessageActions } from "../../message-actions-YCJvjVig.js";
import "../../config-api-fdC9GGmP.js";
import { r as installSignalCli } from "../../install-signal-cli-BmiacUoZ.js";
import { t as monitorSignalProvider } from "../../monitor-CJ36yjtV.js";
import { t as sendMessageSignal } from "../../send-CfkN5h_b.js";
import { t as probeSignal } from "../../probe-N94H6N_b.js";
//#region extensions/signal/src/runtime.ts
const { setRuntime: setSignalRuntime, clearRuntime: clearSignalRuntime } = createPluginRuntimeStore({
	pluginId: "signal",
	errorMessage: "Signal runtime not initialized"
});
//#endregion
export { DEFAULT_ACCOUNT_ID, PAIRING_APPROVED_MESSAGE, SignalConfigSchema, applyAccountNameToChannelSection, buildBaseAccountStatusSnapshot, buildBaseChannelStatusSummary, buildChannelConfigSchema, chunkText, collectStatusIssuesFromLastError, createDefaultChannelRuntimeState, deleteAccountFromConfigSection, detectBinary, emptyPluginConfigSchema, formatCliCommand, formatDocsLink, formatPairingApproveHint, getChatChannelMeta, installSignalCli, listEnabledSignalAccounts, listSignalAccountIds, looksLikeSignalTargetId, migrateBaseNameToDefaultAccount, monitorSignalProvider, normalizeAccountId, normalizeE164, normalizeSignalMessagingTarget, probeSignal, removeReactionSignal, resolveAllowlistProviderRuntimeGroupPolicy, resolveChannelMediaMaxBytes, resolveDefaultGroupPolicy, resolveDefaultSignalAccountId, resolveSignalAccount, resolveSignalReactionLevel, sendMessageSignal, sendReactionSignal, setAccountEnabledInConfigSection, setSignalRuntime, signalMessageActions };
