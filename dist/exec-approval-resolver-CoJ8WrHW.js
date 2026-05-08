import { t as isApprovalNotFoundError } from "./approval-errors-B562SkA8.js";
import "./error-runtime-CLFIkpmb.js";
import { t as resolveApprovalOverGateway } from "./approval-gateway-runtime-Cvf1td6b.js";
//#region extensions/matrix/src/exec-approval-resolver.ts
async function resolveMatrixApproval(params) {
	await resolveApprovalOverGateway({
		cfg: params.cfg,
		approvalId: params.approvalId,
		decision: params.decision,
		senderId: params.senderId,
		gatewayUrl: params.gatewayUrl,
		clientDisplayName: `Matrix approval (${params.senderId?.trim() || "unknown"})`
	});
}
//#endregion
export { isApprovalNotFoundError, resolveMatrixApproval };
