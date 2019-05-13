const { addColor, editColor, deleteColor } = require('../config');
const sendLog = require('../util/sendLog');

module.exports = (oldState, newState) => {
  const key =
    oldState.channel && newState.channel
      ? 'null'
      : Boolean(newState.channel).toString();
  if (key === 'null' && oldState.channel.id === newState.channel.id) return;

  const state = {
    null: {
      color: editColor,
      description: `${oldState.channel} ➡️ ${newState.channel}`,
      text: 'Changed'
    },
    true: {
      color: addColor,
      description: `${newState.channel}`,
      text: 'Joined'
    },
    false: {
      color: deleteColor,
      description: `${oldState.channel}`,
      text: 'Left'
    }
  };
  if (!(key in state)) return;

  const { color, description, text } = state[key];

  sendLog(newState.member, color, `\n${description}`, `${text} voice`);
};
