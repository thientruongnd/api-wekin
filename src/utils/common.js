/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
const util = require('util');
const jwt = require('jsonwebtoken');

const { TIME_ZONE_DEFAULT, USER_TYPE } = require('./constants');
const {
    isEmpty, resJsonError, responseError,
} = require('./shared');


module.exports = {
    /**
     * The function is a middleware function that is used to verify the authenticity of a JSON Web Token (JWT) provided in the request.
     *
     * @name verifyToken
     * @async
     * @param {Express.Request} req - The request object from the client.
     * @param {Express.Response} res - The response object to be sent to the client.
     * @param {Express.Response} next - The request pass from the client.
     * @returns {Promise<Express.Response>} The response object data if verify done.
     * @throws {Error} Will throw an error if upon failure.
     */
    verifyToken: async (req, res, next) => {
        try {
            const token = req.headers['x-access-token'] || req.body.token || req.query.token;
            if (!token) {
                return res.json(responseError(40006));
            }
            return next();
        } catch (errors) {
            if (errors.name === 'JsonWebTokenError') {
                return res.json(responseError(40228));
            }
            return resJsonError(res, errors, 'error_access');
        }
    },

};
