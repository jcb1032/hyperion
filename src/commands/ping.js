const fs = require("fs");
module.exports = {
	name: "ping",
	execute: msg => {
		let config = JSON.parse(fs.readFileSync("data/config.json"));
		if (msg.content.startsWith(config.prefix + "ping")) msg.reply("Pong!")
	}
};
