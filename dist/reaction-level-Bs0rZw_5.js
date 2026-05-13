import { t as resolveReactionLevel } from "./text-runtime-BwruZakL.js";
import { t as resolveMergedWhatsAppAccountConfig } from "./account-config-OscKbIQI.js";
//#region extensions/whatsapp/src/reaction-level.ts
/** Resolve the effective reaction level and its implications for WhatsApp. */
function resolveWhatsAppReactionLevel(params) {
	return resolveReactionLevel({
		value: resolveMergedWhatsAppAccountConfig({
			cfg: params.cfg,
			accountId: params.accountId
		}).reactionLevel,
		defaultLevel: "minimal",
		invalidFallback: "minimal"
	});
}
//#endregion
export { resolveWhatsAppReactionLevel as t };
