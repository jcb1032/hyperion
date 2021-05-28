# Hyperion
A moderator bot for The Planet Discord


### Folders
*src/commands* - Any text commands run by sending a message

*src/interactions* - Interaction commands (slash commands, button components)

*src/events* - Handling Discord websocket events, including messages, interactions, new members, etc

*src/tasks* - Any functions I felt like splitting up into multiple files I guess

*src/assets* - Any image files and stuff like that


### JSON Data
*data/captcha.json* - Keeps track of each user's personal captcha code

*data/roles.json* - Each opt-in button component role, [formatted as outlined by the Discord API](https://discord.com/developers/docs/interactions/message-components#actionrow "formatted as outlined by the Discord API")

*data/verification.json* - A collection of IDs for roles and channels, used for captcha verification
