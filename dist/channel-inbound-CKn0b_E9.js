import { c as normalizeOptionalString } from "./string-coerce-Bje8XVt9.js";
import { u as resolveStorePath } from "./paths-BmdY-Qui.js";
import { n as readSessionUpdatedAt } from "./store-ykbL7YTc.js";
import "./sessions-3sxpPPQt.js";
import "./mentions-B5RV0RtN.js";
import { t as hasControlCommand } from "./command-detection-4EqIZse5.js";
import { a as resolveEnvelopeFormatOptions } from "./envelope-Dx5eONEL.js";
import { n as resolveInboundDebounceMs, t as createInboundDebouncer } from "./inbound-debounce-CeQdorYl.js";
import "./direct-dm-DRe7hb72.js";
//#region src/channels/inbound-debounce-policy.ts
function shouldDebounceTextInbound(params) {
	if (params.allowDebounce === false) return false;
	if (params.hasMedia) return false;
	const text = normalizeOptionalString(params.text) ?? "";
	if (!text) return false;
	return !hasControlCommand(text, params.cfg, params.commandOptions);
}
function createChannelInboundDebouncer(params) {
	const debounceMs = resolveInboundDebounceMs({
		cfg: params.cfg,
		channel: params.channel,
		overrideMs: params.debounceMsOverride
	});
	const { cfg: _cfg, channel: _channel, debounceMsOverride: _override, ...rest } = params;
	return {
		debounceMs,
		debouncer: createInboundDebouncer({
			debounceMs,
			...rest
		})
	};
}
//#endregion
//#region src/channels/session-envelope.ts
function resolveInboundSessionEnvelopeContext(params) {
	const storePath = resolveStorePath(params.cfg.session?.store, { agentId: params.agentId });
	return {
		storePath,
		envelopeOptions: resolveEnvelopeFormatOptions(params.cfg),
		previousTimestamp: readSessionUpdatedAt({
			storePath,
			sessionKey: params.sessionKey
		})
	};
}
//#endregion
export { createChannelInboundDebouncer as n, shouldDebounceTextInbound as r, resolveInboundSessionEnvelopeContext as t };
