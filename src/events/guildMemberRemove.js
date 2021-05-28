module.exports = member => {
	// send message in #moderation-station
	client.channels.cache.get('777741918825349121').send(`${member} (${member.user.tag}) has left.`)
}