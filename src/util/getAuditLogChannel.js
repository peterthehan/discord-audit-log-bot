const { guildChannelMap } = require('../config');
const isInvalidGuild = require('./isInvalidGuild');

const auditLogChannelCache = {};

module.exports = async guild => {
  if (isInvalidGuild(guild)) return;

  const { client, id } = guild;
  if (!(id in auditLogChannelCache)) {
    auditLogChannelCache[id] = await client.channels.fetch(guildChannelMap[id]);
  }

  return auditLogChannelCache[id];
};
