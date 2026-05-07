import "../../channel-reply-pipeline-CuWEALmy.js";
import { t as createPluginRuntimeStore } from "../../runtime-store-E8xAaq8m.js";
import "../../channel-policy-BeL24_Dy.js";
import "../../channel-pairing-DiPNleTA.js";
import "../../webhook-request-guards-CvzDRC79.js";
import "../../webhook-targets-BaQichvL.js";
import "../../outbound-media-C82r_5k6.js";
import "../../ssrf-runtime-2NoQmkSk.js";
import "../../media-runtime-BKpWDq5M.js";
import "../../channel-status-WxT0f96D.js";
import "../../bundled-channel-config-schema-s9yHlupq.js";
import "../../channel-config-primitives-s81EzGsV.js";
import "../../channel-actions-CHPTbDTp.js";
import "../../channel-feedback-CNhqtl-x.js";
import "../../channel-inbound-DrnKRCej.js";
import "../../channel-lifecycle-DlWmGQsl.js";
//#region extensions/googlechat/src/runtime.ts
const { setRuntime: setGoogleChatRuntime, getRuntime: getGoogleChatRuntime } = createPluginRuntimeStore({
	pluginId: "googlechat",
	errorMessage: "Google Chat runtime not initialized"
});
//#endregion
export { setGoogleChatRuntime as n, getGoogleChatRuntime as t };
