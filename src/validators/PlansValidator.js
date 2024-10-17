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

const isPlanObjIdValidator = validateObjectId('planObjId', true);
const nameValidator = validateText('name', true).notEmpty();
const codeValidator = validateCode('code', true).notEmpty();
const listValidator = paginate;
const createValidator = [
    nameValidator,
    codeValidator,
];

module.exports = {
    createValidator,
    isPlanObjIdValidator,
    listValidator,
};
