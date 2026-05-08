import { r as createLegacyPrivateNetworkDoctorContract } from "./ssrf-policy-BOQQhVEM.js";
import "./ssrf-runtime-D54GqMPE.js";
//#region extensions/nextcloud-talk/src/doctor-contract.ts
const contract = createLegacyPrivateNetworkDoctorContract({ channelKey: "nextcloud-talk" });
const legacyConfigRules = contract.legacyConfigRules;
const normalizeCompatibilityConfig = contract.normalizeCompatibilityConfig;
//#endregion
export { normalizeCompatibilityConfig as n, legacyConfigRules as t };
