import { t as definePluginEntry } from "../../plugin-entry-BWtmlM8X.js";
import { n as buildFalImageGenerationProvider } from "../../image-generation-provider-1mg_Xd3-.js";
import { t as createFalProvider } from "../../provider-registration-D2WfrWUz.js";
import { n as buildFalVideoGenerationProvider } from "../../video-generation-provider-TcZphOGI.js";
var fal_default = definePluginEntry({
	id: "fal",
	name: "fal Provider",
	description: "Bundled fal image and video generation provider",
	register(api) {
		api.registerProvider(createFalProvider());
		api.registerImageGenerationProvider(buildFalImageGenerationProvider());
		api.registerVideoGenerationProvider(buildFalVideoGenerationProvider());
	}
});
//#endregion
export { fal_default as default };
