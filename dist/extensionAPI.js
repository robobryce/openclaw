import { a as resolveAgentDir, o as resolveAgentWorkspaceDir } from "./agent-scope-config-Bj1Ovf8G.js";
import "./agent-scope-Bf757dCA.js";
import { n as DEFAULT_MODEL, r as DEFAULT_PROVIDER } from "./defaults-4m7JJmD2.js";
import { i as resolveSessionFilePath, u as resolveStorePath } from "./paths-BmdY-Qui.js";
import { t as loadSessionStore } from "./store-load-D1NDZfCL.js";
import { i as saveSessionStore, o as updateSessionStore, s as updateSessionStoreEntry } from "./store-ykbL7YTc.js";
import "./sessions-3sxpPPQt.js";
import { p as resolveThinkingDefault } from "./model-selection-CEBK4_Qq.js";
import { t as resolveAgentTimeoutMs } from "./timeout-BqDEuVvO.js";
import { l as ensureAgentWorkspace } from "./workspace-Bn82tdyb.js";
import { n as resolveAgentIdentity } from "./identity-BJqKZTLs.js";
import { t as runEmbeddedPiAgent } from "./pi-embedded-CLQaf9Ey.js";
//#region src/extensionAPI.ts
if (process.env.VITEST !== "true" && process.env.OPENCLAW_SUPPRESS_EXTENSION_API_WARNING !== "1") process.emitWarning("openclaw/extension-api is deprecated. Migrate to api.runtime.agent.* or focused openclaw/plugin-sdk/<subpath> imports. See https://docs.openclaw.ai/plugins/sdk-migration", {
	code: "OPENCLAW_EXTENSION_API_DEPRECATED",
	detail: "This compatibility bridge is temporary. Bundled plugins should use the injected plugin runtime instead of importing host-side agent helpers directly. Migration guide: https://docs.openclaw.ai/plugins/sdk-migration"
});
//#endregion
export { DEFAULT_MODEL, DEFAULT_PROVIDER, ensureAgentWorkspace, loadSessionStore, resolveAgentDir, resolveAgentIdentity, resolveAgentTimeoutMs, resolveAgentWorkspaceDir, resolveSessionFilePath, resolveStorePath, resolveThinkingDefault, runEmbeddedPiAgent, saveSessionStore, updateSessionStore, updateSessionStoreEntry };
