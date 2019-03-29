# Discord Audit Log Bot

A Discord bot that fills in the gaps in Discord's Audit Log.

This bot tracks the following events:
- When the user leaves the server
- When the user updates their username
  - Shows the old and new username
- When the user deletes their message
  - Shows the deleted message
- When the user edits their message
  - Shows the old and new message

## Set up Bot

1. Follow instructions at [create-discord-bot](https://github.com/peterthehan/create-discord-bot).
2. Find [src/config.js](https://github.com/peterthehan/discord-audit-log-bot/blob/master/src/config.js), open the file, and add:

```js
guildChannelMap: {
  'GUILD_ID_1_HERE': 'TEXT_CHANNEL_ID_1_HERE',
  'GUILD_ID_2_HERE': 'TEXT_CHANNEL_ID_2_HERE',
  'GUILD_ID_3_HERE': 'TEXT_CHANNEL_ID_3_HERE',
  ...
}
```
