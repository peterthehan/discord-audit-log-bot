const { eventsLogged } = require('../config');

const handler = event => require(`../handlers/${event}`);

module.exports = client => {
  client.once('ready', () => handler('ready')(client));
  process.on('unhandledRejection', console.warn);
  eventsLogged.forEach(handlerName =>
    client.on(handlerName, handler(handlerName))
  );
};
