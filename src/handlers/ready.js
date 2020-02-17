const { name } = require('../../package');
const {
  colors: { base },
  guildChannelMap
} = require('../config');
const AuditLogEmbedBuilder = require('../classes/AuditLogEmbedBuilder');
const send = require('../util/send');

module.exports = async client => {
  console.log(`${name}|${client.user.tag}: Ready`);

  const builder = new AuditLogEmbedBuilder()
    .setColor(base)
    .setFooter('Made with ❤ by peterthehan');

  Object.keys(guildChannelMap)
    .map(guildId => client.guilds.resolve(guildId))
    .filter(Boolean)
    .forEach(guild => send(guild, builder));
};
