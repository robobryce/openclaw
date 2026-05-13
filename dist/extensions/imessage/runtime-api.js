import { t as DEFAULT_ACCOUNT_ID } from "../../account-id-BQglYFe1.js";
import { i as IMessageConfigSchema } from "../../zod-schema.providers-whatsapp-DuTfGWr_.js";
import { r as buildChannelConfigSchema } from "../../config-schema-C9dJig7h.js";
import { p as formatTrimmedAllowFromEntries } from "../../channel-config-helpers-C8BoXENU.js";
import { c as getChatChannelMeta } from "../../core-BGteDoGl.js";
import { t as createPluginRuntimeStore } from "../../runtime-store-BrGF12E6.js";
import { t as resolveChannelMediaMaxBytes } from "../../media-limits-DqBuvyjp.js";
import { t as PAIRING_APPROVED_MESSAGE } from "../../pairing-message-MtgX9qjd.js";
import { c as collectStatusIssuesFromLastError, r as buildComputedAccountStatusSnapshot } from "../../status-helpers-Q6qpKJsI.js";
import "../../media-runtime-ElMrhsqI.js";
import { t as chunkTextForOutbound } from "../../text-chunking-MhvGwVzv.js";
import "../../channel-status-C6g3kAWJ.js";
import { s as resolveIMessageAccount } from "../../media-contract-BndXN6So.js";
import { m as normalizeIMessageMessagingTarget, p as looksLikeIMessageTargetId } from "../../sanitize-outbound-DEGJ7o4z.js";
import { n as resolveIMessageGroupToolPolicy, t as resolveIMessageGroupRequireMention } from "../../group-policy-BlKzXFAx.js";
import "../../config-api-DhSrzqmq.js";
import { t as probeIMessage } from "../../probe-H1YVJlPR.js";
import { n as sendMessageIMessage, t as monitorIMessageProvider } from "../../monitor-rTH4NJBN.js";
//#region extensions/imessage/src/config-accessors.ts
function resolveIMessageConfigAllowFrom(params) {
	return (resolveIMessageAccount(params).config.allowFrom ?? []).map((entry) => String(entry));
}
function resolveIMessageConfigDefaultTo(params) {
	const defaultTo = resolveIMessageAccount(params).config.defaultTo;
	if (defaultTo == null) return;
	return defaultTo.trim() || void 0;
}
//#endregion
//#region extensions/imessage/src/runtime.ts
const { setRuntime: setIMessageRuntime } = createPluginRuntimeStore({
	pluginId: "imessage",
	errorMessage: "iMessage runtime not initialized"
});
//#endregion
export { DEFAULT_ACCOUNT_ID, IMessageConfigSchema, PAIRING_APPROVED_MESSAGE, buildChannelConfigSchema, buildComputedAccountStatusSnapshot, chunkTextForOutbound, collectStatusIssuesFromLastError, formatTrimmedAllowFromEntries, getChatChannelMeta, looksLikeIMessageTargetId, monitorIMessageProvider, normalizeIMessageMessagingTarget, probeIMessage, resolveChannelMediaMaxBytes, resolveIMessageConfigAllowFrom, resolveIMessageConfigDefaultTo, resolveIMessageGroupRequireMention, resolveIMessageGroupToolPolicy, sendMessageIMessage, setIMessageRuntime };
