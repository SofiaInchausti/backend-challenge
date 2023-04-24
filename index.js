require('./database');
const server = require('./app');

const port = 3000;

// Syncing all the models at once.

server.listen(port, () => {
  console.log(`Running server: port ${port}:`); // eslint-disable-line no-console
});

module.exports = server.listen(3000);
