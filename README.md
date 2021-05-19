# Discord Audit Log Bot

[![Discord](https://discordapp.com/api/guilds/258167954913361930/embed.png)](https://discord.gg/WjEFnzC) [![Twitter Follow](https://img.shields.io/twitter/follow/peterthehan.svg?style=social)](https://twitter.com/peterthehan)

A Discord bot that fills in the gaps in Discord's Audit Log.

|                                                                                                                                                       |                                                                                                                                                           |
| :---------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------: |
|           <img src="https://raw.githubusercontent.com/peterthehan/discord-audit-log-bot/master/assets/messageEdit.png"> <p>Message edit</p>           |           <img src="https://raw.githubusercontent.com/peterthehan/discord-audit-log-bot/master/assets/messageDelete.png"> <p>Message delete</p>           |
| <img src="https://raw.githubusercontent.com/peterthehan/discord-audit-log-bot/master/assets/messageEditWithImage.png"> <p>Message edit with image</p> | <img src="https://raw.githubusercontent.com/peterthehan/discord-audit-log-bot/master/assets/messageDeleteWithImage.png"> <p>Message delete with image</p> |
|            <img src="https://raw.githubusercontent.com/peterthehan/discord-audit-log-bot/master/assets/memberJoin.png"> <p>Member join</p>            |             <img src="https://raw.githubusercontent.com/peterthehan/discord-audit-log-bot/master/assets/memberLeave.png"> <p>Member leave</p>             |
|        <img src="https://raw.githubusercontent.com/peterthehan/discord-audit-log-bot/master/assets/streamingStart.png"> <p>Streaming start</p>        |           <img src="https://raw.githubusercontent.com/peterthehan/discord-audit-log-bot/master/assets/streamingStop.png"> <p>Streaming stop</p>           |
|             <img src="https://raw.githubusercontent.com/peterthehan/discord-audit-log-bot/master/assets/voiceJoin.png"> <p>Voice join</p>             |              <img src="https://raw.githubusercontent.com/peterthehan/discord-audit-log-bot/master/assets/voiceLeave.png"> <p>Voice leave</p>              |
|           <img src="https://raw.githubusercontent.com/peterthehan/discord-audit-log-bot/master/assets/voiceChange.png"> <p>Voice change</p>           |          <img src="https://raw.githubusercontent.com/peterthehan/discord-audit-log-bot/master/assets/usernameChange.png"> <p>Username change</p>          |
|          <img src="https://raw.githubusercontent.com/peterthehan/discord-audit-log-bot/master/assets/avatarChange.png"> <p>Avatar change</p>          |                                                                                                                                                           |

## Setup

1. Follow the instructions in [create-discord-bot](https://github.com/peterthehan/create-discord-bot).

2. Download this widget and move the `src-discord-audit-log-bot` folder into the [src/widgets/](https://github.com/peterthehan/create-discord-bot/tree/master/app/src/widgets) folder created in step 1.

   > `npm i -s diff@^5.0.0` to install this widget's dependencies.

3. Open [config.json](https://github.com/peterthehan/discord-audit-log-bot/blob/master/src-discord-audit-log-bot/config.json) to configure your own settings:

   ```json
   {
     "clientMap": { "web": "🌐", "mobile": "📱", "desktop": "💻" },
     "colors": {
       "base": "7289da",
       "positive": "3498db",
       "neutral": "e67e22",
       "negative": "e91e63"
     },
     "deleteTimeThreshold": 1,
     "editTimeThreshold": 0,
     "guildChannelMap": {
       "258167954913361930": {
         "logChannelId": "560648403709591552",
         "ignoreChannelIds": ["649020657522180128"]
       }
     }
   }
   ```

   Add as many rules as you want to configure for other servers.

   - `clientMap` denotes the active clients the user is connected to. It displays in the log embed's footer.
   - `colors` are used to color code log embeds by the action taken.
   - Message edits or deletions that occur in less time than the `editTimeThreshold` or `deleteTimeThreshold` (in seconds), respectively, will not be logged.
   - `guildChannelMap` is a key-value map between server id and channel ids.
     - `logChannelId` is the channel the bot logs into.
     - `ignoreChannelIds` is a list of channel ids that the bot ignores for logging (e.g. hidden admin-only channels, read-only information channels, etc).

4. `npm start` to run the bot.

Visit for more help or information!

<a href="https://discord.gg/WjEFnzC">
  <img src="https://discordapp.com/api/guilds/258167954913361930/embed.png?style=banner2" title="Discord Server"/>
</a>
