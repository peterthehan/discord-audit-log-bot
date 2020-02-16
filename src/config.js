module.exports = {
  token: ('TOKEN' in process.env ? process.env : require('../config')).TOKEN,
  events: [
    'guildMemberAdd',
    'guildMemberRemove',
    'messageDelete',
    'messageUpdate',
    'userUpdate',
    'voiceStateUpdate'
  ],
  clientMap: { web: '🌐', mobile: '📱', desktop: '💻' },
  colors: {
    base: 0x7289da,
    positive: 0x3498db,
    neutral: 0xe67e22,
    negative: 0xe91e63
  },
  deleteTimeThreshold: 1,
  editTimeThreshold: 0,
  guildChannelMap: {
    '258167954913361930': {
      logChannelId: '560648403709591552',
      ignoreChannelIds: ['649020657522180128']
    }
  }
};
