import { t as definePluginEntry } from "../../plugin-entry-CJ7dbRiF.js";
import { t as contributeGroqResolvedModelCompat } from "../../api-C_lpvPdc.js";
import { t as groqMediaUnderstandingProvider } from "../../media-understanding-provider-EAzx9Arh.js";
//#region extensions/groq/index.ts
var groq_default = definePluginEntry({
	id: "groq",
	name: "Groq Provider",
	description: "Bundled Groq provider plugin",
	register(api) {
		api.registerProvider({
			id: "groq",
			label: "Groq",
			docsPath: "/providers/groq",
			envVars: ["GROQ_API_KEY"],
			auth: [],
			contributeResolvedModelCompat: ({ modelId, model }) => contributeGroqResolvedModelCompat({
				modelId,
				model
			})
		});
		api.registerMediaUnderstandingProvider(groqMediaUnderstandingProvider);
	}
});
//#endregion
export { groq_default as default };
