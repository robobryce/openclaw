import { t as definePluginEntry } from "../../plugin-entry-CJ7dbRiF.js";
import { n as buildFalImageGenerationProvider } from "../../image-generation-provider-DFTZWQWr.js";
import { t as createFalProvider } from "../../provider-registration-D6ZIRH4v.js";
import { n as buildFalVideoGenerationProvider } from "../../video-generation-provider-DgXH2rQq.js";
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
