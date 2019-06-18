module.exports = {
  token: ('TOKEN' in process.env ? process.env : require('../config')).TOKEN,
  positiveColor: 3447003,
  neutralColor: 15105570,
  negativeColor: 15277667,
  streamingColor: 6570404,
  listeningColor: 1947988,
  clientMap: { web: '🌐', mobile: '📱', desktop: '💻' },
  deleteTimeThreshold: 1,
  guildChannelMap: {
    '258167954913361930': '560648403709591552'
  }
};
