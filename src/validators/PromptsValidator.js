/**
 Mr : Dang Xuan Truong
 Email: truongdx@runsystem.net
 */
const { check, body } = require('express-validator');
const {
    validateObjectIds, validateObjectId, validateText, paginate,
} = require('./GeneralValidator');
const { PROMPT_USER_ACTION } = require('../utils/constants');

let PROMPT_USER_ACTION_VALUES = Object.values(PROMPT_USER_ACTION);
PROMPT_USER_ACTION_VALUES = PROMPT_USER_ACTION_VALUES.map((e) => e.toLowerCase());

const categoryObjIdValidator = validateObjectIds('categoryObjIds', true);
const planObjIdValidator = validateObjectIds('planObjIds', true);
const isPromptObjIdValidator = validateObjectId('promptObjId', true);
const isNotObjIdValidator = validateObjectId('notObjId', false);
const nameValidator = validateText('name', true).notEmpty();
const summaryValidator = validateText('summary').notEmpty();
const contentValidator = check('content').notEmpty();
const actionValidator = check('action').notEmpty().isIn(PROMPT_USER_ACTION_VALUES).withMessage(`action value is string must in ${PROMPT_USER_ACTION_VALUES.join('|')}`);
const isPromptIdtValidator = check('promptId').optional().isInt({ gt: 0 });
const listValidator = paginate;
const createValidator = [
    categoryObjIdValidator,
    planObjIdValidator,
    nameValidator,
    summaryValidator,
    contentValidator,
];

const updateValidator = [
    isPromptObjIdValidator,
    nameValidator,
];
const listByPromptCategoryValidator = [
    ...paginate,
    isNotObjIdValidator,
    validateObjectIds('categoryObjIds'),
];

const actionsValidator = [
    actionValidator,
    isPromptObjIdValidator,
];

const suggestionValidator = [
    isPromptIdtValidator,
];

module.exports = {
    createValidator,
    updateValidator,
    listValidator,
    listByPromptCategoryValidator,
    isPromptObjIdValidator,
    actionsValidator,
    suggestionValidator,
    isPromptIdtValidator,
};
