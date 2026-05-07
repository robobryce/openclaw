import { a as shouldLogVerbose } from "../../globals-CZuktVBk.js";
import { a as chunkText } from "../../chunk-Dhvlxa7H.js";
import "../../runtime-env-T0CKZ8kV.js";
import "../../reply-chunking-Be1dLy9S.js";
import { t as resolveWhatsAppOutboundTarget } from "./resolve-outbound-target-B4zLQ0zH.js";
import { n as normalizeWhatsAppPayloadText } from "./outbound-media-contract-DpN8IPDn.js";
import { t as createWhatsAppOutboundBase } from "./outbound-base-DupxQXN3.js";
//#region extensions/whatsapp/src/outbound-adapter.ts
let whatsAppSendModulePromise;
function loadWhatsAppSendModule() {
	whatsAppSendModulePromise ??= import("./send-C_giGcgf.js");
	return whatsAppSendModulePromise;
}
function normalizeOutboundText(text) {
	return normalizeWhatsAppPayloadText(text);
}
const whatsappOutbound = createWhatsAppOutboundBase({
	chunker: chunkText,
	sendMessageWhatsApp: async (to, text, options) => await (await loadWhatsAppSendModule()).sendMessageWhatsApp(to, normalizeOutboundText(text), { ...options }),
	sendPollWhatsApp: async (to, poll, options) => await (await loadWhatsAppSendModule()).sendPollWhatsApp(to, poll, options),
	shouldLogVerbose: () => shouldLogVerbose(),
	resolveTarget: ({ to, allowFrom, mode }) => resolveWhatsAppOutboundTarget({
		to,
		allowFrom,
		mode
	}),
	normalizeText: normalizeOutboundText,
	skipEmptyText: true
});
//#endregion
export { whatsappOutbound as t };
