import "./utils-Cs_zUMxj.js";
import "./types.secrets-BgzzIHyp.js";
import "./setup-helpers-CLAbCTy7.js";
import "./setup-wizard-helpers-BVwefJul.js";
import "./setup-binary-BpvJ_2bm.js";
import "./setup-wizard-proxy-C7bb1lWr.js";
//#region src/plugin-sdk/resolution-notes.ts
/** Format a short note that separates successfully resolved targets from unresolved passthrough values. */
function formatResolvedUnresolvedNote(params) {
	if (params.resolved.length === 0 && params.unresolved.length === 0) return;
	return [params.resolved.length > 0 ? `Resolved: ${params.resolved.join(", ")}` : void 0, params.unresolved.length > 0 ? `Unresolved (kept as typed): ${params.unresolved.join(", ")}` : void 0].filter(Boolean).join("\n");
}
//#endregion
export { formatResolvedUnresolvedNote as t };
