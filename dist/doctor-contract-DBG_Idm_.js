import { r as createLegacyPrivateNetworkDoctorContract } from "./ssrf-policy-DXzuOZEO.js";
import "./ssrf-runtime-2NoQmkSk.js";
//#region extensions/mattermost/src/doctor-contract.ts
const contract = createLegacyPrivateNetworkDoctorContract({ channelKey: "mattermost" });
const legacyConfigRules = contract.legacyConfigRules;
const normalizeCompatibilityConfig = contract.normalizeCompatibilityConfig;
//#endregion
export { normalizeCompatibilityConfig as n, legacyConfigRules as t };
