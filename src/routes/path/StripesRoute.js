/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
const { DEFAULT } = require('../../controllers/StripesController');

const stripesRoute = (apiRouter) => {
    apiRouter.route('/stripes/createCheckoutSession').get(DEFAULT.createCheckoutSession);
    apiRouter.route('/stripes/webhook').post(DEFAULT.webhook);
    apiRouter.route('/stripes/info').get(DEFAULT.info);
    apiRouter.route('/stripes/infoPaymentIntent').get(DEFAULT.infoPaymentIntent);
};

module.exports = {
    stripesRoute,
};
