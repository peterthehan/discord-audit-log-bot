module.exports = message => {
  const images = message.attachments
    .filter(({ proxyURL }) => /\.(gif|jpe?g|png|webp)$/i.test(proxyURL))
    .map(({ proxyURL }) => proxyURL);

  return images.length ? images : [''];
};
