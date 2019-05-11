const { addColor, editColor, deleteColor } = require('../config');
const sendLog = require('../util/sendLog');

module.exports = (oldState, newState) => {
  const key =
    oldState.channel && newState.channel
      ? 'null'
      : Boolean(newState.channel).toString();

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

  const { color, description, text } = state[key];

  sendLog(
    newState.member,
    color,
    `${newState.member.user}\n${description}`,
    `${text} voice`
  );
};
