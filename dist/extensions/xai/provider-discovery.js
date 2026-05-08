import { p as readProviderEnvValue } from "../../web-search-provider-common-B3nliRhV.js";
import "../../provider-web-search-D22jik6t.js";
import { n as resolveFallbackXaiAuth } from "../../tool-auth-shared-Bc9NHZ73.js";
//#region extensions/xai/provider-discovery.ts
const PROVIDER_ID = "xai";
function resolveXaiSyntheticAuth(config) {
	const apiKey = resolveFallbackXaiAuth(config)?.apiKey || readProviderEnvValue(["XAI_API_KEY"]);
	return apiKey ? {
		apiKey,
		source: "xAI plugin config",
		mode: "api-key"
	} : void 0;
}
const xaiProviderDiscovery = {
	id: PROVIDER_ID,
	label: "xAI",
	docsPath: "/providers/models",
	auth: [],
	resolveSyntheticAuth: ({ config }) => resolveXaiSyntheticAuth(config)
};
//#endregion
export { xaiProviderDiscovery as default };
