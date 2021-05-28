const fs = require("fs");

const interactions = {};
const interactionFiles = fs.readdirSync("src/interactions").filter(file => file.endsWith(".js"));

for (let i of interactionFiles) {
	let int = require(`../interactions/${i}`);
	interactions[int.name] = int;
}

module.exports = (interaction, client) => {
	for(let i in interactions) {
		interactions[i].execute(interaction, client)
	}
}