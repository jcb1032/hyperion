const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client();

client.on("ready", () => require("./src/events/ready.js")(client));

client.on("guildMemberAdd", require("./src/events/guildMemberAdd.js"));
client.on("guildMemberRemove", require("./src/events/guildMemberRemove.js"));

client.on("message", require("./src/events/message.js"));

client.ws.on("INTERACTION_CREATE", i => require("./src/events/interaction.js")(i, client));

client.login(fs.readFileSync('secrets/token.key', 'utf8'));
