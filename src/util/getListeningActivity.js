const { listeningColor } = require('../config');

module.exports = (key, activity) => {
  const listeningRegExp = /spotify/gi;
  if (!listeningRegExp.test(activity.name)) return;

  const stateMap = {
    true: { footerText: 'Started listening' },
    false: { footerText: 'Stopped listening' },
    null: { footerText: 'Changed listening' }
  };

  return {
    color: listeningColor,
    content: activity.name,
    state: stateMap[key]
  };
};
