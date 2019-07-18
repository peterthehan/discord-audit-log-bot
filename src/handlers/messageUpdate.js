const { neutralColor } = require('../config');
const getDescription = require('../util/getDescription');
const getDiffString = require('../util/getDiffString');
const getElapsedTime = require('../util/getElapsedTime');
const getFooter = require('../util/getFooter');
const getHyperlink = require('../util/getHyperlink');
const getImages = require('../util/getImages');
const humanizeTime = require('../util/humanizeTime');
const sendLog = require('../util/sendLog');

module.exports = (oldMessage, newMessage) => {
  if (newMessage.author.bot) return;
  if (oldMessage.content === newMessage.content) return;

  const humanizedElapsedTime = humanizeTime(
    getElapsedTime(newMessage.createdTimestamp)
  );

  const images = getImages(newMessage);

  for (let i = 0; i < images.length; ++i) {
    const content =
      i > 0
        ? getHyperlink(newMessage.url)
        : getDiffString(oldMessage, newMessage);

    sendLog(newMessage.guild, neutralColor, {
      ...images[i],
      ...getDescription(
        `${newMessage.author} | ${newMessage.channel}`,
        content
      ),
      ...getFooter(
        newMessage.author,
        `Edited message after ${humanizedElapsedTime}`
      )
    });
  }
};
