const { positiveColor, neutralColor, negativeColor } = require('../config');
const getDescription = require('../util/getDescription');
const getElapsedTime = require('../util/getElapsedTime');
const getFooter = require('../util/getFooter');
const humanizeTime = require('../util/humanizeTime');
const sendLog = require('../util/sendLog');

const voiceCache = {};

module.exports = (oldState, newState) => {
  const key =
    oldState.channel && newState.channel
      ? 'null'
      : Boolean(newState.channel).toString();
  if (key === 'null' && oldState.channel.id === newState.channel.id) return;

  let elapsedTimeText = '';
  if (key === 'true') {
    voiceCache[newState.member.user.id] = Date.now();
  } else {
    if (newState.member.user.id in voiceCache) {
      const humanizedElapsedTime = humanizeTime(
        getElapsedTime(voiceCache[newState.member.user.id])
      );
      delete voiceCache[newState.member.user.id];

      elapsedTimeText = ` after ${humanizedElapsedTime}`;
    }

    if (key === 'null') {
      voiceCache[newState.member.user.id] = Date.now();
    }
  }

  const state = {
    true: {
      color: positiveColor,
      description: `${newState.channel}`,
      text: 'Joined voice'
    },
    false: {
      color: negativeColor,
      description: `${oldState.channel}`,
      text: `Left voice${elapsedTimeText}`
    },
    null: {
      color: neutralColor,
      description: `${oldState.channel} ➡️ ${newState.channel}`,
      text: `Changed voice${elapsedTimeText}`
    }
  };
  if (!(key in state)) return;

  const { color, description, text } = state[key];

  sendLog(newState.member.guild, color, {
    ...getDescription(newState.member.user, description),
    ...getFooter(newState.member.user, text)
  });
};
