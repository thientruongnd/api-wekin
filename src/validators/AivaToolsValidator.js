/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/

const { check } = require('express-validator');

const contentValidator = check('content').notEmpty();

module.exports = { contentValidator };
