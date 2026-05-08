import { u as resolveProviderHttpRequestConfig } from "./shared-CCW3b9_z.js";
import "./provider-http-CxFf6F3h.js";
import "./thinking-api-C8pXZ1bJ.js";
import "./gemini-cli-provider-Bl_ptqHU.js";
import "./onboard-j-fd3SDd.js";
import { i as normalizeGoogleGenerativeAiBaseUrl, t as DEFAULT_GOOGLE_API_BASE_URL } from "./provider-policy-CRX-K5xb.js";
import { t as parseGeminiAuth } from "./gemini-auth-OLJFJ43Q.js";
import "./transport-stream-DGMY8ZM4.js";
import "./provider-registration-CRxUVboF.js";
//#region extensions/google/api.ts
function resolveTrustedGoogleGenerativeAiBaseUrl(baseUrl) {
	const normalized = normalizeGoogleGenerativeAiBaseUrl(baseUrl ?? "https://generativelanguage.googleapis.com/v1beta") ?? "https://generativelanguage.googleapis.com/v1beta";
	let url;
	try {
		url = new URL(normalized);
	} catch {
		throw new Error("Google Generative AI baseUrl must be a valid https URL on generativelanguage.googleapis.com");
	}
	if (url.protocol !== "https:" || url.hostname.toLowerCase() !== "generativelanguage.googleapis.com") throw new Error("Google Generative AI baseUrl must use https://generativelanguage.googleapis.com");
	return normalized;
}
function resolveGoogleGenerativeAiHttpRequestConfig(params) {
	return resolveProviderHttpRequestConfig({
		baseUrl: resolveTrustedGoogleGenerativeAiBaseUrl(params.baseUrl),
		defaultBaseUrl: DEFAULT_GOOGLE_API_BASE_URL,
		allowPrivateNetwork: params.request?.allowPrivateNetwork,
		headers: params.headers,
		request: params.request,
		defaultHeaders: parseGeminiAuth(params.apiKey).headers,
		provider: "google",
		api: "google-generative-ai",
		capability: params.capability,
		transport: params.transport
	});
}
//#endregion
export { resolveGoogleGenerativeAiHttpRequestConfig as t };
