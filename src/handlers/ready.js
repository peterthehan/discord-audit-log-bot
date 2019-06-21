const { blurpleColor, guildChannelMap } = require('../config');
const sendLog = require('../util/sendLog');

module.exports = client => {
  console.log(`${client.user.tag}: Ready`);

  for (const guildId of Object.keys(guildChannelMap)) {
    sendLog(client.guilds.resolve(guildId), blurpleColor, {
      footer: { text: 'Made with ❤ by peterthehan' }
    });
  }
};
