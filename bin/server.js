/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
const http = require('http');
const app = require('../src/app');

const { configEvn } = require('../src/configs/configEnvSchema');

const { normalizePort, onError } = require('../src/utils/shared');

/**
 * Create HTTP server.
 */
const server = http.createServer(app);
const port = normalizePort(configEvn.PORT || 3500);
server.listen(port, () => {
    console.log(`App is listening at ${port}`);
});
server.on('error', onError);
