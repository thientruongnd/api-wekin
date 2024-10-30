/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
const { DEFAULT, API } = require('../../controllers/IndexController');

const indexRoute = (apiRouter) => {
    apiRouter.route('/').get(DEFAULT.index);
    apiRouter.route('/tests/joinNow').post(DEFAULT.joinNow);
    apiRouter.route('/tests/sendMessageLocation').post(DEFAULT.sendMessageLocation);
    apiRouter.route('/tests/eventCarbonReceipt').get(DEFAULT.eventCarbonReceipt);
    apiRouter.route('/tests/eventLocations').get(DEFAULT.eventLocations);
    apiRouter.route('/tests/transportationList').get(DEFAULT.transportationList);
    apiRouter.route('/tests/eventCarbonReceiptPartner').post(DEFAULT.eventCarbonReceiptPartner);
    apiRouter.route('/tests/senTemplateFlow').post(DEFAULT.senTemplateFlow);
    apiRouter.route('/tests/paymentSuccess').post(DEFAULT.paymentSuccess);
    apiRouter.route('/tests/paymentFailure').post(DEFAULT.paymentFailure);
    apiRouter.route('/tests/selectRegion').post(DEFAULT.selectRegion);
    apiRouter.route('/tests/selectCountry').post(DEFAULT.selectCountry);
    apiRouter.route('/tests/completed').post(DEFAULT.completed);
    apiRouter.route('/tests/ecoTravel').get(DEFAULT.ecoTravel);
    apiRouter.route('/tests/checkCountry').post(DEFAULT.checkCountry);
    apiRouter.route('/tests/eventOffset').post(DEFAULT.eventOffset);
    apiRouter.route('/tests/textToImage').post(DEFAULT.textToImage);
    apiRouter.route('/tests/selectDistance').post(DEFAULT.selectDistance);
};

module.exports = {
    indexRoute,
};
