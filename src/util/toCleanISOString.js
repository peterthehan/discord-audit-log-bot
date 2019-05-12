module.exports = date =>
  date
    .toISOString()
    .replace('T', ' ')
    .replace('Z', '');
