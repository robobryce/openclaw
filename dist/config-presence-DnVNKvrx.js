import { s as normalizeOptionalLowercaseString } from "./string-coerce-Bje8XVt9.js";
import { v as resolveStateDir } from "./paths-BplLTi2s.js";
import { c as isRecord } from "./utils-Cs_zUMxj.js";
import { n as listBundledChannelIdsForPackageState, t as hasBundledChannelPackageState } from "./package-state-probes-X7qz-Flu.js";
import { o as resolveAgentRuntimePolicy, t as isCliRuntimeAlias } from "./model-runtime-aliases-D42aQk_c.js";
import { t as normalizeEmbeddedAgentRuntime } from "./runtime-CRBOzJGa.js";
import { a as modelSelectionShouldEnsureCodexPlugin } from "./openai-codex-routing-B5Dau954.js";
import { i as listBundledChannelIds } from "./bootstrap-registry-BRo88Pkg.js";
import { i as hasNonEmptyString } from "./channel-target-ClMH2Li0.js";
import fs from "node:fs";
import os from "node:os";
//#region src/agents/harness-runtimes.ts
function normalizeRuntimeId(value) {
	if (typeof value !== "string") return;
	const lower = normalizeOptionalLowercaseString(value);
	if (!lower) return;
	return normalizeOptionalLowercaseString(normalizeEmbeddedAgentRuntime(lower));
}
function listAgentModelRefs(value) {
	if (typeof value === "string") return [value];
	if (!isRecord(value)) return [];
	const refs = [];
	if (typeof value.primary === "string") refs.push(value.primary);
	if (Array.isArray(value.fallbacks)) {
		for (const fallback of value.fallbacks) if (typeof fallback === "string") refs.push(fallback);
	}
	return refs;
}
function hasOpenAIModelRef(config, value) {
	return listAgentModelRefs(value).some((ref) => {
		return modelSelectionShouldEnsureCodexPlugin({
			model: ref,
			config
		});
	});
}
function openAIModelUsesImplicitCodexHarness(runtime) {
	if (!runtime || runtime === "auto") return true;
	if (runtime === "pi") return false;
	return runtime === "codex" || isCliRuntimeAlias(runtime);
}
function collectConfiguredAgentHarnessRuntimes(config, env) {
	const runtimes = /* @__PURE__ */ new Set();
	const pushRuntime = (value) => {
		const normalized = normalizeRuntimeId(value);
		if (!normalized || normalized === "auto" || normalized === "pi") return;
		runtimes.add(normalized);
	};
	const pushCodexForOpenAIModel = (model, runtime) => {
		if (hasOpenAIModelRef(config, model) && openAIModelUsesImplicitCodexHarness(runtime)) runtimes.add("codex");
	};
	const envRuntime = normalizeRuntimeId(env.OPENCLAW_AGENT_RUNTIME);
	const defaultsRuntime = normalizeRuntimeId(resolveAgentRuntimePolicy(config.agents?.defaults)?.id);
	const defaultsModel = config.agents?.defaults?.model;
	pushRuntime(defaultsRuntime);
	pushCodexForOpenAIModel(defaultsModel, envRuntime ?? defaultsRuntime);
	if (Array.isArray(config.agents?.list)) for (const agent of config.agents.list) {
		if (!isRecord(agent)) continue;
		const agentRuntime = normalizeRuntimeId(resolveAgentRuntimePolicy(agent)?.id);
		pushRuntime(agentRuntime);
		pushCodexForOpenAIModel(agent.model ?? defaultsModel, envRuntime ?? agentRuntime ?? defaultsRuntime);
	}
	pushRuntime(envRuntime);
	return [...runtimes].toSorted((left, right) => left.localeCompare(right));
}
//#endregion
//#region src/channels/plugins/persisted-auth-state.ts
function listBundledChannelIdsWithPersistedAuthState() {
	return listBundledChannelIdsForPackageState("persistedAuthState");
}
function hasBundledChannelPersistedAuthState(params) {
	return hasBundledChannelPackageState({
		metadataKey: "persistedAuthState",
		channelId: params.channelId,
		cfg: params.cfg,
		env: params.env
	});
}
//#endregion
//#region src/channels/config-presence.ts
const IGNORED_CHANNEL_CONFIG_KEYS = new Set(["defaults", "modelByChannel"]);
function hasMeaningfulChannelConfig(value) {
	if (!isRecord(value)) return false;
	return Object.keys(value).some((key) => key !== "enabled");
}
function listExplicitlyDisabledChannelIdsForConfig(cfg) {
	const channels = isRecord(cfg.channels) ? cfg.channels : null;
	if (!channels) return [];
	return Object.entries(channels).filter(([, value]) => isRecord(value) && value.enabled === false).map(([channelId]) => normalizeOptionalLowercaseString(channelId)).filter((channelId) => Boolean(channelId));
}
function listChannelEnvPrefixes(channelIds) {
	return channelIds.map((channelId) => [`${channelId.replace(/[^a-z0-9]+/gi, "_").toUpperCase()}_`, channelId]);
}
function hasPersistedChannelState(env) {
	return fs.existsSync(resolveStateDir(env, os.homedir));
}
let persistedAuthStateChannelIds = null;
function listPersistedAuthStateChannelIds(options) {
	const override = options.persistedAuthStateProbe?.listChannelIds();
	if (override) return override;
	if (persistedAuthStateChannelIds) return persistedAuthStateChannelIds;
	persistedAuthStateChannelIds = listBundledChannelIdsWithPersistedAuthState();
	return persistedAuthStateChannelIds;
}
function hasPersistedAuthState(params) {
	const override = params.options.persistedAuthStateProbe;
	if (override) return override.hasState(params);
	return hasBundledChannelPersistedAuthState(params);
}
function listPotentialConfiguredChannelIds(cfg, env = process.env, options = {}) {
	return [...new Set(listPotentialConfiguredChannelPresenceSignals(cfg, env, options).map((signal) => signal.channelId))];
}
function listPotentialConfiguredChannelPresenceSignals(cfg, env = process.env, options = {}) {
	const signals = [];
	const seenSignals = /* @__PURE__ */ new Set();
	const addSignal = (channelId, source) => {
		const key = `${source}:${channelId}`;
		if (seenSignals.has(key)) return;
		seenSignals.add(key);
		signals.push({
			channelId,
			source
		});
	};
	const configuredChannelIds = /* @__PURE__ */ new Set();
	const channelEnvPrefixes = listChannelEnvPrefixes(options.channelIds ?? listBundledChannelIds(env));
	const channels = isRecord(cfg.channels) ? cfg.channels : null;
	if (channels) for (const [key, value] of Object.entries(channels)) {
		if (IGNORED_CHANNEL_CONFIG_KEYS.has(key)) continue;
		if (hasMeaningfulChannelConfig(value)) {
			configuredChannelIds.add(key);
			addSignal(key, "config");
		}
	}
	for (const [key, value] of Object.entries(env)) {
		if (!hasNonEmptyString(value)) continue;
		for (const [prefix, channelId] of channelEnvPrefixes) if (key.startsWith(prefix)) {
			configuredChannelIds.add(channelId);
			addSignal(channelId, "env");
		}
	}
	if (options.includePersistedAuthState !== false && hasPersistedChannelState(env)) {
		for (const channelId of listPersistedAuthStateChannelIds(options)) if (hasPersistedAuthState({
			channelId,
			cfg,
			env,
			options
		})) {
			configuredChannelIds.add(channelId);
			addSignal(channelId, "persisted-auth");
		}
	}
	return signals.filter((signal) => configuredChannelIds.has(signal.channelId));
}
//#endregion
export { collectConfiguredAgentHarnessRuntimes as a, listPotentialConfiguredChannelPresenceSignals as i, listExplicitlyDisabledChannelIdsForConfig as n, listPotentialConfiguredChannelIds as r, hasMeaningfulChannelConfig as t };
