/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
const http = require('http');
const app = require('../src/app');
require('dotenv').config();

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

server.listen(process.env.PORT,()=>{
    console.log("webhook is listening");
});

server.on('error', onError);
