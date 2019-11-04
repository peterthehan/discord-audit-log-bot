# Discord Audit Log Bot

A Discord bot that fills in the gaps in Discord's Audit Log.

| | |
|:-:|:-:|
|<img src="https://raw.githubusercontent.com/peterthehan/discord-audit-log-bot/master/assets/messageEdit.png"> Message edit|<img src="https://raw.githubusercontent.com/peterthehan/discord-audit-log-bot/master/assets/messageDelete.png"> Message delete|
|<img src="https://raw.githubusercontent.com/peterthehan/discord-audit-log-bot/master/assets/messageEditWithImage.png"> Message edit with image|<img src="https://raw.githubusercontent.com/peterthehan/discord-audit-log-bot/master/assets/messageDeleteWithImage.png"> Message delete with image|
|<img src="https://raw.githubusercontent.com/peterthehan/discord-audit-log-bot/master/assets/memberJoin.png"> Member join|<img src="https://raw.githubusercontent.com/peterthehan/discord-audit-log-bot/master/assets/memberLeave.png"> Member leave|
|<img src="https://raw.githubusercontent.com/peterthehan/discord-audit-log-bot/master/assets/voiceJoin.png"> Voice join|<img src="https://raw.githubusercontent.com/peterthehan/discord-audit-log-bot/master/assets/voiceChange.png"> Voice change|
|<img src="https://raw.githubusercontent.com/peterthehan/discord-audit-log-bot/master/assets/voiceLeave.png"> Voice leave|<img src="https://raw.githubusercontent.com/peterthehan/discord-audit-log-bot/master/assets/streamStart.png"> Stream start|
|<img src="https://raw.githubusercontent.com/peterthehan/discord-audit-log-bot/master/assets/streamChange.png"> Stream change|<img src="https://raw.githubusercontent.com/peterthehan/discord-audit-log-bot/master/assets/streamStop.png"> Stream stop|
|<img src="https://raw.githubusercontent.com/peterthehan/discord-audit-log-bot/master/assets/listeningStart.png"> Listening start|<img src="https://raw.githubusercontent.com/peterthehan/discord-audit-log-bot/master/assets/listeningStop.png"> Listening stop|
|<img src="https://raw.githubusercontent.com/peterthehan/discord-audit-log-bot/master/assets/avatarChange.png"> Avatar change|<img src="https://raw.githubusercontent.com/peterthehan/discord-audit-log-bot/master/assets/usernameChange.png"> Username change|

## Setup

1. Adapt and follow the steps found in [create-discord-bot](https://github.com/peterthehan/create-discord-bot).

2. Open [src/config.js](https://github.com/peterthehan/discord-audit-log-bot/blob/master/src/config.js) to configure your own settings:

```js
clientMap: { web: '🌐', mobile: '📱', desktop: '💻' },
events: [
  'guildMemberAdd',
  'guildMemberRemove',
  'messageDelete',
  'messageUpdate',
  'presenceUpdate',
  'userUpdate',
  'voiceStateUpdate'
],
colors: {
  blurpleColor: 0x7289da,
  positiveColor: 0x3498db,
  neutralColor: 0xe67e22,
  negativeColor: 0xe91e63,
  streamingColor: 0x6441a4,
  listeningColor: 0x1db954
},
deleteTimeThreshold: 1,
editTimeThreshold: 0,
guildChannelMap: {
  'GUILD_1_ID': 'TEXT_CHANNEL_1_ID',
  'GUILD_2_ID': 'TEXT_CHANNEL_2_ID',
  'GUILD_3_ID': 'TEXT_CHANNEL_3_ID',
  // ...Add as many guild-channel mappings as you want.
}
```

> `clientMap` denotes the active clients the user is connecting from. This displays in the embed's footer.

> `events` is a list of the events that are logged.

> Message edits or deletions that occur in less time than the `editTimeThreshold` or `deleteTimeThreshold` (in seconds), respectively, will not be logged.

Visit for more help or information!

<a href="https://discord.gg/WjEFnzC">
  <img src="https://discordapp.com/api/guilds/258167954913361930/embed.png?style=banner2" title="Discord Server"/>
</a>
