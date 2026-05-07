import { t as DEFAULT_ACCOUNT_ID } from "../../account-id-Bj7l9NI7.js";
import { i as IMessageConfigSchema } from "../../zod-schema.providers-whatsapp-dJW3tOV6.js";
import { r as buildChannelConfigSchema } from "../../config-schema-BX6riGDG.js";
import { p as formatTrimmedAllowFromEntries } from "../../channel-config-helpers-B1VUZOf-.js";
import { c as getChatChannelMeta } from "../../core-DAU5xPEB.js";
import { t as createPluginRuntimeStore } from "../../runtime-store-E8xAaq8m.js";
import { t as resolveChannelMediaMaxBytes } from "../../media-limits-CaEJGysP.js";
import { t as PAIRING_APPROVED_MESSAGE } from "../../pairing-message-SmMNqErm.js";
import { c as collectStatusIssuesFromLastError, r as buildComputedAccountStatusSnapshot } from "../../status-helpers-BthQYPrV.js";
import "../../media-runtime-BKpWDq5M.js";
import { t as chunkTextForOutbound } from "../../text-chunking-ZoHlTgL8.js";
import "../../channel-status-WxT0f96D.js";
import { s as resolveIMessageAccount } from "../../media-contract-ukTSjlWz.js";
import { f as looksLikeIMessageTargetId, p as normalizeIMessageMessagingTarget } from "../../conversation-id-Df-ZCe1J.js";
import { n as resolveIMessageGroupToolPolicy, t as resolveIMessageGroupRequireMention } from "../../group-policy-B2chcyQ0.js";
import "../../config-api-_5xKoPb4.js";
import { t as probeIMessage } from "../../probe-ZQt3LsJ8.js";
import { n as sendMessageIMessage, t as monitorIMessageProvider } from "../../monitor-B83RzGCn.js";
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
