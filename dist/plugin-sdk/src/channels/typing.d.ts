export type TypingCallbacks = {
    onReplyStart: () => Promise<void>;
    onIdle?: () => void;
    /** Called when the typing controller is cleaned up (e.g. on NO_REPLY). */
    onCleanup?: () => void;
};
export type CreateTypingCallbacksParams = {
    start: () => Promise<void>;
    stop?: () => Promise<void>;
    onStartError: (err: unknown) => void;
    onStopError?: (err: unknown) => void;
    keepaliveIntervalMs?: number;
    /** Stop keepalive after this many consecutive start() failures. Default: 2 */
    maxConsecutiveFailures?: number;
    /** Maximum duration for typing indicator before auto-cleanup (safety TTL).
     *  Default: 0 (disabled). Channels that need a safety cap pass an explicit
     *  value (e.g. Discord, MS Teams). Without one, the indicator runs as long
     *  as the agent is producing output — long-running tool sessions need this
     *  so the user can see the agent is still working. */
    maxDurationMs?: number;
};
export declare function createTypingCallbacks(params: CreateTypingCallbacksParams): TypingCallbacks;
