const {
  colors: { negative }
} = require('../config');
const AuditLogEmbedBuilder = require('../classes/AuditLogEmbedBuilder');
const Time = require('../classes/Time');
const isLoggedGuild = require('../util/isLoggedGuild');
const send = require('../util/send');

module.exports = async guildMember => {
  if (!isLoggedGuild(guildMember.guild)) return;

  const time = new Time(guildMember.joinedAt);
  const builder = new AuditLogEmbedBuilder()
    .setColor(negative)
    .setUser(guildMember.user)
    .setBody(`Joined server: ${time.toCleanISOString()}`)
    .setFooter(`Left the server after ${time.getHumanizedElapsedTime()}`);

  send(guildMember.guild, builder);
};
