const fs = require("fs");
module.exports = {
	name: "v",
	description: "Send you a test verification message (BETA ONLY)",
	execute: msg => {
		let config = JSON.parse(fs.readFileSync("data/config.json"));
		if (msg.content.startsWith(config.prefix + "v") && config.beta) {
			require("../tasks/verify-start.js")(msg.member)
		}
	}
};
