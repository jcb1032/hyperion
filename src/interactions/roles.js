module.exports = {
	name: "roles",
	execute: (interaction, client) => {
		if (!interaction.data.custom_id.startsWith("role_")) return;

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
						content: `Role <@&${roleID}> ${addRole ? 'added' : 'removed'}.`,
						flags: 1 << 6,
					},
				},
			});
		}
	},
};
