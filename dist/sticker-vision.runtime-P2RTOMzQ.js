import { S as findModelInCatalog } from "./model-selection-shared-BL9Kfr1K.js";
import { o as resolveDefaultModelForAgent } from "./model-selection-BOeJUkj5.js";
import { a as modelSupportsVision, r as loadModelCatalog } from "./model-catalog-DZH9pC25.js";
import "./agent-runtime-wTheAKlF.js";
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
