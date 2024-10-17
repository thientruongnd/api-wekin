/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
const defaultRouter = require('../routes/default');
const apiRoute = require('../routes/api/index');

module.exports = (app) => {
    app.use('/', defaultRouter);
    app.use('/api', apiRoute);
};
