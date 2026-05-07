import { n as buildManifestModelProviderConfig } from "./provider-catalog-shared-DeLzYnM5.js";
import { t as modelCatalog } from "./openclaw.plugin-D3y6m61r.js";
//#region extensions/mistral/provider-catalog.ts
function buildMistralProvider() {
	return buildManifestModelProviderConfig({
		providerId: "mistral",
		catalog: modelCatalog.providers.mistral
	});
}
//#endregion
export { buildMistralProvider as t };
