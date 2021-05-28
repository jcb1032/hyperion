const fs = require("fs");
const fetch = require("node-fetch");

let roles = JSON.parse(fs.readFileSync("data/roles.json"));

module.exports = {
	name: "roles",
	execute: msg => {
		if (msg.content.startsWith("!roles refresh")) {
			fetch(`https://discord.com/api/channels/${roles.channelID}/messages`, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bot ${fs.readFileSync('secrets/token.key', 'utf8')}`,
				},
				body: JSON.stringify({
					content: "Use the buttons below to pick your roles.",
					components: roles.list,
				}),
			});
		}
	},
};
