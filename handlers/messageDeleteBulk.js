const messageDelete = require("./messageDelete");

module.exports = async (messages) =>
  messages
    .array()
    .forEach(async (message) => await messageDelete(message, true));
