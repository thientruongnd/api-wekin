/**
 Mr : Dang Xuan Truong
 Email: truongdx@runsystem.net
 */
const { check } = require('express-validator');
const { TYPE_COMMENT } = require('../utils/constants');
const {
    validateObjectId,
    paginate,
    validateSelect,
} = require('./GeneralValidator');

const contentValidator = check('content').notEmpty();
const typeValidator = validateSelect('type', TYPE_COMMENT, true);
const isAssistantObjIdValidator = validateObjectId('assistantObjId');
const isCommentObjIdValidator = validateObjectId('commentObjId', true);
const listValidator = paginate;
const createValidator = [
    contentValidator,
    typeValidator,
    isAssistantObjIdValidator,
];
module.exports = {
    createValidator,
    listValidator,
    isCommentObjIdValidator,
};
