import { n as resolvePreferredOpenClawTmpDir } from "./tmp-openclaw-dir-BT06rvao.js";
import "./temp-path-BVATHaVK.js";
import { t as movePathToTrash$1 } from "./browser-trash-CSmCk-MV.js";
import "./browser-config-DM73NZsB.js";
import os from "node:os";
//#region extensions/browser/src/browser/trash.ts
async function movePathToTrash(targetPath) {
	return await movePathToTrash$1(targetPath, { allowedRoots: [os.homedir(), resolvePreferredOpenClawTmpDir()] });
}
//#endregion
export { movePathToTrash as t };
