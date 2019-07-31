const { guildChannelMap } = require('../config');
const isInvalidGuild = require('./isInvalidGuild');

const auditLogChannelCache = {};

const _cacheAuditLogChannel = async guild => {
  const { client, id } = guild;
  const auditLogChannel = await client.channels.fetch(guildChannelMap[id]);
  if (!auditLogChannel) return;

  auditLogChannelCache[id] = auditLogChannel;
};

const _getAuditLogChannel = async guild => {
  if (!(guild.id in auditLogChannelCache)) await _cacheAuditLogChannel(guild);

  return auditLogChannelCache[guild.id];
};

module.exports = async (guild, embed) => {
  if (isInvalidGuild(guild)) return;

  const auditLogChannel = await _getAuditLogChannel(guild);
  if (!auditLogChannel) return;

  auditLogChannel.send(embed.build());
};
