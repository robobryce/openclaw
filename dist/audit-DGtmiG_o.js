import { t as inspectDiscordAccount } from "./account-inspect-C7_-Sk0V.js";
import { T as fetchChannelPermissionsDiscord } from "./send.shared-Dno-WXr3.js";
import "./send-CJUCc_vt.js";
import { n as collectDiscordAuditChannelIdsForAccount, t as auditDiscordChannelPermissionsWithFetcher } from "./audit-core-CG0uDTtC.js";
//#region extensions/discord/src/audit.ts
function collectDiscordAuditChannelIds(params) {
	return collectDiscordAuditChannelIdsForAccount(inspectDiscordAccount({
		cfg: params.cfg,
		accountId: params.accountId
	}).config);
}
async function auditDiscordChannelPermissions(params) {
	return await auditDiscordChannelPermissionsWithFetcher({
		...params,
		fetchChannelPermissions: fetchChannelPermissionsDiscord
	});
}
//#endregion
export { collectDiscordAuditChannelIds as n, auditDiscordChannelPermissions as t };
