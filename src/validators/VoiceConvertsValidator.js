/**
 Mr : Dang Xuan Truong
 Email: truongdx@runsystem.net
 */
const { check, body } = require('express-validator');
const {
    validateObjectId,
    paginate,
} = require('./GeneralValidator');

const isVoiceStyleObjIdValidator = validateObjectId('voiceStyleObjId', true);
const isVoiceConvertObjIdValidator = validateObjectId('voiceConvertObjId', true);
const promptValidator = check('prompt').notEmpty();
const listValidator = paginate;
const createValidator = [
    isVoiceStyleObjIdValidator,
    promptValidator,
];

module.exports = {
    createValidator,
    listValidator,
    isVoiceConvertObjIdValidator,
};
