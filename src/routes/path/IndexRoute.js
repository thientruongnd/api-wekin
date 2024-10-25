/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
const { DEFAULT, API } = require('../../controllers/IndexController');

const indexRoute = (apiRouter) => {
    apiRouter.route('/').get(DEFAULT.index);
    apiRouter.route('/tests/sendMessage').post(DEFAULT.sendMessage);
    apiRouter.route('/tests/sendMessageLocation').post(DEFAULT.sendMessageLocation);
    apiRouter.route('/tests/eventCarbonReceipt').get(DEFAULT.eventCarbonReceipt);
    apiRouter.route('/tests/eventLocations').get(DEFAULT.eventLocations);
    apiRouter.route('/tests/transportationList').get(DEFAULT.transportationList);
    apiRouter.route('/tests/eventCarbonReceiptPartner').post(DEFAULT.eventCarbonReceiptPartner);
    apiRouter.route('/tests/senTemplateFlow').post(DEFAULT.senTemplateFlow);
    apiRouter.route('/tests/paymentSuccess').post(DEFAULT.paymentSuccess);
    apiRouter.route('/tests/selectCountry').post(DEFAULT.selectCountry);
};

module.exports = {
    indexRoute,
};
