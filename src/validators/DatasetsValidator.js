/**
 * Created by Truongbx on 21/02/24.
 * truongbx@runsystem.net - Bui Xuan Truong
 */

const { check } = require('express-validator');
const { validateObjectId, paginate } = require('./GeneralValidator');

const nameValidator = check('name').notEmpty();
const contentValidator = check('content').notEmpty();
const isDatasetObjIdValidator = validateObjectId('datasetObjId', true);
const listValidator = paginate;
const createValidator = [
    nameValidator,
    contentValidator,
];
const updateValidator = [
    isDatasetObjIdValidator,
    ...createValidator,
];
module.exports = {
    createValidator,
    listValidator,
    isDatasetObjIdValidator,
    updateValidator,
};
