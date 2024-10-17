/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
const util = require('util');
const helmet = require('helmet');
const events = require('events');
const cors = require('cors');

const express = require('express');
const path = require('path');

const { configEvn } = require('./configs/configEnvSchema');

const app = express();
// app.use(helmet.contentSecurityPolicy());
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            'img-src': ["'self'", configEvn.API_URL],
            // 'img-src': ["'self'", configEvn.API_URL, configEvn.ADMIN_URL],
        },
    }),
);
const origin = configEvn.ORIGIN.split(',');
const corsOptions = {
    origin,
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
// app.use(helmet());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
require('./configs/configInit')(app);
require('./configs/configRoutes')(app);
require('./configs/configError')(app);

events.EventEmitter.defaultMaxListeners = 100000;
module.exports = app;
