const { clientMap } = require('../config');

module.exports = (user, footerText) => {
  const devices = user.presence.clientStatus
    ? Object.keys(user.presence.clientStatus)
    : [];

  const text = devices.length
    ? `${footerText} | ${devices.map(device => clientMap[device]).join('')}`
    : footerText;

  return { footer: { icon_url: user.displayAvatarURL(), text } };
};
