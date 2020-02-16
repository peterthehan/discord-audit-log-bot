const {
  colors: { positive }
} = require('../config');
const AuditLogEmbedBuilder = require('../classes/AuditLogEmbedBuilder');
const Time = require('../classes/Time');
const isLoggedGuild = require('../util/isLoggedGuild');
const send = require('../util/send');

module.exports = guildMember => {
  if (!isLoggedGuild(guildMember.guild)) return;

  const time = new Time(guildMember.user.createdAt);
  const builder = new AuditLogEmbedBuilder()
    .setColor(positive)
    .setUser(guildMember.user)
    .setBody(`Account created: ${time.toCleanISOString()}`)
    .setFooter('Joined the server');

  send(guildMember.guild, builder);
};
