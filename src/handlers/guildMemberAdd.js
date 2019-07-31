const AuditLogEmbedBuilder = require('../classes/AuditLogEmbedBuilder');
const Time = require('../classes/Time');
const send = require('../util/send');

module.exports = guildMember => {
  const time = new Time(guildMember.user.createdAt);
  const embed = new AuditLogEmbedBuilder()
    .setColor('positiveColor')
    .setUser(guildMember.user)
    .setBody(`Account created: ${time.toCleanISOString()}`)
    .setFooter(`Joined the server`);

  send(guildMember.guild, embed);
};
