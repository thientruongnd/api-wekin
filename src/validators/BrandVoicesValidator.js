/**
 * Created by Truongbx on 21/02/24.
 * truongbx@runsystem.net - Bui Xuan Truong
 */

const { check } = require('express-validator');
const { validateObjectId, paginate } = require('./GeneralValidator');
const { YES_NO } = require('../utils/constants');

const nameValidator = check('name').notEmpty();
const contentValidator = check('content').notEmpty();
const descriptionValidator = check('description');
const isDefaultValidator = check('isDefault').notEmpty().isIn(YES_NO)
    .withMessage(`isDefault value is string must in ${YES_NO.join('|')}`);
const isBrandVoiceObjIdValidator = validateObjectId('brandVoiceObjId', true);
const listValidator = paginate;
const createValidator = [
    nameValidator,
    descriptionValidator,
    contentValidator,
    isDefaultValidator,
];
const updateValidator = [
    isBrandVoiceObjIdValidator,
    ...createValidator,
];
module.exports = {
    createValidator,
    listValidator,
    isBrandVoiceObjIdValidator,
    updateValidator,
    descriptionValidator,
};
