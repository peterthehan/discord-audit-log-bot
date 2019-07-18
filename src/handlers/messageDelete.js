const { negativeColor, deleteTimeThreshold } = require('../config');
const getDescription = require('../util/getDescription');
const getElapsedTime = require('../util/getElapsedTime');
const getFooter = require('../util/getFooter');
const getImages = require('../util/getImages');
const humanizeTime = require('../util/humanizeTime');
const sendLog = require('../util/sendLog');

module.exports = message => {
  if (message.author.bot) return;

  const elapsedTime = getElapsedTime(message.createdTimestamp);
  if (elapsedTime < deleteTimeThreshold) return;

  const humanizedElapsedTime = humanizeTime(elapsedTime);

  const images = getImages(message);

  for (let i = 0; i < images.length; ++i) {
    const content = i > 0 ? '' : message.content;

    sendLog(message.guild, negativeColor, {
      ...images[i],
      ...getDescription(`${message.author} | ${message.channel}`, content),
      ...getFooter(
        message.author,
        `Deleted message after ${humanizedElapsedTime}`
      )
    });
  }
};
