const {
  colors: { negative },
  deleteTimeThreshold,
} = require("../config");
const AuditLogEmbedBuilder = require("../classes/AuditLogEmbedBuilder");
const Time = require("../classes/Time");
const getImages = require("../util/getImages");
const isLoggedChannel = require("../util/isLoggedChannel");
const isLoggedGuild = require("../util/isLoggedGuild");
const send = require("../util/send");

module.exports = async (message, isBulkDelete = false) => {
  if (
    (message.author && message.author.bot) ||
    !isLoggedGuild(message.guild) ||
    !isLoggedChannel(message.channel)
  ) {
    return;
  }

  const time = new Time(message.createdTimestamp);
  if (time.getElapsedTime() < deleteTimeThreshold) {
    return;
  }

  const builder = new AuditLogEmbedBuilder()
    .setColor(negative)
    .setUser(message.author)
    .setChannel(message.channel)
    .setBody(message.content)
    .setImages(getImages(message))
    .setFooter(
      isBulkDelete
        ? `Bulk deleted message after ${time.getHumanizedElapsedTime()}`
        : `Deleted message after ${time.getHumanizedElapsedTime()}`
    );

  send(message.guild, builder);
};
