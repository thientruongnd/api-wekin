/**
 Mr : Dang Xuan Truong
 Email: truongdx@runsystem.net
 */
const util = require('util');
const destroy = require('destroy');
const path = require('path');
const winston = require('winston');
const fs = require('fs');
const empty = require('is-empty');
const axios = require('axios');
const { configEvn } = require('../configs/configEnvSchema');

const { CODES_SUCCESS, CODES_ERROR } = require('./messages');
const {
    IS_DELETED,
} = require('./constants');

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val) => {
    const port = parseInt(val, 10);
    if (Number.isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
};
/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let port;
    const bind = typeof port === 'string'
        ? `Pipe ${port}`
        : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const logConfiguration = (fileName = 'logError') => {
    const options = {
        file: {
            level: 'info',
            filename: path.join(__dirname, `../../logs/${fileName}.log`),
            handleExceptions: true,
            json: true,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            colorize: false,
        },
        console: {
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true,
        },
    };
    return {
        transports: [
            new winston.transports.File(options.file),
            // new winston.transports.Console(options.console)
        ],
    };
};

const writeLog = (fileName, error) => {
    const logger = winston.createLogger(logConfiguration(fileName));
    logger.error(error);
};

const isNumber = (value) => /^\s*[+-]?(\d+|\.\d+|\d+\.\d+|\d+\.)(e[+-]?\d+)?\s*$/.test(value);
const responseError = (statusCode, errors = {}, languageName = 'vi', msg = '') => {
    const response = {};
    response.success = false;
    response.statusCode = parseInt(statusCode, 10);
    if (!isNumber(statusCode)) {
        response.message = statusCode;
    } else {
        response.message = msg !== '' ? msg : CODES_ERROR?.[statusCode]?.[languageName] || CODES_ERROR?.[statusCode]?.vi || '';
    }
    let message = '';
    if (!empty(errors)) {
        message = errors[0] && errors[0].msg ? errors[0].msg : CODES_ERROR?.[statusCode]?.[languageName] || '';
        response.message = message;
        response.errors = errors;
    }
    return response;
};
const responseSuccess = (statusCode, result = {}, languageName = 'vi') => {
    const response = {
        success: true,
        statusCode,
        message: CODES_SUCCESS?.[statusCode]?.[languageName] ? CODES_SUCCESS?.[statusCode]?.[languageName] : CODES_SUCCESS?.[statusCode]?.vi,
    };
    if (result) {
        response.data = result;
    }
    return response;
};
const promiseResolve = (data) => Promise.resolve(data);
const promiseReject = (err) => Promise.reject(err);
const writeLogAccess = (res, data, filename) => {
    const msg = {
        time: new Date(),
        data,
    };
    return writeLog(filename, msg);
};

const resJsonError = (res, error, filename) => {
    const msg = {
        time: new Date(),
        error,
    };
    if (filename) writeLog(filename, msg);
    return res.json(responseError(100001, error));
};
const inArray = (array, value) => array.indexOf(value) > -1;
const isNumberInteger = (value) => Number.isInteger(+value);
const isNumberIntegerGtZero = (value) => Number.isInteger(+value) && value > 0;
const isEmail = (value) => {
    const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return !!filter.test(value);
};

const isArray = (value) => Array.isArray(value);
const isString = (value) => typeof value === 'string';
const isEmpty = (value) => empty(value);
const trimValue = (value) => String(value || '').trim();

const escapeRegExp = (string = '') => String(string).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const regExpSearch = (string = '') => {
    const regex = new RegExp(escapeRegExp(string), 'i');
    return regex;
};

const notSpaceAllow = (value) => /^\S*$/.test(value);
const regexSpace = (value) => /^(?!\s)(?!.*\s$).+$/.test(value);
const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

module.exports = {
    normalizePort,
    onError,
    responseError,
    responseSuccess,
    promiseResolve,
    promiseReject,
    writeLogAccess,
    isArray,
    isString,
    inArray,
    isNumberInteger,
    isEmail,
    isEmpty,
    trimValue,
    regExpSearch,
    notSpaceAllow,
    capitalizeFirstLetter,
    regexSpace,
    isNumberIntegerGtZero,
    resJsonError,
};
