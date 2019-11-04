const { events } = require('../config');

const handler = event => require(`../handlers/${event}`);

module.exports = client => {
  client.once('ready', () => handler('ready')(client));
  process.on('unhandledRejection', console.warn);
  events.forEach(event => client.on(event, handler(event)));
};
