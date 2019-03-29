# Discord Audit Log Bot

A Discord bot that fills in the gaps in Discord's Audit Log.

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
