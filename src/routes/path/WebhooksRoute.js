/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
const { API } = require('../../controllers/WebhooksController');

const webhookRoute = (apiRouter) => {
    apiRouter.route('/webhook').post(API.postWebhook);
    apiRouter.route('/webhook').get(API.getWebhook);
};

module.exports = {
    webhookRoute,
};
