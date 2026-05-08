import "./session-binding-service-DN7GRU0g.js";
import "./thread-bindings-policy-DdswmUny.js";
import "./conversation-binding-CUdM2mGQ.js";
import "./binding-registry-B9TTGOx6.js";
import "./session-CuZPzZXO.js";
import "./pairing-store-DLrmY769.js";
import "./dm-policy-shared-B4V1HH_w.js";
import "./binding-targets-DykIidD-.js";
import "./binding-routing-DeVcgKPL.js";
import "./pairing-labels-DhD5CgBD.js";
//#region src/channels/session-meta.ts
let inboundSessionRuntimePromise = null;
function loadInboundSessionRuntime() {
	inboundSessionRuntimePromise ??= import("./inbound.runtime-B-0sZU2_.js");
	return inboundSessionRuntimePromise;
}
async function recordInboundSessionMetaSafe(params) {
	const runtime = await loadInboundSessionRuntime();
	const storePath = runtime.resolveStorePath(params.cfg.session?.store, { agentId: params.agentId });
	try {
		await runtime.recordSessionMetaFromInbound({
			storePath,
			sessionKey: params.sessionKey,
			ctx: params.ctx
		});
	} catch (err) {
		params.onError?.(err);
	}
}
//#endregion
export { recordInboundSessionMetaSafe as t };
