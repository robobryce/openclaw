import { t as definePluginEntry } from "../../plugin-entry-BWtmlM8X.js";
//#region extensions/browser/cli-metadata.ts
var cli_metadata_default = definePluginEntry({
	id: "browser",
	name: "Browser",
	description: "Default browser tool plugin",
	register(api) {
		api.registerCli(async ({ program }) => {
			const { registerBrowserCli } = await import("../../browser-cli-DSsoE5fx.js");
			registerBrowserCli(program);
		}, { commands: ["browser"] });
	}
});
//#endregion
export { cli_metadata_default as default };
