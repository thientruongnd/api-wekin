/**
 Mr : Dang Xuan Truong
 Email: truongdx@runsystem.net
 */

const { check } = require('express-validator');
const {
    validateObjectId, validateText, paginate, validateId,
} = require('./GeneralValidator');

const isPromptWorkflowObjIdValidator = validateObjectId('promptWorkflowObjId', true);
const isPromptWorkflowIdValidator = validateId('promptWorkflowId');
const nameValidator = validateText('name', true).notEmpty();

const childrenValidator = [
    check('children').notEmpty().isArray().withMessage('children must is Array'),
    check('values.*.promptObjId')
        .notEmpty()
        .custom((value) => validateObjectId(value, true))
        .withMessage('promptObjId must be ObjectId'),
    check('values.*.step')
        .optional().isInt()
        .withMessage('step must be number'),
];

const listValidator = paginate;

const createValidator = [
    nameValidator,
    childrenValidator,
];

module.exports = {
    listValidator, createValidator, isPromptWorkflowObjIdValidator, isPromptWorkflowIdValidator,
};
