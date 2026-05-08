import { a as normalizeLowercaseStringOrEmpty } from "./string-coerce-Bje8XVt9.js";
import { c as normalizeAgentId } from "./session-key-C01Y8-9J.js";
import { t as listAgentEntries } from "./agent-scope-config-Bj1Ovf8G.js";
import "./agent-scope-Bf757dCA.js";
import { o as resolveAgentRuntimePolicy } from "./model-runtime-aliases-D42aQk_c.js";
import { t as normalizeEmbeddedAgentRuntime } from "./runtime-CRBOzJGa.js";
//#region src/agents/agent-runtime-metadata.ts
function normalizeRuntimeValue(value) {
	const normalized = typeof value === "string" ? normalizeLowercaseStringOrEmpty(value) : "";
	return normalized ? normalizeEmbeddedAgentRuntime(normalized) : void 0;
}
function resolveAgentRuntimeMetadata(cfg, agentId, env = process.env) {
	const envRuntime = normalizeRuntimeValue(env.OPENCLAW_AGENT_RUNTIME);
	const normalizedAgentId = normalizeAgentId(agentId);
	const agentPolicy = resolveAgentRuntimePolicy(listAgentEntries(cfg).find((entry) => normalizeAgentId(entry.id) === normalizedAgentId));
	const defaultsPolicy = resolveAgentRuntimePolicy(cfg.agents?.defaults);
	if (envRuntime) return {
		id: envRuntime,
		source: "env"
	};
	const agentRuntime = normalizeRuntimeValue(agentPolicy?.id);
	if (agentRuntime) return {
		id: agentRuntime,
		source: "agent"
	};
	const defaultsRuntime = normalizeRuntimeValue(defaultsPolicy?.id);
	if (defaultsRuntime) return {
		id: defaultsRuntime,
		source: "defaults"
	};
	return {
		id: "pi",
		source: "implicit"
	};
}
//#endregion
export { resolveAgentRuntimeMetadata as t };
