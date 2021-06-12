# Hyperion
A moderator bot for The Planet Discord


### Folders
*src/commands* - Any text commands run by sending a message

*src/interactions* - Interaction commands (slash commands, button components)

*src/events* - Handling Discord websocket events, including messages, interactions, new members, etc

*src/tasks* - Any functions I felt like splitting up into multiple files I guess


### JSON Data
*data/captcha.json* - Keeps track of each user's personal captcha code

*data/config.json* - Random, unorganized configurations

*data/verification.json* - A collection of IDs for roles and channels, used for captcha verification

*data/optin-roles.json* - Every opt-in role, along with its corrisponding button color
