module.exports = message => {
  if (!message.attachments.size) return;

  const imageRegExp = /^.*\.(png|jpe?g|gif|webp)$/i;
  const url = message.attachments.first().proxyURL;
  if (!imageRegExp.test(url)) return;

  return { image: { url } };
};
