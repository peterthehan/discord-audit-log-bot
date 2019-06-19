const handler = event => require(`../handlers/${event}`);

module.exports = client => {
  client.once('ready', () => handler('ready')(client));
  client.on('guildMemberAdd', handler('guildMemberAdd'));
  client.on('guildMemberRemove', handler('guildMemberRemove'));
  client.on('messageDelete', handler('messageDelete'));
  client.on('messageUpdate', handler('messageUpdate'));
  client.on('presenceUpdate', handler('presenceUpdate'));
  client.on('userUpdate', handler('userUpdate'));
  client.on('voiceStateUpdate', handler('voiceStateUpdate'));
  process.on('unhandledRejection', console.warn);
};
