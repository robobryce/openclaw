import { n as parseGoogleOauthApiKey } from "./oauth-token-shared-Ca0M0o1J.js";
//#region extensions/google/gemini-auth.ts
function parseGeminiAuth(apiKey) {
	const parsed = apiKey.startsWith("{") ? parseGoogleOauthApiKey(apiKey) : null;
	if (parsed?.token) return { headers: {
		Authorization: `Bearer ${parsed.token}`,
		"Content-Type": "application/json"
	} };
	return { headers: {
		"x-goog-api-key": apiKey,
		"Content-Type": "application/json"
	} };
}
//#endregion
export { parseGeminiAuth as t };
