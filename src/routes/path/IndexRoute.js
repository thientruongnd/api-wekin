/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
const { DEFAULT, API } = require('../../controllers/IndexController');

const indexRoute = (apiRouter) => {
    apiRouter.route('/').get(DEFAULT.index);
    apiRouter.route('/tests/sendMessage').post(DEFAULT.sendMessage);
};

module.exports = {
    indexRoute,
};
