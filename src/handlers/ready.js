const { blurpleColor, guildChannelMap } = require('../config');
const sendLog = require('../util/sendLog');

module.exports = client => {
  console.log(`${client.user.tag}: Ready`);

  for (const guildId of Object.keys(guildChannelMap)) {
    const guild = client.guilds.resolve(guildId);
    if (!guild) continue;

    sendLog(guild, blurpleColor, {
      footer: { text: 'Made with ❤ by peterthehan' }
    });
  }
};
