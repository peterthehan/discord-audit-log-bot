module.exports = date =>
  date
    ? date
        .toISOString()
        .replace('T', ' @ ')
        .replace(/\.\d+Z$/, '')
    : 'Date not found!';
