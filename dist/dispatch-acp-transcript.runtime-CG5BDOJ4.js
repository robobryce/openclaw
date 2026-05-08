import { p as resolveSessionAgentId } from "./agent-scope-Bf757dCA.js";
import { u as resolveStorePath } from "./paths-BmdY-Qui.js";
import { t as loadSessionStore } from "./store-load-CZSUCJqj.js";
import { d as resolveSessionStoreEntry } from "./store-DPr34eb5.js";
import "./sessions-w65gbqiC.js";
import { n as resolveAcpSessionCwd } from "./session-identifiers-Bb9PPGCf.js";
import { o as persistAcpTurnTranscript } from "./attempt-execution-DdrCPzu5.js";
//#region src/auto-reply/reply/dispatch-acp-transcript.runtime.ts
async function persistAcpDispatchTranscript(params) {
	const promptText = params.promptText.trim();
	const finalText = params.finalText.trim();
	if (!promptText && !finalText) return;
	const sessionAgentId = resolveSessionAgentId({
		sessionKey: params.sessionKey,
		config: params.cfg
	});
	const storePath = resolveStorePath(params.cfg.session?.store, { agentId: sessionAgentId });
	const sessionStore = loadSessionStore(storePath, { skipCache: true });
	const sessionEntry = resolveSessionStoreEntry({
		store: sessionStore,
		sessionKey: params.sessionKey
	}).existing;
	const sessionId = sessionEntry?.sessionId;
	if (!sessionId) throw new Error(`unknown ACP session key: ${params.sessionKey}`);
	await persistAcpTurnTranscript({
		body: promptText,
		transcriptBody: promptText,
		finalText,
		sessionId,
		sessionKey: params.sessionKey,
		sessionEntry,
		sessionStore,
		storePath,
		sessionAgentId,
		threadId: params.threadId,
		sessionCwd: resolveAcpSessionCwd(params.meta) ?? process.cwd(),
		config: params.cfg
	});
}
//#endregion
export { persistAcpDispatchTranscript };
