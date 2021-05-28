const fs = require("fs");
let captchas = JSON.parse(fs.readFileSync("data/captcha.json"));
let verification = JSON.parse(fs.readFileSync("data/verification.json"));

verification = {
	guildID: "782490968544247818",
	roleID: "847909037840007168",
	welcomeChannelID: "805153291313872946"
}

module.exports = msg => {
	if (msg.author.bot) return;
	if (!captchas[msg.author.id]) return;
	if (msg.content.toUpperCase() != captchas[msg.author.id]) return msg.reply("Sorry, that code is incorrect.");

	let planetGuild = msg.client.guilds.cache.get(verification.guildID);
	if (!planetGuild) return msg.reply("Something went wrong.")
	let guildMember = planetGuild.members.cache.get(msg.author.id);
	if (!guildMember) return msg.reply("Something went wrong.")

	let welcomeMessage = `${msg.author.username} has landed on The Planet!`;

	let welcomeChannel = planetGuild.channels.cache.get(verification.welcomeChannelID);
	if (!welcomeChannel) return;

	guildMember.roles.add(verification.roleID).then(() => {
		msg.reply("You have been verified. Enjoy your time at The Planet!")
		welcomeChannel.send(welcomeMessage).then(m => m.react('👋'))
	})
}