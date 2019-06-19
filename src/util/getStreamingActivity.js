const { streamingColor } = require('../config');

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
    content: `${activity.details}: ${activity.name} [[link]](${activity.url})`,
    state: stateMap[key]
  };
};
