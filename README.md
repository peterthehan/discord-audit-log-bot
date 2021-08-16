# Discord Audit Log Bot

[![Discord](https://discord.com/api/guilds/258167954913361930/embed.png)](https://discord.gg/WjEFnzC) [![Twitter Follow](https://img.shields.io/twitter/follow/peterthehan.svg?style=social)](https://twitter.com/peterthehan)

A Discord bot that fills in the gaps in Discord's Audit Log.

|                                                                              |                                                                                                     |
| :--------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------: |
|         <img src="./assets/message-update.png"> <p>Message edit</p>          |                    <img src="./assets/message-delete.png"> <p>Message delete</p>                    |
| <img src="./assets/message-update-image.png"> <p>Message edit with image</p> | <img src="./assets/message-delete-thread.png"> <p>Message delete in thread with multiple images</p> |
|           <img src="./assets/member-join.png"> <p>Member join</p>            |                      <img src="./assets/member-leave.png"> <p>Member leave</p>                      |
|            <img src="./assets/tag-change.png"> <p>Tag change</p>             |                     <img src="./assets/avatar-change.png"> <p>Avatar change</p>                     |

## Setup

1. Follow the instructions in [create-discord-bot](https://github.com/peterthehan/create-discord-bot).

   > Don't forget to give your bot the `Manage Webhooks` permission!

2. Download this bot and move the `src-discord-audit-log-bot` folder into the [/src/bots](https://github.com/peterthehan/create-discord-bot/tree/master/src/bots) folder from step 1.

   > Run `npm i diff@^5.0.0` to install this bot's dependencies.

3. Open [config.json](./src-discord-audit-log-bot/config.json) to configure your own settings:

   ```json
   [
     {
       "defaultColor": "BLURPLE",
       "positiveColor": "#3498DB",
       "neutralColor": "#E67E22",
       "negativeColor": "#E91E63",
       "deleteTimeThreshold": 1,
       "updateTimeThreshold": 0,
       "guildId": "258167954913361930",
       "logChannelId": "560648403709591552",
       "ignoreChannelIds": ["649020657522180128"]
     }
   ]
   ```

   Add as many rules as you want to configure for other servers.

   - `defaultColor`, `positiveColor`, `neutralColor`, and `negativeColor` are used to color code log embeds by the action taken.
   - `deleteTimeThreshold` and `updateTimeThreshold` (in seconds) determine if message deletes or updates will be logged or not.
   - `guildId` is the server id.
   - `logChannelId` is the channel the bot logs into.
   - `ignoreChannelIds` is a list of channel ids that the bot ignores for logging, e.g. hidden admin-only channels, read-only information channels, etc.

4. `npm start` to run the bot.

Visit for more help or information!

<a href="https://discord.gg/WjEFnzC">
  <img src="https://discord.com/api/guilds/258167954913361930/embed.png?style=banner2" title="Discord Server"/>
</a>
