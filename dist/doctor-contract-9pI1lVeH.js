import { r as createLegacyPrivateNetworkDoctorContract } from "./ssrf-policy-BOQQhVEM.js";
import "./ssrf-runtime-D54GqMPE.js";
//#region extensions/bluebubbles/src/doctor-contract.ts
const contract = createLegacyPrivateNetworkDoctorContract({ channelKey: "bluebubbles" });
const legacyConfigRules = contract.legacyConfigRules;
const normalizeCompatibilityConfig = contract.normalizeCompatibilityConfig;
//#endregion
export { normalizeCompatibilityConfig as n, legacyConfigRules as t };
