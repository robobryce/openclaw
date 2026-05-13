import { t as createPluginRuntimeStore } from "./runtime-store-BrGF12E6.js";
import "./channel-policy-DRouLMRv.js";
import "./channel-pairing-DSCmqM5V.js";
import "./ssrf-runtime-D54GqMPE.js";
import "./channel-message-ibxoZVQ3.js";
//#region extensions/nextcloud-talk/src/runtime.ts
const { setRuntime: setNextcloudTalkRuntime, getRuntime: getNextcloudTalkRuntime } = createPluginRuntimeStore({
	pluginId: "nextcloud-talk",
	errorMessage: "Nextcloud Talk runtime not initialized"
});
//#endregion
export { setNextcloudTalkRuntime as n, getNextcloudTalkRuntime as t };
