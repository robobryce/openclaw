import { a as buildProviderToolCompatFamilyHooks } from "../../provider-tools-B9T1AEGv.js";
import { t as definePluginEntry } from "../../plugin-entry-BWtmlM8X.js";
import { r as resolvePluginConfigObject } from "../../plugin-config-runtime-CTMobv4N.js";
import { t as buildOpenAICodexCliBackend } from "../../cli-backend-BCx-hpL2.js";
import { t as buildOpenAIImageGenerationProvider } from "../../image-generation-provider-D5uGptkJ.js";
import { n as openaiMediaUnderstandingProvider, t as openaiCodexMediaUnderstandingProvider } from "../../media-understanding-provider-Chdm8Xss.js";
import { t as openAiMemoryEmbeddingProviderAdapter } from "../../memory-embedding-adapter-CS4yn6n2.js";
import { t as buildOpenAICodexProviderPlugin } from "../../openai-codex-provider-B5Fsf2ot.js";
import { t as buildOpenAIProvider } from "../../openai-provider-DYY6vptq.js";
import { a as resolveOpenAISystemPromptContribution, i as resolveOpenAIPromptOverlayMode } from "../../prompt-overlay-BOjrqdOr.js";
import { t as buildOpenAIRealtimeTranscriptionProvider } from "../../realtime-transcription-provider-ey8nbp9I.js";
import { t as buildOpenAIRealtimeVoiceProvider } from "../../realtime-voice-provider-C6w6OD5q.js";
import { t as buildOpenAISpeechProvider } from "../../speech-provider-CnMxGsgD.js";
import { t as buildOpenAIVideoGenerationProvider } from "../../video-generation-provider-BgfGHt4f.js";
//#region extensions/openai/index.ts
var openai_default = definePluginEntry({
	id: "openai",
	name: "OpenAI Provider",
	description: "Bundled OpenAI provider plugins",
	register(api) {
		const openAIToolCompatHooks = buildProviderToolCompatFamilyHooks("openai");
		const buildProviderWithPromptContribution = (provider) => ({
			...provider,
			...openAIToolCompatHooks,
			resolveSystemPromptContribution: (ctx) => {
				const pluginConfig = resolvePluginConfigObject(ctx.config, "openai") ?? (ctx.config ? void 0 : api.pluginConfig);
				return resolveOpenAISystemPromptContribution({
					config: ctx.config,
					legacyPluginConfig: pluginConfig,
					mode: resolveOpenAIPromptOverlayMode(pluginConfig),
					modelProviderId: provider.id,
					modelId: ctx.modelId,
					trigger: ctx.trigger
				});
			}
		});
		api.registerCliBackend(buildOpenAICodexCliBackend());
		api.registerProvider(buildProviderWithPromptContribution(buildOpenAIProvider()));
		api.registerProvider(buildProviderWithPromptContribution(buildOpenAICodexProviderPlugin()));
		api.registerMemoryEmbeddingProvider(openAiMemoryEmbeddingProviderAdapter);
		api.registerImageGenerationProvider(buildOpenAIImageGenerationProvider());
		api.registerRealtimeTranscriptionProvider(buildOpenAIRealtimeTranscriptionProvider());
		api.registerRealtimeVoiceProvider(buildOpenAIRealtimeVoiceProvider());
		api.registerSpeechProvider(buildOpenAISpeechProvider());
		api.registerMediaUnderstandingProvider(openaiMediaUnderstandingProvider);
		api.registerMediaUnderstandingProvider(openaiCodexMediaUnderstandingProvider);
		api.registerVideoGenerationProvider(buildOpenAIVideoGenerationProvider());
	}
});
//#endregion
export { openai_default as default };
