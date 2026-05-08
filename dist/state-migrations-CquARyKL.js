import "./security-runtime-LgPkP2d5.js";
import { s as statRegularFileSync } from "./regular-file-D2Y2_Bvn.js";
import { t as resolveChannelAllowFromPath } from "./channel-pairing-paths-7gm1Szyw.js";
import { n as resolveDefaultTelegramAccountId } from "./account-selection-CuIEpA2e.js";
//#region extensions/telegram/src/state-migrations.ts
function fileExists(pathValue) {
	try {
		return !statRegularFileSync(pathValue).missing;
	} catch {
		return false;
	}
}
function detectTelegramLegacyStateMigrations(params) {
	const legacyPath = resolveChannelAllowFromPath("telegram", params.env);
	if (!fileExists(legacyPath)) return [];
	const accountId = resolveDefaultTelegramAccountId(params.cfg);
	const targetPath = resolveChannelAllowFromPath("telegram", params.env, accountId);
	if (fileExists(targetPath)) return [];
	return [{
		kind: "copy",
		label: "Telegram pairing allowFrom",
		sourcePath: legacyPath,
		targetPath
	}];
}
//#endregion
export { detectTelegramLegacyStateMigrations as t };
