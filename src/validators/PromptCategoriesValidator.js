/**
 Mr : Dang Xuan Truong
 Email: truongdx@runsystem.net
 @name Prompt category validate
 */

const {
    validateObjectId,
    validateText,
    paginate,
    validateId,
} = require('./GeneralValidator');

const isPromptCategoryObjIdValidator = validateObjectId('promptCategoryObjId', false);
const isPromptCategoryIdValidator = validateId('promptCategoryId', false);

const isParentObjIdValidator = validateObjectId('parentObjId', false);
const nameValidator = validateText('name', true).notEmpty();
const createValidator = [
    nameValidator,
];
const listValidator = [
    ...paginate,
];

module.exports = {
    listValidator,
    createValidator,
    isParentObjIdValidator,
    isPromptCategoryObjIdValidator,
    isPromptCategoryIdValidator,
};
