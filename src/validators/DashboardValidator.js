/**
 Mr : Dang Xuan Truong
 Email: truongdx@runsystem.net
 @name dashboard validate
 */

const { paginate, validateObjectId } = require('./GeneralValidator');

const isPromptCategoryObjIdValidator = validateObjectId('promptCategoryObjId', true);

const listPromptValidator = [
    ...paginate,
    isPromptCategoryObjIdValidator,
];

module.exports = { listPromptValidator };
