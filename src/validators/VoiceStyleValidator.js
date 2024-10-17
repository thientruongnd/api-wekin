/**
 Mr : Dang Xuan Truong
 Email: truongdx@runsystem.net
 */
const { check } = require('express-validator');
const {
    validateObjectId,
} = require('./GeneralValidator');

const isVoiceStyleObjIdValidator = validateObjectId('voiceStyleObjId', true);
const isVoiceConvertObjIdValidator = validateObjectId('voiceConvertObjId', true);
const isAttachmentObjIdValidator = validateObjectId('attachmentObjId', true);
const nameValidator = check('name').notEmpty().withMessage('Name cannot blank');
const ssmlGenderValidator = check('ssmlGender').notEmpty().withMessage('Gender must be MALE or FEMALE');
const languageValidator = check('language').notEmpty().withMessage('Language cannot blank');

const addElevenLabsVoiceValidator = [
    nameValidator,
    languageValidator,
    ssmlGenderValidator,
    isAttachmentObjIdValidator,
];

const deleteElevenLabsVoiceValidator = [
    isVoiceStyleObjIdValidator,
];

module.exports = {
    isVoiceStyleObjIdValidator,
    isVoiceConvertObjIdValidator,
    addElevenLabsVoiceValidator,
    deleteElevenLabsVoiceValidator,
};
