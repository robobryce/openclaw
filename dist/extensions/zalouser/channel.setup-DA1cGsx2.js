import { t as createZalouserPluginBase } from "./shared-C8-FUZA1.js";
import { n as zalouserSetupAdapter } from "./setup-core-CdzNIH7Y.js";
import { t as zalouserSetupWizard } from "./setup-surface-BeDMDrQX.js";
//#region extensions/zalouser/src/channel.setup.ts
const zalouserSetupPlugin = { ...createZalouserPluginBase({
	setupWizard: zalouserSetupWizard,
	setup: zalouserSetupAdapter
}) };
//#endregion
export { zalouserSetupPlugin as t };
