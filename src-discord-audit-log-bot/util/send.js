const { guildChannelMap } = require("../config");

module.exports = (guild, builder) => {
  const auditLogChannelId = guildChannelMap[guild.id].logChannelId;
  const auditLogChannel = guild.channels.resolve(auditLogChannelId);
  if (!auditLogChannel) {
    return;
  }

  builder
    .build()
    .forEach(async (embed) => await auditLogChannel.send({ embed }));
};
