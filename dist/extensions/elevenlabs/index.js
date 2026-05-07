import { t as definePluginEntry } from "../../plugin-entry-CJ7dbRiF.js";
import { t as elevenLabsMediaUnderstandingProvider } from "../../media-understanding-provider-B_IQFWWR.js";
import { n as buildElevenLabsRealtimeTranscriptionProvider } from "../../realtime-transcription-provider-DUrL9vnd.js";
import { t as buildElevenLabsSpeechProvider } from "../../speech-provider-kRlkTWjY.js";
//#region extensions/elevenlabs/index.ts
var elevenlabs_default = definePluginEntry({
	id: "elevenlabs",
	name: "ElevenLabs Speech",
	description: "Bundled ElevenLabs speech provider",
	register(api) {
		api.registerSpeechProvider(buildElevenLabsSpeechProvider());
		api.registerMediaUnderstandingProvider(elevenLabsMediaUnderstandingProvider);
		api.registerRealtimeTranscriptionProvider(buildElevenLabsRealtimeTranscriptionProvider());
	}
});
//#endregion
export { elevenlabs_default as default };
