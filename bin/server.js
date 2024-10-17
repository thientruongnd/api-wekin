/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
const http = require('http');
const app = require('../src/app');


const { onError } = require('../src/utils/shared');

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

server.listen(process.env.PORT,()=>{
    console.log("api webkin is listening on port : "+ process.env.PORT);
});

server.on('error', onError);
