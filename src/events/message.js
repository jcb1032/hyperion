const fs = require("fs");

/* load in all modules from /src/commands */
const commands = {};
const commandFiles = fs.readdirSync("src/commands").filter(file => file.endsWith(".js"));

for (let i of commandFiles) {
	let cmd = require(`../commands/${i}`);
	commands[cmd.name] = cmd;
}

/**
 * message event - fired whenever a text message is created
 * @param {object} msg - Discord.JS Message object
 */
module.exports = msg => {
	if (msg.channel.type == "dm") return require("../tasks/verify.js")(msg);
	if (msg.author.bot) return;

	for(let i in commands) {
		commands[i].execute(msg)
	}
}