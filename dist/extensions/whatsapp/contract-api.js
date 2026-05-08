import { c as normalizeWhatsAppTarget$1, t as isWhatsAppGroupJid$1 } from "../../normalize-target-DKlhHsjT.js";
import { t as whatsappCommandPolicy$1 } from "../../command-policy-C1zpM9d6.js";
import { t as resolveLegacyGroupSessionKey$1 } from "../../group-session-contract-CvlUL8k-.js";
import { n as unsupportedSecretRefSurfacePatterns, t as collectUnsupportedSecretRefConfigCandidates } from "../../security-contract-BVEvfZrC.js";
import { r as isLegacyGroupSessionKey$1, t as canonicalizeLegacySessionKey$1 } from "../../session-contract-C0Zt4HsB.js";
import { n as listWhatsAppDirectoryPeersFromConfig, t as listWhatsAppDirectoryGroupsFromConfig } from "../../directory-config-B8ilW0dS.js";
import { t as resolveWhatsAppRuntimeGroupPolicy$1 } from "../../runtime-group-policy-Dp17SxCI.js";
import { t as __testing } from "../../access-control-Dnna4JeR.js";
//#region extensions/whatsapp/contract-api.ts
const canonicalizeLegacySessionKey = canonicalizeLegacySessionKey$1;
const isLegacyGroupSessionKey = isLegacyGroupSessionKey$1;
const isWhatsAppGroupJid = isWhatsAppGroupJid$1;
const normalizeWhatsAppTarget = normalizeWhatsAppTarget$1;
const resolveLegacyGroupSessionKey = resolveLegacyGroupSessionKey$1;
const resolveWhatsAppRuntimeGroupPolicy = resolveWhatsAppRuntimeGroupPolicy$1;
const whatsappAccessControlTesting = __testing;
const whatsappCommandPolicy = whatsappCommandPolicy$1;
//#endregion
export { canonicalizeLegacySessionKey, collectUnsupportedSecretRefConfigCandidates, isLegacyGroupSessionKey, isWhatsAppGroupJid, listWhatsAppDirectoryGroupsFromConfig, listWhatsAppDirectoryPeersFromConfig, normalizeWhatsAppTarget, resolveLegacyGroupSessionKey, resolveWhatsAppRuntimeGroupPolicy, unsupportedSecretRefSurfacePatterns, whatsappAccessControlTesting, whatsappCommandPolicy };
