const fs = require("fs");
const fetch = require("node-fetch");

/**
 * verify-start.js - Send a message to new users with a CAPTCHA code for verification
 * @param {object} member - Discord.JS GuildMember object
 */
module.exports = member => {
	let captchas = JSON.parse(fs.readFileSync("data/captcha.json"));
	let verification = JSON.parse(fs.readFileSync("data/verification.json"));

	let captchaCode = (() => {
		let a = "";
		for (let i = 0; i < 6; i++) a += String.fromCharCode(65 + Math.floor(Math.random() * 26));
		return a;
	})();

	captchas[member.id] = {
		code: captchaCode,
		fails: 0,
		status: "Sent",
	};
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
					{ name: "Status", value: captchas[member.user.id].status, inline: true },
					{ name: "Failed Attempts", value: captchas[member.user.id].fails, inline: true },
					{ name: "Code", value: captchas[member.user.id].code, inline: true },
				],
				timestamp: new Date(),
				footer: { text: `User ID: ${member.user.id}` },
			},
		}),
	})
		.then(res => res.json())
		.then(res => {
			captchas[member.id].modMessage = res.id;
			fs.writeFile("data/captcha.json", JSON.stringify(captchas, null, 1), voidError);
		});

	fs.writeFile("data/captcha.json", JSON.stringify(captchas, null, 1), voidError);

	require("../tasks/canvas.js")(captchaCode).then(png_data => {
		member.user.send({
			embed: {
				title: "**The Planet** Verification",
				description: "Please reply to this message with the code above.",
				footer: {
					text: "This is a new feature we're trying out, so if you have any feedback, please feel free to let us know!",
				},
			},
			files: [
				{
					attachment: require("../tasks/tts.js")(captchaCode),
					name: "captcha.mp3",
				},
				{
					attachment: png_data,
					name: "captcha.png",
				},
			],
		});
	});
};
function voidError(e) {
	if (e) console.error(e);
}
