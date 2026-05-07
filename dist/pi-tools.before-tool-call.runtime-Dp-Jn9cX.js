import { c as logToolLoopAction } from "./diagnostic-yD4hYO6u.js";
import { n as getDiagnosticSessionState } from "./diagnostic-session-state-BOm76V7E.js";
import { n as recordToolCall, r as recordToolCallOutcome, t as detectToolCallLoop } from "./tool-loop-detection-Ba_nnQwD.js";
//#region src/agents/pi-tools.before-tool-call.runtime.ts
const beforeToolCallRuntime = {
	getDiagnosticSessionState,
	logToolLoopAction,
	detectToolCallLoop,
	recordToolCall,
	recordToolCallOutcome
};
//#endregion
export { beforeToolCallRuntime };
