/**
 Mr : Dang Xuan Truong
 Email: truongdx@runsystem.net
 @name config validate
 */

const {
    validateText,
    validateCode,
} = require('./GeneralValidator');

const nameValidator = validateText('name', true).notEmpty();
const codeValidator = validateCode('code').notEmpty();
const createValidator = [
    nameValidator,
    codeValidator,
];

module.exports = {
    createValidator,
};
