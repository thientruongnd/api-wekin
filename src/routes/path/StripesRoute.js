/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
const { DEFAULT } = require('../../controllers/StripesController');

const stripesRoute = (apiRouter) => {
    apiRouter.route('/stripes/createCheckoutSession').get(DEFAULT.createCheckoutSession);
};

module.exports = {
    stripesRoute,
};
