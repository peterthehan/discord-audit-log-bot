const { guildChannelMap } = require('../config');

module.exports = channel =>
  !guildChannelMap[channel.guild.id].ignoreChannelIds.includes(channel.id);
