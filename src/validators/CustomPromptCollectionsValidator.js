/**
 * Created by Truongbx on 01/02/24.
 * truongbx@runsystem.net - Bui Xuan Truong
 */
const { validateObjectId, paginate, validateObjectIds } = require('./GeneralValidator');

const isPromptCollectionObjIdsValidator = validateObjectIds('promptCollectionObjIds', true);
const isCustomPromptCollectionObjIdsValidator = validateObjectIds('customPromptCollectionObjIds', true);
const isCustomPromptCollectionObjIdValidator = validateObjectId('customPromptCollectionObjId', true);
const listValidator = paginate;
const createValidator = [
    isPromptCollectionObjIdsValidator,
];
const deleteValidator = [
    isCustomPromptCollectionObjIdsValidator,
];
module.exports = {
    createValidator,
    listValidator,
    isCustomPromptCollectionObjIdValidator,
    deleteValidator,
};
