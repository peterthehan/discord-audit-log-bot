# Discord Audit Log Bot

A Discord bot that fills in the gaps in Discord's Audit Log.

|                                                                                                                                                                    |                                                                                                                                                                        |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|           <img src="https://raw.githubusercontent.com/peterthehan/assets/master/repositories/discord-audit-log-bot/messageEdit.png"> <p>Message edit</p>           |           <img src="https://raw.githubusercontent.com/peterthehan/assets/master/repositories/discord-audit-log-bot/messageDelete.png"> <p>Message delete</p>           |
| <img src="https://raw.githubusercontent.com/peterthehan/assets/master/repositories/discord-audit-log-bot/messageEditWithImage.png"> <p>Message edit with image</p> | <img src="https://raw.githubusercontent.com/peterthehan/assets/master/repositories/discord-audit-log-bot/messageDeleteWithImage.png"> <p>Message delete with image</p> |
|            <img src="https://raw.githubusercontent.com/peterthehan/assets/master/repositories/discord-audit-log-bot/memberJoin.png"> <p>Member join</p>            |             <img src="https://raw.githubusercontent.com/peterthehan/assets/master/repositories/discord-audit-log-bot/memberLeave.png"> <p>Member leave</p>             |
|        <img src="https://raw.githubusercontent.com/peterthehan/assets/master/repositories/discord-audit-log-bot/streamingStart.png"> <p>Streaming start</p>        |           <img src="https://raw.githubusercontent.com/peterthehan/assets/master/repositories/discord-audit-log-bot/streamingStop.png"> <p>Streaming stop</p>           |
|             <img src="https://raw.githubusercontent.com/peterthehan/assets/master/repositories/discord-audit-log-bot/voiceJoin.png"> <p>Voice join</p>             |              <img src="https://raw.githubusercontent.com/peterthehan/assets/master/repositories/discord-audit-log-bot/voiceLeave.png"> <p>Voice leave</p>              |
|           <img src="https://raw.githubusercontent.com/peterthehan/assets/master/repositories/discord-audit-log-bot/voiceChange.png"> <p>Voice change</p>           |          <img src="https://raw.githubusercontent.com/peterthehan/assets/master/repositories/discord-audit-log-bot/usernameChange.png"> <p>Username change</p>          |
|          <img src="https://raw.githubusercontent.com/peterthehan/assets/master/repositories/discord-audit-log-bot/avatarChange.png"> <p>Avatar change</p>          |                                                                                                                                                                        |

## Setup

1. Follow the instructions in [create-discord-bot](https://github.com/peterthehan/create-discord-bot).

2. Download this widget and move it into the [src/widgets](https://github.com/peterthehan/create-discord-bot/blob/master/src/widgets/) folder.

> `npm i -s diff@^4.0.1` to install this widget's dependencies.

3. Open [config.js](https://github.com/peterthehan/discord-audit-log-bot/blob/master/config.js) to configure your own settings:

```js
clientMap: { web: '🌐', mobile: '📱', desktop: '💻' },
events: [
  'guildMemberAdd',
  'guildMemberRemove',
  'messageDelete',
  'messageDeleteBulk',
  'messageUpdate',
  'userUpdate',
  'voiceStateUpdate'
],
colors: {
  base: 0x7289da,
  positive: 0x3498db,
  neutral: 0xe67e22,
  negative: 0xe91e63
},
deleteTimeThreshold: 1,
editTimeThreshold: 0,
guildChannelMap: {
  'GUILD_1_ID': {
    logChannelId: 'TEXT_CHANNEL_1_ID',
    ignoreChannelIds: ['TEXT_CHANNEL_2_ID']
  },
  'GUILD_2_ID': {
    logChannelId: 'TEXT_CHANNEL_3_ID',
    ignoreChannelIds: ['TEXT_CHANNEL_4_ID']
  },
  // ...Add as many guild-channel mappings as you want.
}
```

> `clientMap` denotes the active clients the user is connected to. This displays in the log embed's footer.

> `events` denotes the type of events that are logged.

> `colors` are used to color code log embeds.

> Message edits or deletions that occur in less time than the `editTimeThreshold` or `deleteTimeThreshold` (in seconds), respectively, will not be logged.

> `logChannelId` is the channel the bot logs messages into.

> `ignoreChannelIds` tells the bot not to log messages from the listed channels (e.g. hidden admin-only channels, read-only information channels, etc).

Visit for more help or information!

<a href="https://discord.gg/WjEFnzC">
  <img src="https://discordapp.com/api/guilds/258167954913361930/embed.png?style=banner2" title="Discord Server"/>
</a>
