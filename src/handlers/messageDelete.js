const { deleteColor, deleteTimeThreshold } = require('../config');
const getDescription = require('../util/getDescription');
const getElapsedTime = require('../util/getElapsedTime');
const getFooter = require('../util/getFooter');
const sendLog = require('../util/sendLog');

module.exports = message => {
  if (message.author.bot) return;
  if (getElapsedTime(message.createdTimestamp) < deleteTimeThreshold) return;

  sendLog(message.guild, {
    color: deleteColor,
    ...getDescription(
      `${message.author} | ${message.channel}`,
      message.content
    ),
    ...getFooter(
      message.author,
      `Message deleted after ${getElapsedTime(message.createdTimestamp)}s`
    )
  });
};
