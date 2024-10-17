/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/

const express = require('express');

const apiRouter = express.Router();

const {
    webhookRoute,
} = require('../path/WebhooksRoute');

webhookRoute(apiRouter);

module.exports = apiRouter;
