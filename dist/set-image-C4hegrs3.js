import { n as resolveAgentModelPrimaryValue } from "./model-input-iP1XVmm1.js";
import { n as logConfigUpdated } from "./logging-BbSWx952.js";
import { t as applyDefaultModelPrimaryUpdate, u as updateConfig } from "./shared-CV6_uxAg.js";
//#region src/commands/models/set-image.ts
async function modelsSetImageCommand(modelRaw, runtime) {
	const updated = await updateConfig((cfg) => {
		return applyDefaultModelPrimaryUpdate({
			cfg,
			modelRaw,
			field: "imageModel"
		});
	});
	logConfigUpdated(runtime);
	runtime.log(`Image model: ${resolveAgentModelPrimaryValue(updated.agents?.defaults?.imageModel) ?? modelRaw}`);
}
//#endregion
export { modelsSetImageCommand };
