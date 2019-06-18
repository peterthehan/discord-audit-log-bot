const { clientMap } = require('../config');

module.exports = (user, text) => {
  const devices = user.presence.clientStatus
    ? Object.keys(user.presence.clientStatus)
    : [];

  const footerText = devices.length
    ? `${text} | ${devices.map(device => clientMap[device]).join('')}`
    : text;

  return { footer: { icon_url: user.displayAvatarURL(), text: footerText } };
};
