const { guildChannelMap } = require('../config');
const AuditLogEmbedBuilder = require('../classes/AuditLogEmbedBuilder');
const send = require('../util/send');

module.exports = (oldUser, newUser) => {
  if (oldUser.bot || newUser.bot) return;
  if (oldUser.equals(newUser)) return;

  const isSameUsername = oldUser.username === newUser.username;
  const isSameDiscriminator = oldUser.discriminator === newUser.discriminator;
  const isSameDisplayAvatarURL =
    oldUser.displayAvatarURL() === newUser.displayAvatarURL();
  for (const guildId of Object.keys(guildChannelMap)) {
    const guild = newUser.client.guilds.resolve(guildId);
    if (!guild) continue;
    if (!guild.members.resolve(newUser.id)) continue;

    const embed = new AuditLogEmbedBuilder()
      .setColor('neutralColor')
      .setUser(newUser);

    if (!isSameUsername || !isSameDiscriminator) {
      embed
        .setBody(`${oldUser.tag} ➡️ ${newUser.tag}`)
        .setFooter(
          `Changed ${
            !isSameUsername && !isSameDiscriminator
              ? 'tag'
              : !isSameUsername
              ? 'username'
              : 'discriminator'
          }`
        );

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
