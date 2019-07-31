const { deleteTimeThreshold } = require('../config');
const AuditLogEmbedBuilder = require('../classes/AuditLogEmbedBuilder');
const Time = require('../classes/Time');
const getImages = require('../util/getImages');
const send = require('../util/send');

module.exports = message => {
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
