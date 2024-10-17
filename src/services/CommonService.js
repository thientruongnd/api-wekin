/**
 * Mr : Dang Xuan Truong
 * Email: truongdx@runsystem.net
 * Common
 */
const util = require('util');

const {
    promiseReject,
    promiseResolve,
} = require('../utils/shared');

const test = async () => {
    try {
        const result = {};
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
};
module.exports = {
    test,
};
