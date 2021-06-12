/**
 * ready - fired when bot is first started and logged in successfully
 * @param {object} client - Discord.JS Client object
 */
module.exports = client => {
	console.log(`Logged in as ${client.user.tag}!`);
    
    client.user.setPresence({
        activity: {
            name: 'vibing in orbit, keeping you safe'
        }
    })
}