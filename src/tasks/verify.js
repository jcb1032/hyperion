const fs = require("fs");
const fetch = require("node-fetch");
let verification = JSON.parse(fs.readFileSync("data/verification.json"));

/**
 * verify.js - Check if CAPTCHA verification code is correct; if it is, add "Community" role to the guild member
 * @param {object} msg - Discord.JS Message object
 */
module.exports = msg => {
	let captchas = JSON.parse(fs.readFileSync("data/captcha.json"));
	if (msg.author.bot) return;

	/* log all DMs to a channel in a private server */
	try {
		let chnl = msg.client.channels.cache.get("851593497098453042");
		chnl.send({
			embed: {
				author: {
					name: msg.author.tag,
					icon_url: msg.author.displayAvatarURL(),
				},
				description: msg.content,
				timestamp: new Date(),
				footer: { text: msg.author.id },
			},
		});
	} catch (e) {
		console.error(e);
	}

	if (!captchas[msg.author.id]) return; // if no captcha has been saved for this user

	if (msg.content.toUpperCase() != captchas[msg.author.id].code) {
		// if the code is incorrect
		msg.reply("Sorry, that code is incorrect.");

		captchas[msg.author.id].fails++;

		/* two fails (warning) */
		if (captchas[msg.author.id].fails == 2) {
			fetch(`https://discord.com/api/channels/${verification.modChannelID}/messages`, {
				method: "post",
				headers: {
					Authorization: `Bot ${msg.client.token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					content: `Hm, <@${msg.author.id}> has gotten the code wrong twice. Seems kinda sus to me.\nTime to bring out the 'ol :boot:?\n\n(member will be automatically kicked at 5 fails)`,
				}),
			});
		}

		/* five fails (kick) */
		if (captchas[msg.author.id].fails == 5) {
			try {
				let guild = msg.client.guilds.cache.get("402126095056633859");
				let member = guild.members.cache.get(msg.author.id);
				member.kick({ reason: "5 failed captchas" });
			} catch (e) {
				fetch(`https://discord.com/api/channels/${verification.modChannelID}/messages`, {
					method: "post",
					headers: {
						Authorization: `Bot ${msg.client.token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						content: `Uh oh, I tried to kick<@${msg.author.id}> but I couldn't!`,
					}),
				});
			}
		}

		fs.writeFile("data/captcha.json", JSON.stringify(captchas, null, 1), console.error);

        /* status message */
		try {
			fetch(`https://discord.com/api/channels/${verification.modChannelID}/messages/${captchas[msg.author.id].modMessage}`, {
				method: "patch",
				headers: {
					Authorization: `Bot ${msg.client.token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					embed: {
						author: {
							name: msg.author.tag,
							icon_url: msg.author.displayAvatarURL(),
						},
						fields: [
							{ name: "Status", value: captchas[msg.author.id].status, inline: true },
							{ name: "Failed Attempts", value: captchas[msg.author.id].fails, inline: true },
							{ name: "Code", value: captchas[msg.author.id].code, inline: true },
						],
						timestamp: new Date(),
						footer: { text: `User ID: ${msg.author.id}` },
					},
				}),
			});
		} catch (e) {
			console.error(e);
		}

		return; // the code is incorrect, so don't run the rest of this code
	}

	try {
		captchas[msg.author.id].status = "Verified"; // update stored status

        /* status message */
		fetch(`https://discord.com/api/channels/${verification.modChannelID}/messages/${captchas[msg.author.id].modMessage}`, {
			method: "patch",
			headers: {
				Authorization: `Bot ${msg.client.token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				embed: {
					author: {
						name: msg.author.tag,
						icon_url: msg.author.displayAvatarURL(),
					},
					fields: [
						{ name: "Status", value: "Verified", inline: true },
						{ name: "Failed Attempts", value: captchas[msg.author.id].fails, inline: true },
						{ name: "Code", value: captchas[msg.author.id].code, inline: true },
					],
					timestamp: new Date(),
					footer: { text: `User ID: ${msg.author.id}` },
				},
			}),
		})
			.then(res => res.json())
			.then(console.log);
	} catch (e) {
		console.error(e);
	}

    /* get the guild & guild member objects */
	let planetGuild = msg.client.guilds.cache.get(verification.guildID);
	if (!planetGuild) return msg.reply("Sorry, something went wrong.");
	let guildMember = planetGuild.members.cache.get(msg.author.id);
	if (!guildMember) return msg.reply("Something went wrong.");

	let welcomeMessage = `${msg.author.username} has landed on The Planet!`;

	let welcomeChannel = planetGuild.channels.cache.get(verification.welcomeChannelID);
	if (!welcomeChannel) return;

    /* verify user > send welcome message */
	guildMember.roles.add(verification.roleID).then(() => {
		msg.reply("You have been verified. Enjoy your time at The Planet!");
		welcomeChannel.send(welcomeMessage).then(m => m.react("👋"));
	});
};
