module.exports = message => {
  if (!message.attachments.size) return [{}];

  const imageRegExp = /^.*\.(png|jpe?g|gif|webp)$/i;
  const images = message.attachments
    .filter(attachment => imageRegExp.test(attachment.proxyURL))
    .map(attachment => ({ image: { url: attachment.proxyURL } }));

  if (!images.length) images.push({});

  return images;
};
