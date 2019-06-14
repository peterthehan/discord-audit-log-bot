const getAuditLogChannel = require('./getAuditLogChannel');

module.exports = async (guild, color, embed) => {
  const auditLogChannel = await getAuditLogChannel(guild);
  if (!auditLogChannel) return;

  auditLogChannel.send({ embed: { ...embed, color, timestamp: Date.now() } });
};
