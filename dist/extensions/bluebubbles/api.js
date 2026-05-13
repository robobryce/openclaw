import { T as isAllowedBlueBubblesSender } from "../../probe-DytTINOr.js";
import { a as bluebubblesCapabilities, c as bluebubblesMeta, i as blueBubblesSetupAdapter, l as bluebubblesReload, n as collectBlueBubblesStatusIssues, o as bluebubblesConfigAdapter, r as blueBubblesSetupWizard, s as bluebubblesConfigSchema, t as bluebubblesPlugin, u as describeBlueBubblesAccount } from "../../channel-6a5vuEi-.js";
import { n as BlueBubblesConfigSchema, t as BlueBubblesChannelConfigSchema } from "../../config-schema-CpDGCGmB.js";
import { n as createBlueBubblesConversationBindingManager, t as __testing } from "../../conversation-bindings-YBO1U6jk.js";
import { i as resolveBlueBubblesInboundConversationId, n as normalizeBlueBubblesAcpConversationId, r as resolveBlueBubblesConversationIdFromTarget, t as matchBlueBubblesAcpConversation } from "../../conversation-id-Bx-OTS_O.js";
import { n as resolveBlueBubblesGroupToolPolicy, t as resolveBlueBubblesGroupRequireMention } from "../../group-policy-C403VRdD.js";
//#region extensions/bluebubbles/src/channel.setup.ts
const bluebubblesSetupPlugin = {
	id: "bluebubbles",
	meta: {
		...bluebubblesMeta,
		aliases: [...bluebubblesMeta.aliases],
		preferOver: [...bluebubblesMeta.preferOver]
	},
	capabilities: bluebubblesCapabilities,
	reload: bluebubblesReload,
	configSchema: bluebubblesConfigSchema,
	setupWizard: blueBubblesSetupWizard,
	config: {
		...bluebubblesConfigAdapter,
		isConfigured: (account) => account.configured,
		describeAccount: (account) => describeBlueBubblesAccount(account)
	},
	setup: blueBubblesSetupAdapter
};
//#endregion
export { BlueBubblesChannelConfigSchema, BlueBubblesConfigSchema, __testing, bluebubblesPlugin, bluebubblesSetupPlugin, collectBlueBubblesStatusIssues, createBlueBubblesConversationBindingManager, isAllowedBlueBubblesSender, matchBlueBubblesAcpConversation, normalizeBlueBubblesAcpConversationId, resolveBlueBubblesConversationIdFromTarget, resolveBlueBubblesGroupRequireMention, resolveBlueBubblesGroupToolPolicy, resolveBlueBubblesInboundConversationId };
