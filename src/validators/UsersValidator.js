/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
const { check } = require('express-validator');
const {
    notSpaceAllow,
    isMobilePhone,
    checkPassword,
} = require('../utils/shared');
const {
    passwordValidator, validateObjectId, paginate,
} = require('./GeneralValidator');
const { YES_NO } = require('../utils/constants');

const emailValidator = check('email').notEmpty().isEmail().withMessage('email invalid');
const mobileValidator = check('mobile').notEmpty().custom((value) => isMobilePhone(value))
    .withMessage('mobile invalid');
const verifyEmailTokenValidator = check('verifyEmailToken').notEmpty().withMessage('verifyEmailToken is required');
const infoValidator = [
    check('info').notEmpty().isObject().withMessage('info must is Object'),
    check('info.firstName').trim().notEmpty().isLength({ max: 16 })
        .withMessage('Tên chỉ được phép tối đa 16 ký tự'),
    check('info.lastName').trim().notEmpty().isLength({ max: 32 })
        .withMessage('Họ và tên đệm chỉ được phép tối đa 32 ký tự'),
];

const newPasswordValidator = check('newPassword').notEmpty().custom((value) => checkPassword(value))
    .withMessage('New password must be at least 8 characters including numbers and special characters. Please try again!');
const confirmPasswordValidator = check('confirmPassword').notEmpty().custom((value) => checkPassword(value))
    .withMessage('Confirm password must be at least 8 characters including numbers and special characters. Please try again!');

const isUserObjIdValidator = validateObjectId('userObjId', true);
const languageValidator = check('language').notEmpty().withMessage('language invalid');
const isDefaultBrandVoiceValidator = check('isDefaultBrandVoice').notEmpty().isIn(YES_NO)
    .withMessage(`isDefaultBrandVoice value is string must in ${YES_NO.join('|')}`);

const register = [
    ...infoValidator,
    mobileValidator,
    passwordValidator,
    emailValidator,
];
const createValidator = [
    emailValidator,
    mobileValidator,
    ...infoValidator,
    passwordValidator,
];
const updateValidator = [
    emailValidator,
    ...infoValidator,
];

const changePassword = [
    passwordValidator,
    newPasswordValidator,
    confirmPasswordValidator,
];
const updateLanguageValidator = [
    languageValidator,
];
const updateIsDefaultBrandVoiceValidator = [
    isDefaultBrandVoiceValidator,
];
const createApiValidator = [
    emailValidator,
    mobileValidator,
    ...infoValidator,
    passwordValidator,
];
const listValidator = paginate;
const changePasswordApi = [
    isUserObjIdValidator,
    newPasswordValidator,
    confirmPasswordValidator,
];
module.exports = {
    createValidator,
    register,
    mobileValidator,
    updateValidator,
    changePassword,
    verifyEmailTokenValidator,
    isUserObjIdValidator,
    updateLanguageValidator,
    updateIsDefaultBrandVoiceValidator,
    createApiValidator,
    listValidator,
    changePasswordApi,
};
