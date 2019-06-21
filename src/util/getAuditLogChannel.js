const { guildChannelMap } = require('../config');
const isInvalidGuild = require('./isInvalidGuild');

const auditLogChannelCache = {};

module.exports = async guild => {
  if (isInvalidGuild(guild)) return;

  const { client, id } = guild;
  if (!(id in auditLogChannelCache)) {
    const auditLogChannel = await client.channels.fetch(guildChannelMap[id]);
    if (!auditLogChannel) return;

    auditLogChannelCache[id] = auditLogChannel;
  }

  return auditLogChannelCache[id];
};
