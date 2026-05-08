import { c as logToolLoopAction } from "./diagnostic-D8XF5_t3.js";
import { n as getDiagnosticSessionState } from "./diagnostic-session-state-DaTaKPKP.js";
import { n as recordToolCall, r as recordToolCallOutcome, t as detectToolCallLoop } from "./tool-loop-detection-D-sMcggS.js";
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
