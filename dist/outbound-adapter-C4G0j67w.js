import { a as shouldLogVerbose } from "./globals-BkYSZEKh.js";
import { a as chunkText } from "./chunk-2yGTHeC0.js";
import "./runtime-env-BIP-teS0.js";
import "./reply-chunking-BxrOh5tW.js";
import { t as resolveWhatsAppOutboundTarget } from "./resolve-outbound-target-Dge4Ims2.js";
import { n as normalizeWhatsAppPayloadText } from "./outbound-media-contract-BLf1_85R.js";
import { t as createWhatsAppOutboundBase } from "./outbound-base-D6dv6s88.js";
//#region extensions/whatsapp/src/outbound-adapter.ts
let whatsAppSendModulePromise;
function loadWhatsAppSendModule() {
	whatsAppSendModulePromise ??= import("./send-Dj0lmJpY.js");
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
