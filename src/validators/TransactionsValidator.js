/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
const { check } = require('express-validator');
const {
    validateObjectId,
} = require('./GeneralValidator');

const { LIST_BANK, PAYMENT_TYPE } = require('../utils/constants');

const isOrderObjId = validateObjectId('orderObjId', true);
const isBankCode = check('bankCode').optional().isIn(LIST_BANK).withMessage('bankCode does not exist');

const paymentTypeValidator = check('paymentType').notEmpty().isIn(PAYMENT_TYPE)
    .withMessage(`paymentType value is must in ${PAYMENT_TYPE.join('|')}`);
const createValidator = [
    isOrderObjId,
    isBankCode,
    paymentTypeValidator,
];

module.exports = {
    createValidator,
};
