const { editColor } = require('../config');
const sendMessageLog = require('../util/sendMessageLog');

module.exports = (oldMessage, newMessage) => {
  if (oldMessage.content === newMessage.content) {
    return;
  }

  sendMessageLog(
    oldMessage,
    editColor,
    `Old: ${oldMessage.content}\nNew: [${newMessage.content}](${
      newMessage.url
    })`,
    'edited'
  );
};
