const {
  colors: { negativeColor }
} = require('../config');
const AuditLogEmbedBuilder = require('../classes/AuditLogEmbedBuilder');
const Time = require('../classes/Time');
const isLoggedGuild = require('../util/isLoggedGuild');
const send = require('../util/send');

module.exports = guildMember => {
  if (!isLoggedGuild(guildMember.guild)) return;

  const time = new Time(guildMember.joinedAt);
  const builder = new AuditLogEmbedBuilder()
    .setColor(negativeColor)
    .setUser(guildMember.user)
    .setBody(`Joined server: ${time.toCleanISOString()}`)
    .setFooter(`Left the server after ${time.getHumanizedElapsedTime()}`);

  send(guildMember.guild, builder);
};
