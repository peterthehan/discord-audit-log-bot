module.exports = {
  token: ('TOKEN' in process.env ? process.env : require('../config')).TOKEN,
  events: [
    'guildMemberAdd',
    'guildMemberRemove',
    'messageDelete',
    'messageUpdate',
    'presenceUpdate',
    'userUpdate',
    'voiceStateUpdate'
  ],
  clientMap: { web: '🌐', mobile: '📱', desktop: '💻' },
  colors: {
    blurpleColor: 0x7289da,
    positiveColor: 0x3498db,
    neutralColor: 0xe67e22,
    negativeColor: 0xe91e63,
    streamingColor: 0x9146ff,
    listeningColor: 0x1db954
  },
  deleteTimeThreshold: 1,
  editTimeThreshold: 0,
  guildChannelMap: {
    '258167954913361930': '560648403709591552'
  }
};
