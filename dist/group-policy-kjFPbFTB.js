import { n as normalizeAccountId } from "./account-id-BQglYFe1.js";
import { i as normalizeHyphenSlug } from "./string-normalization-I9fP2Ebj.js";
import { i as resolveToolsBySender } from "./group-policy-sHYDXuCI.js";
import "./channel-policy-DRouLMRv.js";
import "./account-resolution-JGAwpkVB.js";
import { i as resolveDefaultSlackAccountId, r as mergeSlackAccountConfig } from "./accounts-C4Ki93-b.js";
//#region extensions/slack/src/group-policy.ts
function resolveSlackChannelPolicyEntry(params) {
	const accountId = normalizeAccountId(params.accountId ?? resolveDefaultSlackAccountId(params.cfg));
	const channelMap = mergeSlackAccountConfig(params.cfg, accountId).channels ?? {};
	if (Object.keys(channelMap).length === 0) return;
	const channelId = params.groupId?.trim();
	const channelName = params.groupChannel?.replace(/^#/, "");
	const normalizedName = normalizeHyphenSlug(channelName);
	const candidates = [
		channelId ?? "",
		channelName ? `#${channelName}` : "",
		channelName ?? "",
		normalizedName
	].filter(Boolean);
	for (const candidate of candidates) if (candidate && channelMap[candidate]) return channelMap[candidate];
	return channelMap["*"];
}
function resolveSenderToolsEntry(entry, params) {
	if (!entry) return;
	return resolveToolsBySender({
		toolsBySender: entry.toolsBySender,
		senderId: params.senderId,
		senderName: params.senderName,
		senderUsername: params.senderUsername,
		senderE164: params.senderE164
	}) ?? entry.tools;
}
function resolveSlackGroupRequireMention(params) {
	const resolved = resolveSlackChannelPolicyEntry(params);
	if (typeof resolved?.requireMention === "boolean") return resolved.requireMention;
	return true;
}
function resolveSlackGroupToolPolicy(params) {
	return resolveSenderToolsEntry(resolveSlackChannelPolicyEntry(params), params);
}
//#endregion
export { resolveSlackGroupToolPolicy as n, resolveSlackGroupRequireMention as t };
