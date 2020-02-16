const { guildChannelMap } = require('../config');
const isLoggedGuild = require('./isLoggedGuild');

const auditLogChannelCache = {};

const _cacheAuditLogChannel = guild => {
  const auditLogChannel = guild.channels.resolve(
    guildChannelMap[guild.id].logChannelId
  );
  if (!auditLogChannel) return;

  auditLogChannelCache[guild.id] = auditLogChannel;
};

const _getAuditLogChannel = guild => {
  if (!(guild.id in auditLogChannelCache)) _cacheAuditLogChannel(guild);

  return auditLogChannelCache[guild.id];
};

module.exports = (guild, embed) => {
  if (!isLoggedGuild(guild)) return;

  const auditLogChannel = _getAuditLogChannel(guild);
  if (!auditLogChannel) return;

  auditLogChannel.send(embed.build());
};
