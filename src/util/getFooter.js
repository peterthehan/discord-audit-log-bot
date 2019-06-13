module.exports = (user, text) => ({
  footer: { icon_url: user.displayAvatarURL(), text }
});
