module.exports = message =>
  message.attachments
    .filter(({ proxyURL }) => /\.(gif|jpe?g|png|webp)$/i.test(proxyURL))
    .map(({ proxyURL }) => proxyURL);
