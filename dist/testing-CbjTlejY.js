import { c as normalizeOptionalString } from "./string-coerce-Bje8XVt9.js";
import "./env-BMNR7OIF.js";
import "./manifest-registry-CHIgfMFu.js";
import "./runtime-guard-Bh62UvNQ.js";
import "./min-host-version-Dm9ljpAH.js";
import "./io-BvGD_Bil.js";
import "./safe-text-CFwWGKAm.js";
import "./call-BhCkIslH.js";
import "./loader-CNBOmExt.js";
import "./hook-runner-global-DoDt9n3I.js";
import "./runtime-D9WMzrM-.js";
import "./facade-runtime-CKRLxtAf.js";
import "./provider-discovery-Ce7VCxt4.js";
import "./system-events-B624oJ88.js";
import "./failover-matches-BUDZe9va.js";
import "./task-registry-BaF4NUvh.js";
import { i as toAcpRuntimeError } from "./errors-CKSSmeDI.js";
import "./manager-CmGc3whT.js";
import "./bundled-capability-runtime-BYgX_l0m.js";
import "./registry-B7KMganb.js";
import "./web-provider-public-artifacts.explicit-vPX2yIaY.js";
import "./deliver-CYL-_Cj3.js";
import "./live-auth-keys-DM7rSHI4.js";
import "./runtime-taskflow-kHDBnw2U.js";
import { t as buildCommandContext } from "./commands-context-DWgQSfXm.js";
import { t as parseInlineDirectives } from "./directive-handling.parse-BcshfkCd.js";
import "./png-encode-Dn_DGMjY.js";
import { t as globalExpect } from "./test.DNmyFkvJ-bfyWEIqf.js";
import "./hooks.test-helpers-BqiMDO1R.js";
import "./inbound-testkit-Cr6C8rTr.js";
import "./plugin-setup-wizard-BX2TD3WU.js";
import "./runtime-sidecar-paths-9bawfO61.js";
import "./provider-wizard-B0fCHuj8.js";
import "./provider-auth-choice.runtime-DF5CGGnC.js";
import "./frozen-time-CPIkt_Ma.js";
import "./commands-acp-BXjY6nRa.js";
import { randomUUID } from "node:crypto";
//#region src/plugins/provider-runtime.test-support.ts
const openaiCodexCatalogEntries = [
	{
		provider: "openai",
		id: "gpt-5.2",
		name: "GPT-5.2"
	},
	{
		provider: "openai",
		id: "gpt-5.2-pro",
		name: "GPT-5.2 Pro"
	},
	{
		provider: "openai",
		id: "gpt-5-mini",
		name: "GPT-5 mini"
	},
	{
		provider: "openai",
		id: "gpt-5-nano",
		name: "GPT-5 nano"
	},
	{
		provider: "openai-codex",
		id: "gpt-5.3-codex",
		name: "GPT-5.3 Codex"
	}
];
const expectedAugmentedOpenaiCodexCatalogEntries = [
	{
		provider: "openai",
		id: "gpt-5.4",
		name: "gpt-5.4"
	},
	{
		provider: "openai",
		id: "gpt-5.4-pro",
		name: "gpt-5.4-pro"
	},
	{
		provider: "openai",
		id: "gpt-5.4-mini",
		name: "gpt-5.4-mini"
	},
	{
		provider: "openai",
		id: "gpt-5.4-nano",
		name: "gpt-5.4-nano"
	},
	{
		provider: "openai-codex",
		id: "gpt-5.4",
		name: "gpt-5.4"
	},
	{
		provider: "openai-codex",
		id: "gpt-5.4-pro",
		name: "gpt-5.4-pro"
	},
	{
		provider: "openai-codex",
		id: "gpt-5.4-mini",
		name: "gpt-5.4-mini"
	}
];
const expectedAugmentedOpenaiCodexCatalogEntriesWithGpt55 = [
	{
		provider: "openai",
		id: "gpt-5.5-pro",
		name: "gpt-5.5-pro"
	},
	...expectedAugmentedOpenaiCodexCatalogEntries.slice(0, 4),
	{
		provider: "openai-codex",
		id: "gpt-5.5-pro",
		name: "gpt-5.5-pro"
	},
	...expectedAugmentedOpenaiCodexCatalogEntries.slice(4)
];
const expectedOpenaiPluginCodexCatalogEntriesWithGpt55 = expectedAugmentedOpenaiCodexCatalogEntriesWithGpt55;
function expectCodexMissingAuthHint(buildProviderMissingAuthMessageWithPlugin, expectedModel = "openai/gpt-5.5") {
	globalExpect(buildProviderMissingAuthMessageWithPlugin({
		provider: "openai",
		env: process.env,
		context: {
			env: process.env,
			provider: "openai",
			listProfileIds: (providerId) => providerId === "openai-codex" ? ["p1"] : []
		}
	})).toContain(expectedModel);
}
async function expectAugmentedCodexCatalog(augmentModelCatalogWithProviderPlugins, expectedEntries = expectedAugmentedOpenaiCodexCatalogEntries) {
	const result = await augmentModelCatalogWithProviderPlugins({
		env: process.env,
		context: {
			env: process.env,
			entries: openaiCodexCatalogEntries
		}
	});
	globalExpect(result).toHaveLength(expectedEntries.length);
	for (const entry of expectedEntries) globalExpect(result).toContainEqual(globalExpect.objectContaining(entry));
}
//#endregion
//#region src/acp/runtime/adapter-contract.testkit.ts
async function runAcpRuntimeAdapterContract(params) {
	const runtime = await params.createRuntime();
	const sessionKey = `agent:${params.agentId ?? "codex"}:acp:contract-${randomUUID()}`;
	const agent = params.agentId ?? "codex";
	const handle = await runtime.ensureSession({
		sessionKey,
		agent,
		mode: "persistent"
	});
	globalExpect(handle.sessionKey).toBe(sessionKey);
	globalExpect(handle.backend.trim()).not.toHaveLength(0);
	globalExpect(handle.runtimeSessionName.trim()).not.toHaveLength(0);
	const successEvents = [];
	for await (const event of runtime.runTurn({
		handle,
		text: params.successPrompt ?? "contract-success",
		mode: "prompt",
		requestId: `contract-success-${randomUUID()}`
	})) successEvents.push(event);
	globalExpect(successEvents.some((event) => event.type === "done" || event.type === "text_delta" || event.type === "status" || event.type === "tool_call")).toBe(true);
	globalExpect(successEvents.some((event) => event.type === "done")).toBe(true);
	await params.assertSuccessEvents?.(successEvents);
	if (params.includeControlChecks ?? true) {
		if (runtime.getStatus) {
			const status = await runtime.getStatus({ handle });
			globalExpect(status).toBeDefined();
			globalExpect(typeof status).toBe("object");
		}
		if (runtime.setMode) await runtime.setMode({
			handle,
			mode: "contract"
		});
		if (runtime.setConfigOption) await runtime.setConfigOption({
			handle,
			key: "contract_key",
			value: "contract_value"
		});
	}
	let errorThrown = null;
	const errorEvents = [];
	const errorPrompt = normalizeOptionalString(params.errorPrompt);
	if (errorPrompt) {
		try {
			for await (const event of runtime.runTurn({
				handle,
				text: errorPrompt,
				mode: "prompt",
				requestId: `contract-error-${randomUUID()}`
			})) errorEvents.push(event);
		} catch (error) {
			errorThrown = error;
		}
		const sawErrorEvent = errorEvents.some((event) => event.type === "error");
		globalExpect(Boolean(errorThrown) || sawErrorEvent).toBe(true);
		if (errorThrown) {
			const acpError = toAcpRuntimeError({
				error: errorThrown,
				fallbackCode: "ACP_TURN_FAILED",
				fallbackMessage: "ACP runtime contract expected an error turn failure."
			});
			globalExpect(acpError.code.length).toBeGreaterThan(0);
			globalExpect(acpError.message.length).toBeGreaterThan(0);
		}
	}
	await params.assertErrorOutcome?.({
		events: errorEvents,
		thrown: errorThrown
	});
	await runtime.cancel({
		handle,
		reason: "contract-cancel"
	});
	await runtime.close({
		handle,
		reason: "contract-close"
	});
}
//#endregion
//#region src/auto-reply/reply/commands.test-harness.ts
function buildCommandTestParams$1(commandBody, cfg, ctxOverrides, options) {
	const ctx = {
		Body: commandBody,
		CommandBody: commandBody,
		CommandSource: "text",
		CommandAuthorized: true,
		Provider: "whatsapp",
		Surface: "whatsapp",
		...ctxOverrides
	};
	return {
		ctx,
		cfg,
		command: buildCommandContext({
			ctx,
			cfg,
			isGroup: false,
			triggerBodyNormalized: commandBody.trim(),
			commandAuthorized: true
		}),
		directives: parseInlineDirectives(commandBody),
		elevated: {
			enabled: true,
			allowed: true,
			failures: []
		},
		sessionKey: "agent:main:main",
		workspaceDir: options?.workspaceDir ?? "/tmp",
		defaultGroupActivation: () => "mention",
		resolvedVerboseLevel: "off",
		resolvedReasoningLevel: "off",
		resolveDefaultThinkingLevel: async () => void 0,
		provider: "whatsapp",
		model: "test-model",
		contextTokens: 0,
		isGroup: false
	};
}
//#endregion
//#region src/auto-reply/reply/commands-spawn.test-harness.ts
function buildCommandTestParams(commandBody, cfg, ctxOverrides) {
	return buildCommandTestParams$1(commandBody, cfg, ctxOverrides);
}
//#endregion
export { expectedAugmentedOpenaiCodexCatalogEntriesWithGpt55 as a, expectCodexMissingAuthHint as i, runAcpRuntimeAdapterContract as n, expectedOpenaiPluginCodexCatalogEntriesWithGpt55 as o, expectAugmentedCodexCatalog as r, buildCommandTestParams as t };
