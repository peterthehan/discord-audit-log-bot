const { deleteColor } = require('../config');
const sendLog = require('../util/sendLog');

module.exports = guildMember =>
  sendLog(
    guildMember.guild,
    guildMember.user,
    deleteColor,
    `${guildMember.user}`,
    `${guildMember.user.tag} left`
  );
