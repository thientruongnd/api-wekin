/**
 Mr : Dang Xuan Truong
 Email: truongdx@runsystem.net
 */
const { check, body } = require('express-validator');
const {
    validateCode, paginate,
} = require('./GeneralValidator');

const codeValidator = validateCode('code', true).notEmpty();
const listValidator = paginate;
module.exports = {
    codeValidator,
    listValidator,
};
