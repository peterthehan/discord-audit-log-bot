const { deleteColor } = require('../config');
const getDescription = require('../util/getDescription');
const getFooter = require('../util/getFooter');
const sendLog = require('../util/sendLog');
const toCleanISOString = require('../util/toCleanISOString');

module.exports = guildMember =>
  sendLog(guildMember.guild, deleteColor, {
    ...getDescription(
      guildMember.user,
      `Joined server: ${toCleanISOString(guildMember.joinedAt)}`
    ),
    ...getFooter(guildMember.user, `${guildMember.user.tag} left`)
  });
