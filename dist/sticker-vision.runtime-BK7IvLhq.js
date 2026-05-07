import { S as findModelInCatalog } from "./model-selection-shared-BOD321LE.js";
import { o as resolveDefaultModelForAgent } from "./model-selection-CAAffjMN.js";
import { a as modelSupportsVision, r as loadModelCatalog } from "./model-catalog-Cq9AzsQW.js";
import "./agent-runtime-DznJLGhP.js";
//#region extensions/telegram/src/sticker-vision.runtime.ts
async function resolveStickerVisionSupportRuntime(params) {
	const catalog = await loadModelCatalog({ config: params.cfg });
	const defaultModel = resolveDefaultModelForAgent({
		cfg: params.cfg,
		agentId: params.agentId
	});
	const entry = findModelInCatalog(catalog, defaultModel.provider, defaultModel.model);
	if (!entry) return false;
	return modelSupportsVision(entry);
}
//#endregion
export { resolveStickerVisionSupportRuntime };
