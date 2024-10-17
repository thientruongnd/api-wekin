/**
 @author Mr : Dang Xuan Truong
 Email: truongdx@runsystem.net
 @name thread validate
 */

const { check } = require('express-validator');
const { validateObjectId, paginate } = require('./GeneralValidator');
const { MODEL_TYPE } = require('../utils/constants');

const MODEL_TYPE_ENUM = Object.values(MODEL_TYPE);

const isModelObjIdValidator = validateObjectId('modelObjId', true);
const modelTypeValidator = check('modelType').notEmpty().isIn(MODEL_TYPE_ENUM)
    .withMessage(`modelType value is string must in ${MODEL_TYPE_ENUM.join('|')}`);

const createValidator = [
    isModelObjIdValidator,
    modelTypeValidator,
];
const listValidator = paginate;

module.exports = {
    createValidator,
    isModelObjIdValidator,
    listValidator,
    modelTypeValidator,
};
