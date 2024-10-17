/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
const util = require('util');
const events = require('events');
const cors = require('cors');

const express = require('express');

const app = express();
const corsOptions = {
    methods: ['OPTIONS', 'GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: [
        'Origin',
        'Content-Type',
        'Accept',
        'x-access-token',
        'x-auth-token',
        'x-xsrf-token',
        'authorization',
        'Access-Control-Allow-Origin',
        'sentry-trace',
        'baggage',
    ],
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
require('./configs/configInit')(app);
require('./configs/configRoutes')(app);
require('./configs/configError')(app);

events.EventEmitter.defaultMaxListeners = 100000;
module.exports = app;
