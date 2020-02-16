const {
  colors: { negativeColor },
  deleteTimeThreshold
} = require('../config');
const AuditLogEmbedBuilder = require('../classes/AuditLogEmbedBuilder');
const Time = require('../classes/Time');
const getImages = require('../util/getImages');
const isLoggedChannel = require('../util/isLoggedChannel');
const isLoggedGuild = require('../util/isLoggedGuild');
const send = require('../util/send');

module.exports = message => {
  if (message.author.bot) return;
  if (!isLoggedGuild(message.guild)) return;
  if (!isLoggedChannel(message.channel)) return;

  const time = new Time(message.createdTimestamp);
  if (time.getElapsedTime() < deleteTimeThreshold) return;

  const builder = new AuditLogEmbedBuilder()
    .setColor(negativeColor)
    .setUser(message.author)
    .setChannel(message.channel)
    .setBody(!index ? message.content : '')
    .setImages(getImages(message))
    .setFooter(`Deleted message after ${time.getHumanizedElapsedTime()}`);

  send(message.guild, builder);
};
