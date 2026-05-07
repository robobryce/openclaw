import { a as buildProviderToolCompatFamilyHooks } from "../../provider-tools-Dhkfu1Ql.js";
import { t as definePluginEntry } from "../../plugin-entry-CJ7dbRiF.js";
import { r as resolvePluginConfigObject } from "../../plugin-config-runtime-D57QYKMk.js";
import { t as buildOpenAICodexCliBackend } from "../../cli-backend-ymzpCjM3.js";
import { t as buildOpenAIImageGenerationProvider } from "../../image-generation-provider-sfASUOq9.js";
import { n as openaiMediaUnderstandingProvider, t as openaiCodexMediaUnderstandingProvider } from "../../media-understanding-provider-C92bh6uX.js";
import { t as openAiMemoryEmbeddingProviderAdapter } from "../../memory-embedding-adapter-DJOHTUuH.js";
import { t as buildOpenAICodexProviderPlugin } from "../../openai-codex-provider-CLLxUiSL.js";
import { t as buildOpenAIProvider } from "../../openai-provider-BI8S-DJO.js";
import { a as resolveOpenAISystemPromptContribution, i as resolveOpenAIPromptOverlayMode } from "../../prompt-overlay-CFGyhpSE.js";
import { t as buildOpenAIRealtimeTranscriptionProvider } from "../../realtime-transcription-provider-uedMI7La.js";
import { t as buildOpenAIRealtimeVoiceProvider } from "../../realtime-voice-provider-BoCc9X8o.js";
import { t as buildOpenAISpeechProvider } from "../../speech-provider-CzRYCn2R.js";
import { t as buildOpenAIVideoGenerationProvider } from "../../video-generation-provider-BLSyaKiU.js";
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
