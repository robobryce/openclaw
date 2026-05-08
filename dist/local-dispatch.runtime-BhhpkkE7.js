import { r as createBrowserRouteDispatcher, t as startBrowserControlServiceFromConfig } from "./control-service-D_vZhDN8.js";
import { n as createBrowserControlContext } from "./plugin-enabled-Kf5t3YdJ.js";
//#region extensions/browser/src/browser/local-dispatch.runtime.ts
async function dispatchBrowserControlRequest(req) {
	if (!await startBrowserControlServiceFromConfig()) throw new Error("browser control disabled");
	return await createBrowserRouteDispatcher(createBrowserControlContext()).dispatch(req);
}
//#endregion
export { dispatchBrowserControlRequest };
