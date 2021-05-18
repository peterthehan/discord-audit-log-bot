const {
  colors: { neutral },
  guildChannelMap,
} = require("../config");
const AuditLogEmbedBuilder = require("../classes/AuditLogEmbedBuilder");
const send = require("../util/send");

const getIdentifierFooter = (isSameUsername, isSameDiscriminator) =>
  !isSameUsername && !isSameDiscriminator
    ? "Changed tag"
    : !isSameUsername
    ? "Changed username"
    : "Changed discriminator";

module.exports = async (oldUser, newUser) => {
  if (oldUser.bot || newUser.bot || oldUser.equals(newUser)) {
    return;
  }

  const isSameUsername = oldUser.username === newUser.username;
  const isSameDiscriminator = oldUser.discriminator === newUser.discriminator;
  const isSameDisplayAvatarURL =
    oldUser.displayAvatarURL() === newUser.displayAvatarURL();

  const builder = new AuditLogEmbedBuilder().setColor(neutral).setUser(newUser);

  Object.keys(guildChannelMap)
    .map((guildId) => newUser.client.guilds.resolve(guildId))
    .filter((guild) => guild && guild.members.resolve(newUser.id))
    .forEach(async (guild) => {
      if (!isSameUsername || !isSameDiscriminator) {
        builder
          .setBody(`${oldUser.tag} ➡️ ${newUser.tag}`)
          .setImages(null)
          .setFooter(getIdentifierFooter(isSameUsername, isSameDiscriminator));
        await send(guild, builder);
      }

      if (!isSameDisplayAvatarURL) {
        builder
          .setBody("Old avatar:")
          .setImages([oldUser.displayAvatarURL()])
          .setFooter("Changed avatar");
        await send(guild, builder);
      }
    });
};
