/**
 Mr : Dang Xuan Truong
 Email: truongdx@runsystem.net
 */
const { check } = require('express-validator');
const {
    validateObjectId,
    paginate,
} = require('./GeneralValidator');

const isAssistantObjIdValidator = validateObjectId('assistantObjId', true);
const listValidator = paginate;
const taskCompletedValidator = [
    validateObjectId('assistantObjId'),
];
const isAssistantObjIdInInfoValidator = validateObjectId('assistantObjId', false);
const isAssistantIdValidator = check('assistantId').optional().isString();

const infoValidator = [
    check().custom((value, { req }) => {
        if (!req.query.assistantId && !req.query.assistantObjId) {
            throw new Error('One of two fields(assistantId, assistantObjId) must have value.');
        }
        return true;
    }),
    isAssistantIdValidator,
    isAssistantObjIdInInfoValidator,
];

module.exports = {
    listValidator,
    isAssistantObjIdValidator,
    taskCompletedValidator,
    infoValidator,
};
