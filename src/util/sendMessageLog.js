const getElapsedTime = require('./getElapsedTime');
const sendLog = require('./sendLog');

module.exports = (message, color, content, action) => {
  if (message.author.bot) {
    return;
  }

  sendLog(
    message.guild,
    message.author,
    color,
    `${message.channel} | ${message.author}\n${content}`,
    `Message ${action} after ${getElapsedTime(message.createdTimestamp)}s`
  );
};
