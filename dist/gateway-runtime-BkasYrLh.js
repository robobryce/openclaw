import "./net-DdbfRcEU.js";
import "./auth-BTZuUqzY.js";
import "./client-CRyAb5LL.js";
import "./protocol-ByTcB0og.js";
import "./operator-approvals-client-BWJ-b3zm.js";
import "./gateway-rpc-CyxPTkbY.js";
import "./node-command-policy-C7B13K_5.js";
import "./nodes.helpers-CdILpfk7.js";
import "./startup-auth-BMuuuOiE.js";
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
