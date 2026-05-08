import { a as normalizeGoogleProviderConfig } from "../../provider-policy-CRX-K5xb.js";
//#region extensions/google/provider-policy-api.ts
function normalizeConfig(params) {
	return normalizeGoogleProviderConfig(params.provider, params.providerConfig);
}
//#endregion
export { normalizeConfig };
