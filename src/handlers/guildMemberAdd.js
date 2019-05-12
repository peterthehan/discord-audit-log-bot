const { addColor } = require('../config');
const sendLog = require('../util/sendLog');
const toCleanISOString = require('../util/toCleanISOString');

module.exports = guildMember =>
  sendLog(
    guildMember,
    addColor,
    `${guildMember.user}\nAccount created: ${toCleanISOString(
      guildMember.user.createdAt
    )}`,
    `${guildMember.user.tag} joined`
  );
