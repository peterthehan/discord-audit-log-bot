const AuditLogEmbedBuilder = require('../classes/AuditLogEmbedBuilder');
const Time = require('../classes/Time');
const isLoggedGuild = require('../util/isLoggedGuild');
const send = require('../util/send');

module.exports = guildMember => {
  if (!isLoggedGuild(guildMember.guild)) return;

  const time = new Time(guildMember.joinedAt);
  const embed = new AuditLogEmbedBuilder()
    .setColor('negativeColor')
    .setUser(guildMember.user)
    .setBody(`Joined server: ${time.toCleanISOString()}`)
    .setFooter(`Left the server`);

  send(guildMember.guild, embed);
};
