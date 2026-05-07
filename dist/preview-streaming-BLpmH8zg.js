import { d as resolveChannelPreviewStreamMode } from "./channel-streaming-B7SapjwD.js";
//#region extensions/telegram/src/preview-streaming.ts
function resolveTelegramPreviewStreamMode(params = {}) {
	return resolveChannelPreviewStreamMode(params, "partial");
}
//#endregion
export { resolveTelegramPreviewStreamMode as t };
