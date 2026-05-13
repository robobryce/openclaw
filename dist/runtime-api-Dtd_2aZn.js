import { t as createPluginRuntimeStore } from "./runtime-store-BrGF12E6.js";
import "./channel-policy-DRouLMRv.js";
import "./channel-pairing-DSCmqM5V.js";
import "./webhook-request-guards-B2b8_Dfb.js";
import "./webhook-targets-BzI5OOL9.js";
import "./outbound-media-DI8Bcjpy.js";
import "./ssrf-runtime-D54GqMPE.js";
import "./media-runtime-ElMrhsqI.js";
import "./channel-status-C6g3kAWJ.js";
import "./bundled-channel-config-schema-B2hKJycg.js";
import "./channel-config-primitives-DeinCydu.js";
import "./channel-actions-CQS1T-uM.js";
import "./channel-feedback-B06FHR36.js";
import "./channel-inbound-CKn0b_E9.js";
import "./channel-lifecycle-DaRN6v7g.js";
import "./channel-message-ibxoZVQ3.js";
//#region extensions/googlechat/src/runtime.ts
const { setRuntime: setGoogleChatRuntime, getRuntime: getGoogleChatRuntime } = createPluginRuntimeStore({
	pluginId: "googlechat",
	errorMessage: "Google Chat runtime not initialized"
});
//#endregion
export { setGoogleChatRuntime as n, getGoogleChatRuntime as t };
