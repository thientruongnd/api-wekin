/**
 @author Mr : Dang Xuan Truong
 Email: truongdx@runsystem.net
 @name plan licenses validate
 */
const { check } = require('express-validator');

const {
    validateObjectId,
    paginate,
} = require('./GeneralValidator');
const {
    isValidDate,
} = require('../utils/shared');

const startDateValidator = check('startDate').notEmpty().custom((value) => isValidDate(value, 'YYYY-MM-DD')).withMessage('startDate có định dạng YYYY-MM-DD');
const endDateValidator = check('endDate').optional().custom((value) => isValidDate(value, 'YYYY-MM-DD')).withMessage('startDate có định dạng YYYY-MM-DD');
const isUserObjIdValidator = validateObjectId('userObjId', true);
const isPlanObjIdValidator = validateObjectId('planObjId', true);
const createValidator = [
    isUserObjIdValidator,
    isPlanObjIdValidator,
    startDateValidator,
    endDateValidator,
];
const listValidator = paginate;
module.exports = {
    createValidator,
    listValidator,
};
