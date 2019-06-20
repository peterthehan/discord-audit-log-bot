const { neutralColor, guildChannelMap } = require('../config');
const getDescription = require('../util/getDescription');
const getFooter = require('../util/getFooter');
const sendLog = require('../util/sendLog');

module.exports = (oldUser, newUser) => {
  if (oldUser.bot || newUser.bot) return;

  const isSameTag = oldUser.tag === newUser.tag;
  const isSameDisplayAvatarURL =
    oldUser.displayAvatarURL() === newUser.displayAvatarURL();
  if (isSameTag && isSameDisplayAvatarURL) return;

  for (const guildId of Object.keys(guildChannelMap)) {
    const guild = newUser.client.guilds.resolve(guildId);
    if (!guild.members.resolve(newUser.id)) continue;

    if (!isSameTag) {
      sendLog(guild, neutralColor, {
        ...getDescription(newUser, `${oldUser.tag} ➡️ ${newUser.tag}`),
        ...getFooter(newUser, 'Changed username')
      });
    }

    if (!isSameDisplayAvatarURL) {
      sendLog(guild, neutralColor, {
        image: { url: oldUser.displayAvatarURL() },
        ...getDescription(newUser, 'Old avatar:'),
        ...getFooter(newUser, 'Changed avatar')
      });
    }
  }
};
