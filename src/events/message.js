const fs = require("fs");

const commands = {};
const commandFiles = fs.readdirSync("src/commands").filter(file => file.endsWith(".js"));

for (let i of commandFiles) {
	let cmd = require(`../commands/${i}`);
	commands[cmd.name] = cmd;
}

module.exports = msg => {
	if (msg.channel.type == "dm") return require("../tasks/verify.js")(msg);
	if (msg.author.bot) return;

	for(let i in commands) {
		commands[i].execute(msg)
	}
}