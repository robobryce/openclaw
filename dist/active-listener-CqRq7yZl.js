import { r as resolveDefaultWhatsAppAccountId } from "./account-ids-XFULV7eu.js";
import { t as getRegisteredWhatsAppConnectionController } from "./connection-controller-registry-BHG1xdJU.js";
//#region extensions/whatsapp/src/active-listener.ts
function resolveWebAccountId(params) {
	return (params.accountId ?? "").trim() || resolveDefaultWhatsAppAccountId(params.cfg);
}
function getActiveWebListener(accountId) {
	return getRegisteredWhatsAppConnectionController(accountId)?.getActiveListener() ?? null;
}
//#endregion
export { resolveWebAccountId as n, getActiveWebListener as t };
