const { positiveColor, neutralColor, negativeColor } = require('../config');
const getDescription = require('../util/getDescription');
const getFooter = require('../util/getFooter');
const sendLog = require('../util/sendLog');

module.exports = (oldState, newState) => {
  const key =
    oldState.channel && newState.channel
      ? 'null'
      : Boolean(newState.channel).toString();
  if (key === 'null' && oldState.channel.id === newState.channel.id) return;

  const state = {
    null: {
      color: neutralColor,
      description: `${oldState.channel} ➡️ ${newState.channel}`,
      text: 'Changed'
    },
    true: {
      color: positiveColor,
      description: `${newState.channel}`,
      text: 'Joined'
    },
    false: {
      color: negativeColor,
      description: `${oldState.channel}`,
      text: 'Left'
    }
  };
  if (!(key in state)) return;

  const { color, description, text } = state[key];

  sendLog(newState.member.guild, color, {
    ...getDescription(newState.member.user, description),
    ...getFooter(newState.member.user, `${text} voice`)
  });
};
