/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
const { DEFAULT } = require('../../controllers/IndexController');

const indexRoute = (apiRouter) => {
    apiRouter.route('/').get(DEFAULT.index);
    apiRouter.route('/tests/joinNow').post(DEFAULT.joinNow);
    apiRouter.route('/tests/sendMessageLocation').post(DEFAULT.sendMessageLocation);
    apiRouter.route('/tests/listEvent').get(DEFAULT.listEvent);
    apiRouter.route('/tests/eventLocations').get(DEFAULT.eventLocations);
    apiRouter.route('/tests/transportationList').get(DEFAULT.transportationList);
    apiRouter.route('/tests/eventCarbonReceiptPartner').post(DEFAULT.eventCarbonReceiptPartner);
    apiRouter.route('/tests/paymentSuccess').post(DEFAULT.paymentSuccess);
    apiRouter.route('/tests/paymentFailure').post(DEFAULT.paymentFailure);
    apiRouter.route('/tests/completed').post(DEFAULT.completed);
    apiRouter.route('/tests/ecoTravel').post(DEFAULT.ecoTravel);
    apiRouter.route('/tests/checkCountry').post(DEFAULT.checkCountry);
    apiRouter.route('/tests/eventOffset').post(DEFAULT.eventOffset);
    apiRouter.route('/tests/textToImage').post(DEFAULT.textToImage);
    apiRouter.route('/tests/selectDistance').post(DEFAULT.selectDistance);
    apiRouter.route('/tests/fillAddress').post(DEFAULT.fillAddress);
    apiRouter.route('/tests/getCountryDataByPhone').post(DEFAULT.getCountryDataByPhone);
};

module.exports = {
    indexRoute,
};
