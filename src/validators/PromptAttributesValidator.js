/**
 Mr : Dang Xuan Truong
 Email: truongdx@runsystem.net
 */
const { check } = require('express-validator');

const {
    validateObjectId,
    validateText,
    paginate,
} = require('./GeneralValidator');
const { TYPE } = require('../utils/constants');

const isPromptAttributeObjIdValidator = validateObjectId('promptAttributeObjId', true);
const isPromptObjIdValidator = validateObjectId('promptObjId', true);
const nameValidator = validateText('name', true).notEmpty();
const codeValidator = check('code').notEmpty();
const typeValidator = check('type').notEmpty().isIn(TYPE)
    .withMessage(`type value is string must in ${TYPE.join('|')}`);
const valueValidator = check('value').optional();
const listValidator = paginate;
const createValidator = [
    isPromptObjIdValidator,
    nameValidator,
    codeValidator,
    typeValidator,
    valueValidator,
];

module.exports = {
    createValidator,
    isPromptObjIdValidator,
    isPromptAttributeObjIdValidator,
    listValidator,
};
