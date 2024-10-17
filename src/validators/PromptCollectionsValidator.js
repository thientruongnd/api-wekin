/**
 Mr : Dang Xuan Truong
 Email: truongdx@runsystem.net
 @name Prompt Collection validate
 */

const { check } = require('express-validator');
const { validateObjectId, validateId, paginate } = require('./GeneralValidator');

const listValidator = [...paginate];
const isPromptCollectionObjIdValidator = validateObjectId('id', true);
const isPromptCollectionIdValidator = validateId('promptCollectionId');
module.exports = {
    listValidator,
    isPromptCollectionObjIdValidator,
    isPromptCollectionIdValidator,
};
