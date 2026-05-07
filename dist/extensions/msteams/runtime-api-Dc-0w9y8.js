import "../../file-lock-BmgJsGom.js";
import "../../channel-reply-pipeline-CuWEALmy.js";
import { t as createPluginRuntimeStore } from "../../runtime-store-E8xAaq8m.js";
import "../../channel-policy-BeL24_Dy.js";
import "../../channel-targets-BUAZc7_o.js";
import "../../channel-pairing-DiPNleTA.js";
import "../../webhook-ingress-2hBsW-Y9.js";
import "../../inbound-reply-dispatch-BSXtNWzd.js";
import "../../outbound-media-C82r_5k6.js";
import "../../ssrf-runtime-2NoQmkSk.js";
import "../../media-runtime-BKpWDq5M.js";
import "../../channel-status-WxT0f96D.js";
import "../../channel-lifecycle-DlWmGQsl.js";
//#region extensions/msteams/src/runtime.ts
const { setRuntime: setMSTeamsRuntime, getRuntime: getMSTeamsRuntime, tryGetRuntime: getOptionalMSTeamsRuntime } = createPluginRuntimeStore({
	pluginId: "msteams",
	errorMessage: "MSTeams runtime not initialized"
});
//#endregion
export { getOptionalMSTeamsRuntime as n, setMSTeamsRuntime as r, getMSTeamsRuntime as t };
