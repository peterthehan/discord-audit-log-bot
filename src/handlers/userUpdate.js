const { guildChannelMap } = require('../config');
const AuditLogEmbedBuilder = require('../classes/AuditLogEmbedBuilder');
const send = require('../util/send');

module.exports = (oldUser, newUser) => {
  if (oldUser.bot || newUser.bot) return;

  const isSameTag = oldUser.tag === newUser.tag;
  const isSameDisplayAvatarURL =
    oldUser.displayAvatarURL() === newUser.displayAvatarURL();
  if (isSameTag && isSameDisplayAvatarURL) return;

  for (const guildId of Object.keys(guildChannelMap)) {
    const guild = newUser.client.guilds.resolve(guildId);
    if (!guild.members.resolve(newUser.id)) continue;

    const embed = new AuditLogEmbedBuilder()
      .setColor('neutralColor')
      .setUser(newUser);

    if (!isSameTag) {
      embed
        .setBody(`${oldUser.tag} ➡️ ${newUser.tag}`)
        .setFooter('Changed username');
      send(guild, embed);
    }

    if (!isSameDisplayAvatarURL) {
      embed
        .setBody('Old avatar:')
        .setImage(oldUser.displayAvatarURL())
        .setFooter('Changed avatar');
      send(guild, embed);
    }
  }
};
