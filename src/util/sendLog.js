const getAuditLogChannel = require('./getAuditLogChannel');

module.exports = async ({ guild, user }, color, description, text) => {
  const auditLogChannel = await getAuditLogChannel(guild);
  if (!auditLogChannel) {
    return;
  }

  auditLogChannel.send({
    embed: {
      color,
      description,
      footer: {
        icon_url: user.displayAvatarURL(),
        text
      }
    }
  });
};
