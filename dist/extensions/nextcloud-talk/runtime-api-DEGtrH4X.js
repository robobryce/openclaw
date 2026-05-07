import { t as createPluginRuntimeStore } from "../../runtime-store-E8xAaq8m.js";
import "../../channel-policy-BeL24_Dy.js";
import "../../channel-pairing-DiPNleTA.js";
import "../../inbound-reply-dispatch-BSXtNWzd.js";
import "../../ssrf-runtime-2NoQmkSk.js";
//#region extensions/nextcloud-talk/src/runtime.ts
const { setRuntime: setNextcloudTalkRuntime, getRuntime: getNextcloudTalkRuntime } = createPluginRuntimeStore({
	pluginId: "nextcloud-talk",
	errorMessage: "Nextcloud Talk runtime not initialized"
});
//#endregion
export { setNextcloudTalkRuntime as n, getNextcloudTalkRuntime as t };
