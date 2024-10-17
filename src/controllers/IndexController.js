/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
const util = require('util');
const axios = require('axios');
const WhatsappHelper = require('../helpers/WhatsappHelper');
const {
    responseError,
    responseSuccess,
    isEmpty,
    resJsonError,
} = require('../utils/shared');

module.exports.DEFAULT = {
    index: async (req, res) => {
        res.status(200).send('Hello this is webhook setup by GMO');
    },
    sendMessage: async (req, res) => {
        console.log(util.inspect(req.body, false, null, true));
        const resData= await WhatsappHelper.sendMessage(req.body);
        return res.json(responseSuccess(10261, resData, 'en'));
    },

};
module.exports.API = {

    /**
     * signOut
     * @param {any} req request
     * @param {any} res response
     * @param {any} next next
     */
    auth: async (req, res) => {
        try {
            return res.json(responseError(40230, [], ''));
        } catch (errors) {
            return resJsonError(res, errors, 'login');
        }
    },
};
