const { deleteTimeThreshold, guildChannelMap } = require('../config');
const AuditLogEmbedBuilder = require('../classes/AuditLogEmbedBuilder');
const Time = require('../classes/Time');
const getImages = require('../util/getImages');
const isLoggedGuild = require('../util/isLoggedGuild');
const send = require('../util/send');

module.exports = message => {
  if (!isLoggedGuild(message.guild)) return;
  if (
    guildChannelMap[message.guild.id].ignoreChannelIds.includes(
      message.channel.id
    )
  ) {
    return;
  }
  if (message.author.bot) return;

  const time = new Time(message.createdTimestamp);
  if (time.getElapsedTime() < deleteTimeThreshold) return;

  getImages(message).forEach((image, index) => {
    const embed = new AuditLogEmbedBuilder()
      .setColor('negativeColor')
      .setUser(message.author)
      .setChannel(message.channel)
      .setBody(!index ? message.content : '')
      .setImage(image)
      .setFooter(`Deleted message after ${time.getHumanizedElapsedTime()}`);

    send(message.guild, embed);
  });
};
