import "./net-D8Y23pOF.js";
import "./auth-Dfdul-Q1.js";
import "./client-CO0vIOsX.js";
import "./protocol-0JcDkELB.js";
import "./operator-approvals-client-pIAZ_NC_.js";
import "./gateway-rpc-Bxl2w4YS.js";
import "./hosted-plugin-surface-url-B1-8WB_C.js";
import "./node-command-policy-ra23snL-.js";
import "./nodes.helpers-DiSwTf0q.js";
import "./startup-auth-Cxr0eUQw.js";
//#region src/gateway/channel-status-patches.ts
function createConnectedChannelStatusPatch(at = Date.now()) {
	return {
		connected: true,
		lastConnectedAt: at,
		lastEventAt: at
	};
}
function createTransportActivityStatusPatch(at = Date.now()) {
	return { lastTransportActivityAt: at };
}
//#endregion
export { createTransportActivityStatusPatch as n, createConnectedChannelStatusPatch as t };
