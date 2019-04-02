const { editColor, guildChannelMap } = require('../config');
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

    sendLog(
      guild,
      newUser,
      editColor,
      `${newUser}\n${oldUser.tag} ➡️ ${newUser.tag}`,
      'Username changed'
    );
  }
};
