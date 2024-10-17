/**
 Mr : Dang Xuan Truong
 Email: truongdx@runsystem.net
 */
const { check, body } = require('express-validator');
const {
    validateCodeActivator,
    validateText,
    validateCode,
    paginate,
    validateObjectId,
} = require('./GeneralValidator');
const {
    isMobilePhone,
} = require('../utils/shared');

const fullNameValidator = validateText('fullName', true).notEmpty();
const planCodeValidator = validateCode('planCode', true).notEmpty();
const emailValidator = check('email').notEmpty().isEmail().withMessage('email invalid');
const phoneValidator = check('phone').notEmpty().custom((value) => isMobilePhone(value))
    .withMessage('phone invalid');
const quantityValidator = check('quantity').notEmpty().isFloat({ min: 0 })
    .withMessage('quantity must be integer and greater than 0');

const isResellerObjIdValidator = validateObjectId('resellerObjId', true);
const generateValidator = [
    fullNameValidator,
    planCodeValidator,
    emailValidator,
    phoneValidator,
    quantityValidator,
    isResellerObjIdValidator,
];
const listActivationKeyValidator = [
    ...paginate,
];
const codeValidator = validateCodeActivator('code').notEmpty();
module.exports = {
    codeValidator,
    generateValidator,
    listActivationKeyValidator,
};
