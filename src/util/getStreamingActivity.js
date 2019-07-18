const { streamingColor } = require('../config');
const getHyperlink = require('./getHyperlink');

module.exports = (key, activity) => {
  const streamingRegExp = /twitch/gi;
  if (!activity.url || !streamingRegExp.test(activity.url)) return;

  const stateMap = {
    true: { footerText: 'Started stream' },
    false: { footerText: 'Stopped stream' },
    null: { footerText: 'Changed stream' }
  };

  return {
    color: streamingColor,
    content: `${activity.details}: ${activity.name} ${getHyperlink(
      activity.url
    )}`,
    state: stateMap[key]
  };
};
