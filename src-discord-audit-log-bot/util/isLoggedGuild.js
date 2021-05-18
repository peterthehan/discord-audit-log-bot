const { guildChannelMap } = require("../config");

module.exports = (guild) => guild && guild.id in guildChannelMap;
