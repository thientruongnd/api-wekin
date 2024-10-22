/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
const express = require('express');

const defaultRouter = express.Router();
const {
    indexRoute,
} = require('../path/IndexRoute');
const {
    webhookRoute,
} = require('../path/WebhooksRoute');
const {
    stripesRoute,
} = require('../path/StripesRoute');

indexRoute(defaultRouter);
webhookRoute(defaultRouter);
stripesRoute(defaultRouter);
module.exports = defaultRouter;
