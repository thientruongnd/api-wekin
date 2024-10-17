/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/

const dotenv = require('dotenv');
const Joi = require('joi');

dotenv.config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
    PORT: Joi.number().default(3500),
}).unknown().required();
const { error, value: configEvn } = envVarsSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    configEvn,
};
