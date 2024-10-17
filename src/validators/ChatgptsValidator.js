/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
const { check } = require('express-validator');

const {
    validateObjectId,
    validateText,
    validateCode,
    paginate,
} = require('./GeneralValidator');

const isChatgptObjIdValidator = validateObjectId('chatgptObjId', true);
const modelNameValidator = validateText('name', true).notEmpty();
const modelCodeValidator = validateCode('code', true).notEmpty();
const listValidator = paginate;
const createValidator = [
    modelNameValidator,
    modelCodeValidator,
];

module.exports = {
    createValidator,
    isChatgptObjIdValidator,
    listValidator,
};
