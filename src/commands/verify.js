module.exports = {
	name: "verify",
	description: "Manually verify a user",

	execute: msg => {
		if (!msg.member.roles.cache.get("558218337159741441")) return;
		if (msg.content.startsWith("!verify")) {
			let args = msg.content.split(" ");
			let member = msg.guild.members.cache.get(args[1]);
			member.roles.add("413955066563919874").then(() => msg.reply("User verified!"));
		}
	},
};
