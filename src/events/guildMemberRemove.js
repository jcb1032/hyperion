/**
 * guildMemberRemove event - fired whenever a member leaves a guild
 * @param {object} member - Discord.JS GuildMember object
 */
module.exports = (member, client) => {
	// send message in #moderation-station
	client.channels.cache.get('777741918825349121').send(`${member} (${member.user.tag}) has left.`)
}