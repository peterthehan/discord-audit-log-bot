const { deleteColor } = require('../config');
const sendLog = require('../util/sendLog');

module.exports = guildMember =>
  sendLog(
    guildMember,
    deleteColor,
    `${guildMember.user}`,
    `${guildMember.user.tag} left`
  );
