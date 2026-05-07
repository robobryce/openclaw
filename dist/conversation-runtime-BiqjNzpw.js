import "./session-binding-service-evbaluJe.js";
import "./thread-bindings-policy-BG7mWg85.js";
import "./conversation-binding-B-AVMJbC.js";
import "./binding-registry-BJhtHY6Z.js";
import "./session-D_pzsAt6.js";
import "./pairing-store-ULzn97tu.js";
import "./dm-policy-shared-D7EtFi3S.js";
import "./binding-targets-CLrAI0lh.js";
import "./binding-routing-ZccGvpNd.js";
import "./pairing-labels-Vy-_Pb3P.js";
//#region src/channels/session-meta.ts
let inboundSessionRuntimePromise = null;
function loadInboundSessionRuntime() {
	inboundSessionRuntimePromise ??= import("./inbound.runtime-CVjZOyWw.js");
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
