const imageRegExp = /^.*\.(png|jpe?g|gif|webp)$/i;

module.exports = message => {
  if (!message.attachments.size) return [''];

  const images = message.attachments
    .filter(attachment => imageRegExp.test(attachment.proxyURL))
    .map(attachment => attachment.proxyURL);

  if (!images.length) images.push('');

  return images;
};
