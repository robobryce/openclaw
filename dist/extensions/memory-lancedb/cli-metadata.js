import { t as definePluginEntry } from "../../plugin-entry-BWtmlM8X.js";
import "../../core-C1k2IcgS.js";
//#region extensions/memory-lancedb/cli-metadata.ts
var cli_metadata_default = definePluginEntry({
	id: "memory-lancedb",
	name: "Memory LanceDB",
	description: "LanceDB-backed memory provider",
	register(api) {
		api.registerCli(() => {}, { commands: ["ltm"] });
	}
});
//#endregion
export { cli_metadata_default as default };
