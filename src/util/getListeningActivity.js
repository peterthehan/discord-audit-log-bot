const AuditLogEmbedBuilder = require('../classes/AuditLogEmbedBuilder');

const listeningRegExp = /spotify/gi;

module.exports = (state, activity) => {
  if (!listeningRegExp.test(activity.name)) return;

  const embed = new AuditLogEmbedBuilder()
    .setColor('listeningColor')
    .setBody(activity.name);

  switch (state) {
    case 'true':
      return embed.setFooter('Started listening');
    case 'false':
      return embed.setFooter('Stopped listening');
    case 'null':
      return embed.setFooter('Changed listening');
  }

  return null;
};
