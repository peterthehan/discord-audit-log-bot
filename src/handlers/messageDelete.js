const { deleteColor, deleteTimeThreshold } = require('../config');
const getElapsedTime = require('../util/getElapsedTime');
const sendMessageLog = require('../util/sendMessageLog');

module.exports = message => {
  if (getElapsedTime(message.createdTimestamp) < deleteTimeThreshold) {
    return;
  }

  sendMessageLog(message, deleteColor, message.content, 'deleted');
};
