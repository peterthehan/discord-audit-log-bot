const AuditLogEmbedBuilder = require('../classes/AuditLogEmbedBuilder');

const listeningRegExp = /spotify/gi;

module.exports = (state, activity) => {
  if (!listeningRegExp.test(activity.name)) return;

  const embed = new AuditLogEmbedBuilder()
    .setColor('listeningColor')
    .setBody(activity.name);

  switch (state) {
    case 'START':
      return embed.setFooter('Started listening');
    case 'STOP':
      return embed.setFooter('Stopped listening');
    case 'CHANGE':
      return embed.setFooter('Changed listening');
  }

  return null;
};
