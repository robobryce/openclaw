import { t as definePluginEntry } from "../../plugin-entry-BWtmlM8X.js";
import { t as buildAlibabaVideoGenerationProvider } from "../../video-generation-provider-Bi3vaHWU.js";
//#region extensions/alibaba/index.ts
var alibaba_default = definePluginEntry({
	id: "alibaba",
	name: "Alibaba Model Studio Plugin",
	description: "Bundled Alibaba Model Studio video provider plugin",
	register(api) {
		api.registerVideoGenerationProvider(buildAlibabaVideoGenerationProvider());
	}
});
//#endregion
export { alibaba_default as default };
