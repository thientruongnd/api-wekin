/**
 * Created by Truongbx on 01/02/24.
 * truongbx@runsystem.net - Bui Xuan Truong
 */
const { validateObjectId, paginate } = require('./GeneralValidator');

const isThreadObjIdValidator = validateObjectId('threadObjId');
const isMessageObjIdValidator = validateObjectId('messageObjId');
const isDocObjIdValidator = validateObjectId('docObjId');
const isShareObjIdValidator = validateObjectId('shareObjId', true);
const listValidator = paginate;
const createValidator = [
    isThreadObjIdValidator,
    isMessageObjIdValidator,
    isDocObjIdValidator,
];
const updateValidator = [
    isShareObjIdValidator,
    ...createValidator,
];
module.exports = {
    createValidator,
    listValidator,
    isShareObjIdValidator,
    updateValidator,
};
