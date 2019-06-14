const { guildChannelMap } = require('../config');

const auditLogChannelCache = {};

module.exports = async ({ client, id }) => {
  if (!(id in guildChannelMap)) return;
  if (!(id in auditLogChannelCache)) {
    auditLogChannelCache[id] = await client.channels.fetch(guildChannelMap[id]);
  }

  return auditLogChannelCache[id];
};
