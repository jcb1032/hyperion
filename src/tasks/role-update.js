const fs = require("fs");
const fetch = require("node-fetch");

let roleChannel = "599932227945496596"; // todo: put this in data/config.json

/**
 * role-update.js - Updates #welcome role message
 * @param {object} client - Discord.JS client object
 */
module.exports = client => {
	let roles = JSON.parse(fs.readFileSync("data/roles.json"));
	let roleData = JSON.parse(fs.readFileSync("data/optin-roles.json"));
	let comp = [];
	let guild = client.guilds.cache.get("402126095056633859");

	/* create button component object */
	let mCount = 999;
	for (let i in roleData) {
		/* create rows */
		if (mCount >= 4) {
			mCount = 0;
			comp.push({
				type: 1,
				components: [],
			});
		}
		mCount++;

		/* add buttons */
		if (roleData[i].enabled) {
			comp[comp.length - 1].components.push({
				type: 2,
				label: guild.roles.cache.get(i).name,
				style: roleData[i].color,
				custom_id: `role_${i}`,
			});
		}
	}

	let msgBody = {
		embed: {
			title: "The Planet Roles",
			description: "Use the buttons to choose your roles.",
		},
		components: comp,
	}; // message body to be sent

	/* if the role message can be edited, edit the role message */
	/* otherwise, create a new role message */
	fetch(`https://discord.com/api/channels/${roleChannel}/messages/${roles.roleMessage}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bot ${client.token}`,
		},
		body: JSON.stringify(msgBody),
	})
		.then(res => res.json())
		.then(res => {
			if (res.code) {
				if (res.code == 10008) { // error code 10008 - unknown message
					/* create a new message */
					fetch(`https://discord.com/api/channels/${roleChannel}/messages`, {
						method: "post",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bot ${client.token}`,
						},
						body: JSON.stringify({
							embed: {
								title: "The Planet Roles",
								description: "Use the buttons to choose your roles.",
							},
							components: comp,
						}),
					})
						.then(res => res.json())
						.then(res => {
							/* and then save the role message ID for later editing */
							if (res.id) roles.roleMessage = res.id;
							fs.writeFileSync("data/roles.json", JSON.stringify(roles, 0, 1), console.error);
						});
				}
			}
		});
};
