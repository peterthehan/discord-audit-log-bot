const { editTimeThreshold, guildChannelMap } = require('../config');
const AuditLogEmbedBuilder = require('../classes/AuditLogEmbedBuilder');
const Time = require('../classes/Time');
const getDiff = require('../util/getDiff');
const getImages = require('../util/getImages');
const isLoggedGuild = require('../util/isLoggedGuild');
const send = require('../util/send');

module.exports = (oldMessage, newMessage) => {
  if (!isLoggedGuild(newMessage.guild)) return;
  if (
    guildChannelMap[newMessage.guild.id].ignoreChannelIds.includes(
      newMessage.channel.id
    )
  ) {
    return;
  }
  if (newMessage.author.bot) return;
  if (oldMessage.content === newMessage.content) return;

  const time = new Time(newMessage.createdTimestamp);
  if (time.getElapsedTime() < editTimeThreshold) return;

  getImages(newMessage).forEach((image, index) => {
    const embed = new AuditLogEmbedBuilder()
      .setColor('neutralColor')
      .setUser(newMessage.author)
      .setChannel(newMessage.channel)
      .setBody(!index ? getDiff(oldMessage.content, newMessage.content) : '')
      .setLink(newMessage.url)
      .setImage(image)
      .setFooter(`Edited message after ${time.getHumanizedElapsedTime()}`);

    send(newMessage.guild, embed);
  });
};
