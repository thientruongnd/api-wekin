/**
 Mr : Dang Xuan Truong
 Email: truongdx@runsystem.net
 */
const util = require('util');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const winston = require('winston');
const empty = require('is-empty');
const nodeHtmlToImage = require('node-html-to-image');
const { createCanvas, loadImage } = require('canvas');
const { countries: dataCountries } = require('./dataSample/data.countries');
const { CODES_SUCCESS, CODES_ERROR } = require('./messages');
const { configEvn } = require('../configs/configEnvSchema');
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
const calculateCost = (kgCO2, countryCode) => {
    let ratePerKg = 1;// 1 kg CO2 = 1 THB
    if (countryCode === 'Singapore') {
        ratePerKg = 0.5; // 1 kg CO2 = 0.5 SGD
    }
    return kgCO2 * ratePerKg;
};
const buildCheckoutSessionURL = (baseURL, params) => {
    const url = new URL(`https://${ baseURL}`); // Thêm 'https://' vào baseURL
    const searchParams = new URLSearchParams(params); // Tạo đối tượng URLSearchParams từ params
    url.search = searchParams.toString(); // Thêm chuỗi query vào URL
    // Loại bỏ 'https://' trong kết quả trả về
    return url.toString().replace('https://', '');
};
const getImageLink = (host, pathName = '') => `${host}${pathName}`;
const getNearestLocations = (data, latitude, longitude, count = 10) => {
    function haversine(lat1, lon1, lat2, lon2) {
        const R = 6371; // Bán kính của trái đất tính bằng km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180)
            * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    return data
        .map((event) => ({
            ...event,
            distance: haversine(latitude, longitude, event.latitude, event.longitude),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, count);
};
const getCountry = (name) => {
    const countries = dataCountries;
    const countryName = name
        ?.replace(/^\d+_/, '') // Xóa số và ký tự gạch dưới ở đầu
        .replace(/_/g, ' '); // Thay dấu '_' bằng ''
    const country = countries.find((el) => el.name === countryName);
    return country;
};
const convertTemplateName = (regionName) => {
    const templateName = regionName
        .replace(/^\d+_/, '') // Xóa số và ký tự gạch dưới ở đầu
        .toLowerCase() // Chuyển thành chữ thường
        .replace(/-/g, '_'); // Thay dấu '-' bằng '_'
    return templateName;
};
const getRandomFileName = (extension = 'png') => `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${extension}`;
const downloadImage = async (url, outputPath) => {
    try {
        const response = await axios({
            url,
            responseType: 'stream',
        });
        const writer = fs.createWriteStream(outputPath);
        response.data.pipe(writer);
        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    } catch (error) {
        console.error('Lỗi khi tải ảnh:', error.message);
    }
};
const convertTextToImage = async (data) => {
    try {
        const width = 600;
        const height = 700;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = '#000000';
        function wrapText(ctx, text, x, y, maxWidth = 500, lineHeight = 25, isBold = false, isCenter = false, fontSize = 18) {
            ctx.font = `${isBold ? 'bold' : 'normal'} ${fontSize}px Arial`;
            let line = '';
            let currentY = y;
            for (const char of text) {
                const testLine = line + char;
                const { width: testWidth } = ctx.measureText(testLine);
                if (testWidth > maxWidth) {
                    ctx.fillText(line, x, currentY);
                    line = char;
                    currentY += lineHeight;
                } else {
                    line = testLine;
                }
            }
            const drawX = isCenter ? ((width - ctx.measureText(line).width) / 2) : x;
            ctx.fillText(line, drawX, currentY);
        }
        function drawTextLeftRight(ctx, text1, text2, y, maxWidth, isBold = false) {
            ctx.font = `${isBold ? 'bold' : 'normal'} 18px Arial`;
            ctx.fillText(text1, 40, y);
            const text2Width = ctx.measureText(text2).width;
            const xText2 = maxWidth - text2Width - 40;
            ctx.fillText(text2, xText2, y);
        }
        const image = await loadImage(data.eventImageUrl);
        ctx.drawImage(image, (width - 200) / 2, 40, 200, 200); // X, Y, width, height
        wrapText(ctx, String(data.title).toUpperCase(), 0, 280, 600, 30, true, true, 22);
        wrapText(ctx, data.date, 0, 310, 600, 30, false, true, 16);
        wrapText(ctx, data.eventName, 0, 340, 600, 30, true, true, 20);
        wrapText(ctx, data.eventLocation, 0, 370, 600, 30, false, true);
        drawTextLeftRight(ctx, 'Your Emission:', `${data.eventEmissionValue} ${data.eventEmissionUnit}`, 440, 600);
        drawTextLeftRight(ctx, 'Carbon Saved:', `${data.eventCarbonSavedValue} ${data.eventCarbonSavedUnit}`, 480, 600);
        drawTextLeftRight(ctx, 'Total cost:', `${data.unitAmount} ${data.currency}`, 520, 600);
        drawTextLeftRight(ctx, 'Verified blockchain address:', `${String(data.blockchain).substring(0, 15) }...`, 560, 600);
        drawTextLeftRight(ctx, 'Verified by:', `${data.verifiedBy}`, 600, 600);
        drawTextLeftRight(ctx, 'Receipt NO.:', `${data.refNumber}`, 640, 600);
        const buffer = canvas.toBuffer('image/png');
        const fileName = getRandomFileName('png');
        const outputPath = path.join(__dirname, '../public/images', fileName);
        await fs.writeFileSync(outputPath, buffer);
        const eventImage = `${data.host}/images/${fileName}`;
        console.log('Image created');
        return eventImage;
    } catch (error) {
        console.error('error create image:', error.message);
    }
};
const convertTextToImageNodeHtmlToImage = async (data) => {
    try {
        const fileName = getRandomFileName('png');
        const outputPath = path.join(__dirname, '../public/images', fileName);
        const eventImage = `${data.host}/images/${fileName}`;
        await nodeHtmlToImage({
            output: outputPath,
            html: `
              <html>
                <head>
                  <style>
                    body {
                      width: 600px;
                      height: 700px;
                    }
                    p {
                      font-size: 22px;
                      line-height: 28px;
                      margin: 0px;
                    }
                  </style>
                </head>
                <body style="margin:0; padding:15px;background-color: #fff;">
                  <div style="width: 150px; height: 150px; margin: 0 auto;margin-bottom: 10px;background-color: #fff">
                    <img src="${data.eventImageUrl}" style="width: 100%; height: 100%;"/>
                  </div>
                  <p style="text-align: center;font-weight: bold;">${data.title}</p>
                  <p style="text-align: center;">${data.date}</p>
                  <p style="font-weight: bold;">${data.eventName}</p>
                  <p>${data.eventLocation}</p>
                  <div style="display: flex; justify-content: space-between;font-weight: bold;">
                    <p>Your Emission</p>
                    <p>${data.eventEmissionValue} ${data.eventEmissionUnit}</p>
                  </div>
                  <div style="display: flex; justify-content: space-between;font-weight: bold;">
                    <p>Carbon Saved</p>
                    <p>${data.eventCarbonSavedValue} ${data.eventCarbonSavedUnit}</p>
                  </div>
                  <div style="display: flex; justify-content: space-between;font-weight: bold;">
                    <p>Total cost</p>
                    <p>${data.unitAmount} ${data.currency}</p>
                  </div>
                  <p>Verified blockchain address:</p>
                  <p style="font-weight: bold;word-wrap: break-word; overflow-wrap: break-word;">${data.blockchain}</p>
                  <p style="font-weight: bold;margin-top: 10px;">Verified by ${data.verifiedBy}</p>
                  <p>Receipt NO.: ${data.refNumber}</p>
                </body>
              </html>
            `,
        });
        console.log('The image was created successfully!');
        return eventImage;
    } catch (error) {
        console.error('error create image:', error.message);
        return null;
    }
};
const getCountryFromCoordinates = async (latitude, longitude) => {
    const apiKey = configEvn.GOOGLE_MAP_KEY; // Replace with your actual API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        const results = response.data.results;

        if (results.length > 0) {
            // Look for the country in the address components
            const addressComponents = results[0].address_components;
            const country = addressComponents.find((component) => component.types.includes('country'));
            return country ? { country_code: country.short_name, country: country.long_name } : null; // country.short_name : country.long_name : null;
        }
        return null;
    } catch (error) {
        console.error('Error fetching location data:', error);
        return null;
    }
};
const getLocationData = async (data) => {
    const apiKey = configEvn.GOOGLE_MAP_KEY; // Replace with your actual API key
    const address = data?.address;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        const data = response.data;
        if (data.status === 'OK') {
            const result = data.results[0];
            const location = result.geometry.location;
            const country = result.address_components.find((component) => component.types.includes('country'));
            const city = result.address_components.find((component) => component.types.includes('locality') || component.types.includes('administrative_area_level_1'));
            return {
                latitude: location?.lat,
                longitude: location.lng,
                country_code: country ? country.short_name : 'Not found',
                country: country ? country.long_name : 'Not found',
                city: city ? city.long_name : 'Not found',
            };
        }
        return null;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};
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
    calculateCost,
    buildCheckoutSessionURL,
    getImageLink,
    getNearestLocations,
    getCountry,
    convertTemplateName,
    downloadImage,
    getRandomFileName,
    getCountryFromCoordinates,
    convertTextToImage,
    convertTextToImageNodeHtmlToImage,
    getLocationData,
};
