import { t as createZalouserPluginBase } from "./shared-B7rqqukU.js";
import { n as zalouserSetupAdapter } from "./setup-core-B-z_t4RH.js";
import { t as zalouserSetupWizard } from "./setup-surface-DyiBlS0-.js";
//#region extensions/zalouser/src/channel.setup.ts
const zalouserSetupPlugin = { ...createZalouserPluginBase({
	setupWizard: zalouserSetupWizard,
	setup: zalouserSetupAdapter
}) };
//#endregion
export { zalouserSetupPlugin as t };
