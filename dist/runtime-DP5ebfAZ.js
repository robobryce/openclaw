import { t as createPluginRuntimeStore } from "./runtime-store-BrGF12E6.js";
//#region extensions/twitch/src/runtime.ts
const { setRuntime: setTwitchRuntime, getRuntime: getTwitchRuntime } = createPluginRuntimeStore({
	pluginId: "twitch",
	errorMessage: "Twitch runtime not initialized"
});
//#endregion
export { setTwitchRuntime as n, getTwitchRuntime as t };
