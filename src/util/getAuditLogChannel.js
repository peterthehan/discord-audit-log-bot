const { guildChannelMap } = require('../config');

module.exports = async ({ client, id }) =>
  !guildChannelMap[id] ? null : client.channels.fetch(guildChannelMap[id]);
