/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
const { FEATURE_TYPE, FEATURE_PROVIDE } = require('../utils/constants');
const {
    validateObjectId,
    validateText,
    validateCode,
    paginate,
    validateSelect,
} = require('./GeneralValidator');

const isFeatureObjIdValidator = validateObjectId('featureObjId', true);
const nameValidator = validateText('name', true);
const codeValidator = validateCode('code', true);
const typeValidator = validateSelect('type', FEATURE_TYPE, true);
const provideValidator = validateSelect('provide', FEATURE_PROVIDE, true);
const listValidator = paginate;
const createValidator = [
    nameValidator,
    codeValidator,
    typeValidator,
    provideValidator,
];
module.exports = {
    createValidator,
    isFeatureObjIdValidator,
    listValidator,
};
