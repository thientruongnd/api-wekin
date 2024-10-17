/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
const { check } = require('express-validator');
const {
    notSpaceAllow,
    isArrayObjectId,
    isEmpty,
    isNonLatinCharacters,
    maxLengthTextAndCheckHtmlTag,
    checkPassword,
} = require('../utils/shared');
/** kiểm tra kí tự đặc biệt */
const checkSpecialCharacter = (str, allow, numbering, warehouse, code) => { // alow "." "-" "_" "," "/" "&"
    if (typeof str === 'boolean') return true;
    let format = '';
    if (allow) {
        format = /[`!@#$%^*()+\=\[\]{};':"\\|<>?~]/;
    } else if (code) {
        format = /[ `!@#$%^*()+\=\[\]{};':"\\|<>?~]/;
    } else if (numbering) {
        format = /[!@#$%^*()<>|"":]/;
    } else if (warehouse) {
        format = /[\:*?'<>|]/;
    } else {
        format = /[ `!@#$%^*()+\=\[\]{};':"\\|<>?~]/;
    }
    return format.test(str);
};
const validateObjectId = (field, required = false) => {
    if (required) {
        return check([field]).notEmpty().withMessage(`${field} is required`)
            .isMongoId()
            .withMessage(`${field} must is ObjectId`);
    }
    return check([field])
        .optional({ nullable: true }).isMongoId().withMessage(`${field} must is ObjectId or null`);
};
const validateId = (field, required = false) => {
    if (required) {
        return check([field]).notEmpty().withMessage(`${field} is required`)
            .isInt({ gt: 0 })
            .withMessage(`${field} must is number greater than 0`);
    }
    return check([field])
        .optional({ nullable: true }).isInt({ gt: 0 }).withMessage(`${field} must is number greater than 0`);
};

const validateObjectIds = (field, required = false) => {
    if (required) {
        return check([field]).notEmpty().withMessage(`${field} is required`)
            .custom((value) => isArrayObjectId(value))
            .withMessage(`${field} must be an array ObjectId`);
    }
    return check([field])
        .optional()
        .custom((value) => isArrayObjectId(value) || isEmpty(value))
        .withMessage(`${field} must be an array ObjectId or empty`);
};

const pageValidator = check('page').optional().isNumeric().withMessage('Page is number');
const limitValidator = check('limit').optional().isNumeric().withMessage('Limit is number');
const sortKeyValidator = check('sortKey').optional().isString().withMessage('sortKey is string');
const sortOrderValidator = check('sortOrder').optional().isNumeric().withMessage('sortOrder is number');
const paginate = [
    pageValidator, limitValidator, sortKeyValidator, sortOrderValidator,
];
const exportValidator = pageValidator;
const isCompanyObjId = validateObjectId('companyObjId', true);

const passwordValidator = check('password').notEmpty().custom((value) => checkPassword(value))
    .withMessage('Password must be at least 8 characters including numbers and special characters. Please try again!');

const checkValue = (value, isNonLatin, allow, numbering, warehouse, code) => {
    const checkValue = isNonLatin
        ? !checkSpecialCharacter(value, allow, numbering, warehouse, code) && !isNonLatinCharacters(value)
        : !checkSpecialCharacter(value, allow, numbering, warehouse, code);
    return checkValue;
};
const validateCode = (field, required = false, isNonLatin = true, allow = false, numbering = false, warehouse = false, code = false, languageName = 'vi') => {
    const msg = {
        vi: 'Không được chứa ký tự đặt biệt, không có khoảng trắng...',
        en: 'not special character and only Latin character',
    };
    if (required) {
        return check([field]).notEmpty().custom((value) => checkValue(value, isNonLatin, allow, numbering, warehouse, code))
            .withMessage(`${field} ${msg?.[languageName]}`);
    }
    return check([field]).optional().custom((value) => checkValue(value, isNonLatin, allow, numbering, warehouse, code) || value === '')
        .withMessage(`${field} ${msg[languageName]}`);
};
const validateText = (field, required = false, languageName = 'vi') => {
    const msg = {
        vi: 'không được phép chứa thẻ html hoặc chỉ có khoảng trắng',
        en: 'is not allowed to contain html tags or only white space',
    };
    if (required) {
        return check([field]).notEmpty().custom((value) => maxLengthTextAndCheckHtmlTag(value))
            .withMessage(`${field} ${msg?.[languageName]}`);
    }
    return check([field]).optional().custom((value) => maxLengthTextAndCheckHtmlTag(value, false))
        .withMessage(`${field} ${msg?.[languageName]}`);
};
const validateSelect = (field, data = [], required = false) => {
    if (required) {
        return check([field]).notEmpty().isIn(data)
            .withMessage(`${field} value is string must in ${data.join('|')}`);
    }
    return check([field]).optional().isIn(data)
        .withMessage(`${field} value is string must in ${data.join('|')}`);
};

const validateCodeActivator = (field, languageName = 'vi') => {
    const regex = /^([A-Z0-9]{4}-){3}[A-Z0-9]{4}$/;
    const msg = {
        vi: 'Mã kích hoạt không hơp lệ!',
        en: 'Incorrect `XXXX-XXXX-XXXX-XXXX` format',
    };
    return check([field]).notEmpty().custom((value) => regex.test(value)).withMessage(`${msg?.[languageName]}`);
};
module.exports = {
    paginate,
    isCompanyObjId,
    passwordValidator,
    exportValidator,
    validateObjectId,
    validateId,
    validateObjectIds,
    validateCode,
    validateText,
    checkValue,
    validateSelect,
    validateCodeActivator,

};
