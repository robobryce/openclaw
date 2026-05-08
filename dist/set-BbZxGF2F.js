import { n as resolveAgentModelPrimaryValue } from "./model-input-iP1XVmm1.js";
import { n as logConfigUpdated } from "./logging-BbSWx952.js";
import { t as applyDefaultModelPrimaryUpdate, u as updateConfig } from "./shared-CV6_uxAg.js";
import { n as repairCodexRuntimePluginInstallForModelSelection } from "./codex-runtime-plugin-install-BR-3lrrr.js";
//#region src/commands/models/set.ts
async function modelsSetCommand(modelRaw, runtime) {
	const updated = await updateConfig((cfg) => {
		return applyDefaultModelPrimaryUpdate({
			cfg,
			modelRaw,
			field: "model"
		});
	});
	const repaired = await repairCodexRuntimePluginInstallForModelSelection({
		cfg: updated,
		model: resolveAgentModelPrimaryValue(updated.agents?.defaults?.model) ?? modelRaw
	});
	for (const warning of repaired.warnings) runtime.error?.(warning);
	logConfigUpdated(runtime);
	runtime.log(`Default model: ${resolveAgentModelPrimaryValue(updated.agents?.defaults?.model) ?? modelRaw}`);
}
//#endregion
export { modelsSetCommand };
