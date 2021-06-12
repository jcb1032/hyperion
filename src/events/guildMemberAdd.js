const fs = require("fs");
const fetch = require("node-fetch");

/**
 * guildMemberAdd event - fired whenever a member joins a guild
 * @param {object} member - Discord.JS GuildMember object
 */
module.exports = member => {
	let config = JSON.parse(fs.readFileSync("data/config.json"));
	let verification = JSON.parse(fs.readFileSync("data/verification.json"));
	if (config.lockdown) {
		member.send("Sorry, The Planet is currently in lockdown due to a bot attack. Because of this, you have been kicked.\nIf you are human, we'd still love for you to join us!\nPlease try joining again in a few hours. https://discord.gg/na3gdy3\n\nThanks, ~ The Planet Team").then(m => {
			member.kick({ reason: "lockdown" });
			fetch(`https://discord.com/api/channels/${verification.modChannelID}/messages`, {
				method: "post",
				headers: {
					Authorization: `Bot ${member.client.token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					embed: {
						author: {
							name: member.user.tag,
							icon_url: member.user.displayAvatarURL(),
						},
						fields: [
							{ name: "Status", value: "KICKED", inline: true },
							{ name: "Reason", value: "Lockdown", inline: true },
						],
						timestamp: new Date(),
						footer: { text: `User ID: ${member.user.id}` },
					},
				}),
			});
		});
		return;
	}
	if (!config.verification || config.beta) return;
	require("../tasks/verify-start.js")(member);
};
