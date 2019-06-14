module.exports = (user, text) => {
  const devices = user.presence.clientStatus
    ? Object.keys(user.presence.clientStatus)
    : [];

  let footerText;
  if (devices.length) {
    const deviceMap = { web: '🌐', mobile: '📱', desktop: '💻' };
    footerText = `${text} | ${devices
      .map(device => deviceMap[device])
      .join('')}`;
  } else {
    footerText = text;
  }

  return { footer: { icon_url: user.displayAvatarURL(), text: footerText } };
};
