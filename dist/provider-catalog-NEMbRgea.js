import { n as buildManifestModelProviderConfig } from "./provider-catalog-shared-Dh8sLNjN.js";
import { t as modelCatalog } from "./openclaw.plugin-LCS-fNe7.js";
//#region extensions/together/provider-catalog.ts
function buildTogetherProvider() {
	return buildManifestModelProviderConfig({
		providerId: "together",
		catalog: modelCatalog.providers.together
	});
}
//#endregion
export { buildTogetherProvider as t };
