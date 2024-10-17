/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
const { check } = require('express-validator');
const {
    isMobilePhone,
} = require('../utils/shared');

const {
    passwordValidator,
    validateObjectId,
    validateCode,

} = require('./GeneralValidator');

const userNameValidator = validateCode('userName', false).notEmpty();
const infoValidator = [
    check('info').notEmpty().isObject().withMessage('info must is Object'),
    check('info.firstName').trim().notEmpty().isLength({ max: 100 })
        .withMessage('Tên chỉ được phép tối đa 16 ký tự'),
    check('info.lastName').trim().notEmpty().isLength({ max: 100 })
        .withMessage('Họ và tên đệm chỉ được phép tối đa 32 ký tự'),
];
const emailValidator = check('email').notEmpty().isEmail().withMessage('email invalid');
const mobileValidator = check('mobile').optional().custom((value) => isMobilePhone(value))
    .withMessage('mobile invalid');
const userObjId = validateObjectId('userObjId', true);
const referralCodeValidator = validateCode('referralCode', true);
const isVerifyToken = check('verifyToken').notEmpty();
const verifyCode = check('verifyCode').notEmpty();
const signInValidator = [
    passwordValidator,
];

const registerValidator = [
    ...infoValidator,
    emailValidator,
    mobileValidator,
    userNameValidator,
    passwordValidator,

];
const forgotPassword = [
    emailValidator,
];
const resetPasswordValidator = [
    isVerifyToken,
    passwordValidator,
];
const verifyCodeValidator = [
    isVerifyToken,
    verifyCode,
];
const reSendOtpValidator = [
    isVerifyToken,
];
const approveAffiliateValidator = [
    userObjId,
    referralCodeValidator,
];

module.exports = {
    registerValidator,
    signInValidator,
    emailValidator,
    forgotPassword,
    resetPasswordValidator,
    referralCodeValidator,
    verifyCodeValidator,
    reSendOtpValidator,
    approveAffiliateValidator,
};
