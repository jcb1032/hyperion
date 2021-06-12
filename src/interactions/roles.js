const fs = require("fs");

/* TODO: Clean this up once interactions are released publicly in Discord.JS */
module.exports = {
	name: "roles",
	execute: (interaction, client) => {

		/* role buttons */
		if (interaction.data.custom_id.startsWith("role_")) {
			let roleID = interaction.data.custom_id.split("_")[1];

			let guild = client.guilds.cache.get(interaction.guild_id);
			let member = guild.members.cache.get(interaction.member.user.id);
			if (guild && member) {
				let addRole = !member.roles.cache.get(roleID);
				if (addRole) member.roles.add(roleID);
				else member.roles.remove(roleID);

				client.api.interactions(interaction.id, interaction.token).callback.post({
					data: {
						type: 4,
						data: {
							content: `Role <@&${roleID}> ${addRole ? "added" : "removed"}.`,
							flags: 1 << 6,
						},
					},
				});
			}
		}
        
		/* add role */
		if (interaction.data.options[0].name == "add" || interaction.data.options[0].name == "remove") {
			let roleData = JSON.parse(fs.readFileSync("data/optin-roles.json")); // JSON.parse
			
			let roles = interaction.data.resolved.roles;
			let roleID = Object.keys(roles)[0];
			roleData[roleID] = {
                enabled: interaction.data.options[0].name == "add",
                color: interaction.data.options[0].options[1].value.split("_")[1]
            };
			fs.writeFileSync("data/optin-roles.json", JSON.stringify(roleData), console.error)
			client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: `Role <@&${roleID}> ${interaction.data.options[0].name == "add" ? "added" : "removed"}.`,
						flags: 1 << 6,
					},
				},
			});
			require("../tasks/role-update.js")(client) // Update role message
		}
	},
}