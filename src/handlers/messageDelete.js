const { deleteColor } = require('../config');
const sendMessageLog = require('../util/sendMessageLog');

module.exports = message =>
  sendMessageLog(message, deleteColor, message.content, 'deleted');
