import { t as createZalouserPluginBase } from "./shared-BIpA819c.js";
import { n as zalouserSetupAdapter } from "./setup-core-B-z_t4RH.js";
import { t as zalouserSetupWizard } from "./setup-surface-qbSoDUD2.js";
//#region extensions/zalouser/src/channel.setup.ts
const zalouserSetupPlugin = { ...createZalouserPluginBase({
	setupWizard: zalouserSetupWizard,
	setup: zalouserSetupAdapter
}) };
//#endregion
export { zalouserSetupPlugin as t };
