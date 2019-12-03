const { name } = require('../../package');
const { guildChannelMap } = require('../config');
const AuditLogEmbedBuilder = require('../classes/AuditLogEmbedBuilder');
const send = require('../util/send');

module.exports = client => {
  console.log(`${name}|${client.user.tag}: Ready`);
  for (const guildId of Object.keys(guildChannelMap)) {
    const guild = client.guilds.resolve(guildId);
    if (!guild) continue;

    const embed = new AuditLogEmbedBuilder()
      .setColor('blurpleColor')
      .setFooter('Made with ❤ by peterthehan');

    send(guild, embed);
  }
};
