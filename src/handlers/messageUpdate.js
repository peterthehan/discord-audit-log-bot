const {
  colors: { neutralColor },
  editTimeThreshold
} = require('../config');
const AuditLogEmbedBuilder = require('../classes/AuditLogEmbedBuilder');
const Time = require('../classes/Time');
const getDiff = require('../util/getDiff');
const getImages = require('../util/getImages');
const isLoggedChannel = require('../util/isLoggedChannel');
const isLoggedGuild = require('../util/isLoggedGuild');
const send = require('../util/send');

module.exports = (oldMessage, newMessage) => {
  if (oldMessage.content === newMessage.content) return;

  if (newMessage.author.bot) return;
  if (!isLoggedGuild(newMessage.guild)) return;
  if (!isLoggedChannel(newMessage.channel)) return;

  const time = new Time(newMessage.createdTimestamp);
  if (time.getElapsedTime() < editTimeThreshold) return;

  const builder = new AuditLogEmbedBuilder()
    .setColor(neutralColor)
    .setUser(newMessage.author)
    .setChannel(newMessage.channel)
    .setBody(getDiff(oldMessage.content, newMessage.content))
    .setLink(newMessage.url)
    .setImages(getImages(newMessage))
    .setFooter(`Edited message after ${time.getHumanizedElapsedTime()}`);

  send(newMessage.guild, builder);
};
