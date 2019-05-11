const { editColor } = require('../config');
const getDiffString = require('../util/getDiffString');
const sendMessageLog = require('../util/sendMessageLog');

module.exports = (oldMessage, newMessage) => {
  if (oldMessage.content === newMessage.content) {
    return;
  }

  sendMessageLog(
    newMessage,
    editColor,
    getDiffString(oldMessage, newMessage),
    'edited'
  );
};
