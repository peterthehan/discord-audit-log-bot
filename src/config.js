const config = (() => {
  const { TOKEN } =
    process.env.NODE_ENV === 'production' ? process.env : require('../config');

  return { TOKEN };
})();

module.exports = {
  token: config.TOKEN,
  editColor: 15105570,
  deleteColor: 15277667,
  guildChannelMap: {
    '258167954913361930': '560648403709591552'
  }
};
