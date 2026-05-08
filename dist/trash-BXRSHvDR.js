import { t as movePathToTrash$1 } from "./trash-BlpLdsoH.js";
import { n as resolvePreferredOpenClawTmpDir } from "./tmp-openclaw-dir-B4r8YQhH.js";
import "./temp-path-DNgkxoq3.js";
import "./browser-config-C6imhA8l.js";
import os from "node:os";
//#region extensions/browser/src/browser/trash.ts
async function movePathToTrash(targetPath) {
	return await movePathToTrash$1(targetPath, { allowedRoots: [os.homedir(), resolvePreferredOpenClawTmpDir()] });
}
//#endregion
export { movePathToTrash as t };
