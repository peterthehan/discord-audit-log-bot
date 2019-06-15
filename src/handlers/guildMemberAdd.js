const { addColor } = require('../config');
const getDescription = require('../util/getDescription');
const getFooter = require('../util/getFooter');
const sendLog = require('../util/sendLog');
const toCleanISOString = require('../util/toCleanISOString');

module.exports = guildMember =>
  sendLog(guildMember.guild, addColor, {
    ...getDescription(
      guildMember.user,
      `Account created: ${toCleanISOString(guildMember.user.createdAt)}`
    ),
    ...getFooter(guildMember.user, `${guildMember.user.tag} joined`)
  });