import { n as resolveAgentModelPrimaryValue } from "./model-input-iP1XVmm1.js";
import { n as logConfigUpdated } from "./logging-tup7OLmc.js";
import { t as applyDefaultModelPrimaryUpdate, u as updateConfig } from "./shared-DA202yMs.js";
import { n as repairCodexRuntimePluginInstallForModelSelection } from "./codex-runtime-plugin-install-CSRmEnMw.js";
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
