import "./file-lock-DwgCTL3o.js";
import { t as createPluginRuntimeStore } from "./runtime-store-BrGF12E6.js";
import "./channel-policy-DRouLMRv.js";
import "./channel-targets-DPf9R_J_.js";
import "./channel-pairing-DSCmqM5V.js";
import "./webhook-ingress-Cxfv2qMo.js";
import "./inbound-reply-dispatch-l9-qsi8W.js";
import "./outbound-media-DEqqPJxu.js";
import "./ssrf-runtime-D54GqMPE.js";
import "./media-runtime-CLb91OTp.js";
import "./channel-status-C6g3kAWJ.js";
import "./channel-lifecycle-DaRN6v7g.js";
import "./channel-message-DUdqhpNg.js";
//#region extensions/msteams/src/runtime.ts
const { setRuntime: setMSTeamsRuntime, getRuntime: getMSTeamsRuntime, tryGetRuntime: getOptionalMSTeamsRuntime } = createPluginRuntimeStore({
	pluginId: "msteams",
	errorMessage: "MSTeams runtime not initialized"
});
//#endregion
export { getOptionalMSTeamsRuntime as n, setMSTeamsRuntime as r, getMSTeamsRuntime as t };
