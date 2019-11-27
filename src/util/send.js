const { guildChannelMap } = require('../config');
const isLoggedGuild = require('./isLoggedGuild');

const auditLogChannelCache = {};

const _cacheAuditLogChannel = async guild => {
  const auditLogChannel = await guild.client.channels.fetch(
    guildChannelMap[guild.id].logChannelId
  );
  if (!auditLogChannel) return;

  auditLogChannelCache[guild.id] = auditLogChannel;
};

const _getAuditLogChannel = async guild => {
  if (!(guild.id in auditLogChannelCache)) await _cacheAuditLogChannel(guild);

  return auditLogChannelCache[guild.id];
};

module.exports = async (guild, embed) => {
  if (!isLoggedGuild(guild)) return;

  const auditLogChannel = await _getAuditLogChannel(guild);
  if (!auditLogChannel) return;

  auditLogChannel.send(embed.build());
};
