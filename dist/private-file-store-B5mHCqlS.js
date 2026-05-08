import "./fs-safe-defaults-CXEo8t9D.js";
import { n as fileStoreSync, t as fileStore } from "./file-store-PM-h26hV.js";
//#region src/infra/private-file-store.ts
function privateFileStore(rootDir) {
	return fileStore({
		rootDir,
		private: true
	});
}
function privateFileStoreSync(rootDir) {
	return fileStoreSync({
		rootDir,
		private: true
	});
}
//#endregion
export { privateFileStoreSync as n, privateFileStore as t };
