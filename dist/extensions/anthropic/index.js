import { t as definePluginEntry } from "../../plugin-entry-BWtmlM8X.js";
import { n as registerAnthropicPlugin } from "../../register.runtime-kEa3HAuf.js";
//#region extensions/anthropic/index.ts
var anthropic_default = definePluginEntry({
	id: "anthropic",
	name: "Anthropic Provider",
	description: "Bundled Anthropic provider plugin",
	register(api) {
		return registerAnthropicPlugin(api);
	}
});
//#endregion
export { anthropic_default as default };
