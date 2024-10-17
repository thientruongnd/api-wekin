/**
 * Created by Truongbx on 01/02/24.
 * truongbx@runsystem.net - Bui Xuan Truong
 */
const { check } = require('express-validator');
const { validateObjectId, paginate } = require('./GeneralValidator');

const isThreadObjIdValidator = validateObjectId('threadObjId');
const isMessageObjIdValidator = validateObjectId('messageObjId');
const contentValidator = check('content').optional();
const tagsValidator = check('tags').optional().isArray();
const isDocObjIdValidator = validateObjectId('docObjId', true);
const isStepObjIdValidator = validateObjectId('stepObjId', false);
const listValidator = paginate;
const createValidator = [
    contentValidator,
    tagsValidator,
    isThreadObjIdValidator,
    isMessageObjIdValidator,
    isStepObjIdValidator,
];
const updateValidator = [
    isDocObjIdValidator,
    ...createValidator,
];
module.exports = {
    createValidator,
    listValidator,
    isDocObjIdValidator,
    updateValidator,
};
