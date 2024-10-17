/**
 * Created by Truongbx on 01/02/24.
 * truongbx@runsystem.net - Bui Xuan Truong
 */
const { check } = require('express-validator');
const { validateObjectId, paginate, validateSelect } = require('./GeneralValidator');
const { PAYMENT_TYPE, TYPE_OPTION } = require('../utils/constants');

const orderDetailsValidator = [
    check('orderDetails').notEmpty().isArray().withMessage('orderDetails must be Array'),
    validateObjectId('orderDetails.*.chatgptPacketObjId'),
    validateObjectId('orderDetails.*.chatgptObjId'),
    validateObjectId('orderDetails.*.featurePriceObjId'),
    validateObjectId('orderDetails.*.featureObjId'),
    validateObjectId('orderDetails.*.planObjId'),
    check('orderDetails.*.codeOption').notEmpty(),
    check('orderDetails.*.nameOption').notEmpty(),
    check('orderDetails.*.credits'),
    check('orderDetails.*.maxDayCredits'),
    check('orderDetails.*.maxMonthCredits'),
    check('orderDetails.*.quantity').notEmpty().isFloat({ min: 0 }).withMessage('orderDetails.*.quantity must is number and greater than 0'),
    check('orderDetails.*.amount').notEmpty(),
    check('orderDetails.*.totalDiscount').notEmpty(),
    check('orderDetails.*.total').notEmpty(),
    check('orderDetails.*.value'),
    check('orderDetails.*.monthValue'),
    check('orderDetails.*.dayValue'),
];
const paymentTypeValidator = validateSelect('paymentType', PAYMENT_TYPE, true);
const typeOptionValidator = validateSelect('typeOption', TYPE_OPTION, true);
const totalValidator = check('total').notEmpty();
const isOrderObjIdValidator = validateObjectId('orderObjId', true);
const listValidator = paginate;
const createValidator = [
    paymentTypeValidator,
    typeOptionValidator,
    totalValidator,
    ...orderDetailsValidator,
];

module.exports = {
    createValidator,
    listValidator,
    isOrderObjIdValidator,
};
