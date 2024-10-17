/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

module.exports = (app) => {
    app.use(logger('dev'));
    app.use(bodyParser.json({ limit: '50mb' })); // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
        limit: '50mb',
        extended: true,
    }));
    app.use(cookieParser());
};
