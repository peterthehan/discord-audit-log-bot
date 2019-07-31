const AuditLogEmbedBuilder = require('../classes/AuditLogEmbedBuilder');
const Time = require('../classes/Time');
const send = require('../util/send');

module.exports = guildMember => {
  const time = new Time(guildMember.joinedAt);
  const embed = new AuditLogEmbedBuilder()
    .setColor('negativeColor')
    .setUser(guildMember.user)
    .setBody(`Joined server: ${time.toCleanISOString()}`)
    .setFooter(`Left the server`);

  send(guildMember.guild, embed);
};
