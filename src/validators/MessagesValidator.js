/**
 @author Mr : Dang Xuan Truong
 Email: truongdx@runsystem.net
 @name  messages validate
 */

const { check } = require('express-validator');
const { validateObjectId, validateId } = require('./GeneralValidator');
const { MASSAGES_ROLE } = require('../utils/constants');

const isMessageObjIdValidator = validateObjectId('messageObjId', true);
const isThreadObjIdValidator = validateObjectId('threadObjId', true);
const isPromptObjIdValidator = validateObjectId('promptObjId', false);
const isPromptWorkflowIdValidator = validateId('promptWorkflowId');
const contentValidator = check('content').notEmpty();
const roleValidator = check('role').notEmpty().isIn(MASSAGES_ROLE)
    .withMessage(`role value is string must in ${MASSAGES_ROLE.join('|')}`);
const isPromptIdtValidator = check('promptId').optional({ nullable: true }).isInt({ gt: 0 });

const createValidator = [
    isThreadObjIdValidator,
    contentValidator,
    isPromptObjIdValidator,
    isPromptWorkflowIdValidator,
    roleValidator,
    isPromptIdtValidator,
];
const createFileValidator = [
    isMessageObjIdValidator,
];
module.exports = {
    createValidator,
    isMessageObjIdValidator,
    createFileValidator,
};
