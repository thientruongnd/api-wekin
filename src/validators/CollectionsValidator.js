/**
 Mr : Dang Xuan Truong
 Email: truongdx@runsystem.net
 @name collections Collection validate
 */

const { validateObjectId, validateId, paginate } = require('./GeneralValidator');

const listValidator = [...paginate];
const isCollectionObjIdValidator = validateObjectId('id', true);
const isCollectionIdValidator = validateId('collectionId');
module.exports = {
    listValidator,
    isCollectionObjIdValidator,
    isCollectionIdValidator,
};
