const { guildChannelMap } = require('../config');
const AuditLogEmbedBuilder = require('../classes/AuditLogEmbedBuilder');
const send = require('../util/send');

module.exports = client => {
  Object.keys(guildChannelMap).forEach(guildId => {
    const embed = new AuditLogEmbedBuilder()
      .setColor('blurpleColor')
      .setFooter('Made with ❤ by peterthehan');

    send(client.guilds.resolve(guildId), embed);
  });

  console.log(`${client.user.tag}: Ready`);
};
