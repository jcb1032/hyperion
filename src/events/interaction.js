const fs = require("fs");

/* load in all modules from /src/interactions */
const interactions = {};
const interactionFiles = fs.readdirSync("src/interactions").filter(file => file.endsWith(".js"));

for (let i of interactionFiles) {
	let int = require(`../interactions/${i}`);
	interactions[int.name] = int;
}

/**
 * interaction event - fired whenever someone uses a slash command or button component
 * @param {object} interaction - Discord API interaction object
 * @param {object} client - Discord.JS Client object
 */
module.exports = (interaction, client) => {
	for(let i in interactions) {
		interactions[i].execute(interaction, client)
	}
}