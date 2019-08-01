const Time = require('../classes/Time');
const VoiceFactory = require('../classes/VoiceFactory');
const isLoggedGuild = require('../util/isLoggedGuild');
const send = require('../util/send');

const voiceCache = {};

const _getVoiceState = (oldChannel, newChannel) =>
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
  if (!isLoggedGuild(newState.member.guild)) return;

  const state = _getVoiceState(oldState.channel, newState.channel);
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
  if (!embed) return;

  send(newState.member.guild, embed);
};
