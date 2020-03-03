const VoiceFactory = require('../classes/VoiceFactory');
const isLoggedGuild = require('../util/isLoggedGuild');
const send = require('../util/send');

const getVoiceState = (oldChannel, newChannel) =>
  oldChannel && newChannel ? 'CHANGE' : Boolean(newChannel) ? 'JOIN' : 'LEAVE';

module.exports = async (oldState, newState) => {
  if (!isLoggedGuild(newState.member.guild)) return;

  const state = getVoiceState(oldState.channel, newState.channel);
  if (state === 'CHANGE' && oldState.channel.id === newState.channel.id) return;

  const builder = new VoiceFactory(
    newState.member.user,
    oldState.channel,
    newState.channel
  ).createAuditLogEmbed(state);

  send(newState.member.guild, builder);
};
