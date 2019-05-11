const { addColor } = require('../config');
const sendLog = require('../util/sendLog');

module.exports = guildMember =>
  sendLog(
    guildMember,
    addColor,
    `${guildMember.user}\nAccount created: ${guildMember.user.createdAt
      .toISOString()
      .replace('T', ' ')
      .replace('Z', '')}`,
    `${guildMember.user.tag} joined`
  );
