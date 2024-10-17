/**
 Mr : Dang Xuan Truong
 Email: truongdx@runsystem.net
 */
const {
    validateObjectId,
    paginate,
} = require('./GeneralValidator');

const isVoiceStyleObjIdValidator = validateObjectId('voiceStyleObjId');
const isVoiceStyleTranslateObjIdValidator = validateObjectId('voiceStyleTranslateObjId');
const isAttachmentObjIdValidator = validateObjectId('attachmentObjId', true);
const isSpeechToTextObjIdValidator = validateObjectId('speechToTextObjId', true);
const listValidator = paginate;
const createValidator = [
    isVoiceStyleObjIdValidator,
    isVoiceStyleTranslateObjIdValidator,
    isAttachmentObjIdValidator,
];
module.exports = {
    createValidator,
    listValidator,
    isSpeechToTextObjIdValidator,
};
