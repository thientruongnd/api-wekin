/**
 * Created by Truongbx on 01/02/24.
 * truongbx@runsystem.net - Bui Xuan Truong
 */
const { check } = require('express-validator');
const { validateObjectId, paginate } = require('./GeneralValidator');

const isThreadObjIdValidator = validateObjectId('threadObjId', true);
const isMessageObjIdValidator = validateObjectId('messageObjId', true);
const contentValidator = check('content').notEmpty();
const isFavoriteHistoriesObjIdValidator = validateObjectId('favoriteHistoryObjId', true);
const listValidator = paginate;
const createValidator = [
    contentValidator,
    isThreadObjIdValidator,
    isMessageObjIdValidator,
];
const updateValidator = [
    isFavoriteHistoriesObjIdValidator,
    ...createValidator,
];
module.exports = {
    createValidator,
    listValidator,
    isFavoriteHistoriesObjIdValidator,
    updateValidator,
};
