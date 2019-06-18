const { neutralColor } = require('../config');
const getDescription = require('../util/getDescription');
const getDiffString = require('../util/getDiffString');
const getElapsedTime = require('../util/getElapsedTime');
const getFooter = require('../util/getFooter');
const getImage = require('../util/getImage');
const sendLog = require('../util/sendLog');

module.exports = (oldMessage, newMessage) => {
  if (newMessage.author.bot) return;
  if (oldMessage.content === newMessage.content) return;

  sendLog(newMessage.guild, neutralColor, {
    ...getImage(newMessage),
    ...getDescription(
      `${newMessage.author} | ${newMessage.channel}`,
      getDiffString(oldMessage, newMessage)
    ),
    ...getFooter(
      newMessage.author,
      `Message edited after ${getElapsedTime(newMessage.createdTimestamp)}s`
    )
  });
};
