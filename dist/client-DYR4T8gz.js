import { t as getMatrixScopedEnvVarNames } from "./env-vars-Dfr5Ex2F.js";
import { i as resolveScopedMatrixEnvConfig, r as resolveMatrixEnvAuthReadiness, t as hasReadyMatrixEnvAuth } from "./env-auth-Bph0pbU6.js";
import { n as validateMatrixHomeserverUrl, t as resolveValidatedMatrixHomeserverUrl } from "./url-validation-CNwd8CZA.js";
import { t as isBunRuntime } from "./runtime-Bjlb685H.js";
import { i as resolveMatrixConfigForAccount, n as resolveMatrixAuth, r as resolveMatrixAuthContext, t as backfillMatrixAuthDeviceIdAfterStartup } from "./config-DcFe9VES.js";
import { t as createMatrixClient } from "./create-client-B4INFJup.js";
import { i as resolveSharedMatrixClient, n as releaseSharedClientInstance, o as stopSharedClientForAccount, r as removeSharedClientInstance, s as stopSharedClientInstance, t as acquireSharedMatrixClient } from "./shared-DzP1UwOd.js";
import "./client-vpH3uEEl.js";
export { acquireSharedMatrixClient, backfillMatrixAuthDeviceIdAfterStartup, createMatrixClient, getMatrixScopedEnvVarNames, hasReadyMatrixEnvAuth, isBunRuntime, releaseSharedClientInstance, removeSharedClientInstance, resolveMatrixAuth, resolveMatrixAuthContext, resolveMatrixConfigForAccount, resolveMatrixEnvAuthReadiness, resolveScopedMatrixEnvConfig, resolveSharedMatrixClient, resolveValidatedMatrixHomeserverUrl, stopSharedClientForAccount, stopSharedClientInstance, validateMatrixHomeserverUrl };
