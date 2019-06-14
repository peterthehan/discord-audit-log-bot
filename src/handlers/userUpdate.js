const { editColor, guildChannelMap } = require('../config');
const getDescription = require('../util/getDescription');
const getFooter = require('../util/getFooter');
const sendLog = require('../util/sendLog');

module.exports = (oldUser, newUser) => {
  if (oldUser.bot || newUser.bot || oldUser.tag === newUser.tag) {
    return;
  }

  for (const guildId of Object.keys(guildChannelMap)) {
    const guild = newUser.client.guilds.resolve(guildId);
    if (!guild.members.resolve(newUser.id)) {
      continue;
    }

    sendLog(guild, editColor, {
      ...getDescription(newUser, `${oldUser.tag} ➡️ ${newUser.tag}`),
      ...getFooter(newUser, 'Username changed')
    });
  }
};
