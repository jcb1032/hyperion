module.exports = client => {
	console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({
        activity: {
            name: 'vibing in orbit, keeping you safe'
        }
    })
}