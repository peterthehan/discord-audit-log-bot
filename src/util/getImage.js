module.exports = message => {
  if (!message.attachments.size) return;

  const url = message.attachments.first().proxyURL;
  if (!url.endsWith('.png') && !url.endsWith('.jpg') && !url.endsWith('.gif'))
    return;

  return { image: { url } };
};
