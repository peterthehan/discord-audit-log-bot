const getAuditLogChannel = require('./getAuditLogChannel');

module.exports = async (guild, embed) => {
  const auditLogChannel = await getAuditLogChannel(guild);
  if (!auditLogChannel) return;

  auditLogChannel.send({ embed });
};
