import "./file-lock-DwgCTL3o.js";
import { t as createPluginRuntimeStore } from "./runtime-store-BrGF12E6.js";
import "./channel-policy-DRouLMRv.js";
import "./channel-targets-DPf9R_J_.js";
import "./channel-pairing-DSCmqM5V.js";
import "./webhook-ingress-CRMy2UzE.js";
import "./inbound-reply-dispatch-_uZmzrO1.js";
import "./outbound-media-DI8Bcjpy.js";
import "./ssrf-runtime-D54GqMPE.js";
import "./media-runtime-ElMrhsqI.js";
import "./channel-status-C6g3kAWJ.js";
import "./channel-lifecycle-DaRN6v7g.js";
import "./channel-message-ibxoZVQ3.js";
//#region extensions/msteams/src/runtime.ts
const { setRuntime: setMSTeamsRuntime, getRuntime: getMSTeamsRuntime, tryGetRuntime: getOptionalMSTeamsRuntime } = createPluginRuntimeStore({
	pluginId: "msteams",
	errorMessage: "MSTeams runtime not initialized"
});
//#endregion
export { getOptionalMSTeamsRuntime as n, setMSTeamsRuntime as r, getMSTeamsRuntime as t };
