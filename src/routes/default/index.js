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

indexRoute(defaultRouter);
webhookRoute(defaultRouter);
module.exports = defaultRouter;
