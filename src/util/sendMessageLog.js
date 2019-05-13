const getElapsedTime = require('./getElapsedTime');
const sendLog = require('./sendLog');

module.exports = (message, color, content, action) => {
  if (message.author.bot) return;

  sendLog(
    { guild: message.guild, user: message.author },
    color,
    ` | ${message.channel}\n${content}`,
    `Message ${action} after ${getElapsedTime(message.createdTimestamp)}s`
  );
};
