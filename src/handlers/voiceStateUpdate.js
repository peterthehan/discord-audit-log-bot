const Time = require('../classes/Time');
const VoiceFactory = require('../classes/VoiceFactory');
const send = require('../util/send');

const voiceCache = {};

const _getStateEnum = (oldChannel, newChannel) =>
  oldChannel && newChannel ? 'CHANGE' : Boolean(newChannel) ? 'JOIN' : 'LEAVE';

const _getHumanizedElapsedTimeText = (state, userId) => {
  if (state === 'JOIN') {
    voiceCache[userId] = Date.now();
    return '';
  }

  let humanizedElapsedTimeText = '';
  if (userId in voiceCache) {
    const time = new Time(voiceCache[userId]);
    humanizedElapsedTimeText = ` after ${time.getHumanizedElapsedTime()}`;
    delete voiceCache[userId];
  }

  if (state === 'CHANGE') {
    voiceCache[userId] = Date.now();
  }

  return humanizedElapsedTimeText;
};

module.exports = (oldState, newState) => {
  const state = _getStateEnum(oldState.channel, newState.channel);
  if (state === 'CHANGE' && oldState.channel.id === newState.channel.id) return;

  const humanizedElapsedTimeText = _getHumanizedElapsedTimeText(
    state,
    newState.member.user.id
  );

  const embed = new VoiceFactory(
    newState.member.user,
    oldState.channel,
    newState.channel,
    humanizedElapsedTimeText
  ).createAuditLogEmbed(state);

  send(newState.member.guild, embed);
};
