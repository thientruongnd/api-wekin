/**
 @author Mr : Dang Xuan Truong
 Email: truongdx@runsystem.net
 @name thread validate
 */
const { check } = require('express-validator');

const {
    validateObjectId,
    validateText,
    paginate,
} = require('./GeneralValidator');
const { THREAD_MODE } = require('../utils/constants');

const isThreadObjIdValidator = validateObjectId('threadObjId', true);
const nameValidator = check('name').notEmpty();
// const modelValidator = check('model').notEmpty().isIn(THREAD_MODE)
// .withMessage(`model value is string must in ${THREAD_MODE.join('|')}`);
const modelValidator = check('model').notEmpty();
const createValidator = [
    nameValidator,
    modelValidator,
];
const renameValidator = [
    nameValidator,
    isThreadObjIdValidator,
];

module.exports = {
    createValidator,
    isThreadObjIdValidator,
    paginate,
    renameValidator,
};
