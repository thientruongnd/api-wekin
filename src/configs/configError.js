/**
 * Mr : Dang Xuan Truong
 * Email: truongdx@runsystem.net
 * Error
 */
const createError = require('http-errors');
const { responseError } = require('../utils/shared');

module.exports = (app) => {
// catch 404 and forward to error handler
    app.use((req, res, next) => {
        next(createError(404));
    });
    // error handler
    app.use((err, req, res, next) => {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        if (err.status === 404) {
            return res.json(responseError(40002));
        }
        return res.json({ status: err.status || 500, message: res.locals });
        // res.render('error');
    });
};
