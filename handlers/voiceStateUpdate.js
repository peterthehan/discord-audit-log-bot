const VoiceFactory = require('../classes/VoiceFactory');
const isLoggedGuild = require('../util/isLoggedGuild');
const send = require('../util/send');

const getVoiceState = (oldState, newState) => {
  const oldChannel = oldState.channel;
  const newChannel = newState.channel;
  if (oldChannel && newChannel) {
    return oldChannel.id !== newChannel.id ? 'CHANGE' : null;
  }

  return Boolean(newChannel) ? 'JOIN' : 'LEAVE';
};

const getStreamingState = (oldState, newState) => {
  const oldStreaming = oldState.streaming;
  const newStreaming = newState.streaming;
  if (oldStreaming && newStreaming) return 'STOP';
  if (!oldStreaming && !newStreaming) return null;
  if (!oldStreaming && newStreaming) return 'START';

  return Boolean(oldState.channel) ? 'STOP' : null;
};

module.exports = async (oldState, newState) => {
  if (!isLoggedGuild(newState.member.guild)) return;

  [getVoiceState(oldState, newState), getStreamingState(oldState, newState)]
    .filter(Boolean)
    .forEach(state => {
      const builder = new VoiceFactory(
        newState.member.user,
        oldState.channel,
        newState.channel
      ).createAuditLogEmbed(state);

      send(newState.member.guild, builder);
    });
};
