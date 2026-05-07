import { t as definePluginEntry } from "../../plugin-entry-CJ7dbRiF.js";
import { t as createSearxngWebSearchProvider } from "../../searxng-search-provider-CGDP2feR.js";
//#region extensions/searxng/index.ts
var searxng_default = definePluginEntry({
	id: "searxng",
	name: "SearXNG Plugin",
	description: "Bundled SearXNG web search plugin",
	register(api) {
		api.registerWebSearchProvider(createSearxngWebSearchProvider());
	}
});
//#endregion
export { searxng_default as default };
