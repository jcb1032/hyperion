module.exports = {
	name: "refresh",
	execute: msg => {
		if (!msg.member.roles.cache.get("558218337159741441")) return;
		if (msg.content.startsWith("!refresh")) {
            msg.reply("Roles refreshed... maybe")
			require("../tasks/role-update.js")(msg.client)
		}
	},
};