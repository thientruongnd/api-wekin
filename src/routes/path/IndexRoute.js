/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
const { DEFAULT, API } = require('../../controllers/IndexController');

const indexRoute = (apiRouter) => {
    apiRouter.route('/').get(DEFAULT.index);
};

const apiIndexRoute = (apiRouter) => {
    apiRouter.route('/signOut').put(API.auth);
};

module.exports = {
    indexRoute,
    apiIndexRoute,
};
