/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
const mongoose = require('mongoose');

const { Schema, ObjectId } = mongoose;
const {
    STATUS,
    IS_DELETED,
} = require('../../utils/constants');
const {
    generatorTime,
} = require('../../utils/shared');

const footer = {
    status: {
        type: String, default: STATUS[200], required: true, index: true,
    },
    order: { type: Number, default: 255 },
    createdAt: { type: String, required: true, default: generatorTime() },
    createdBy: { type: ObjectId, ref: 'users' },
    updatedAt: { type: String },
    updatedBy: { type: ObjectId, ref: 'users' },
    isDeleted: { type: String, default: IS_DELETED[200], index: true },
};
const defaultFooter = {
    status: {
        type: String, default: STATUS[200], required: true, index: true,
    },
    order: { type: Number, default: 255 },
    createdAt: { type: Date, required: true, default: Date.now },
    createdBy: { type: ObjectId, ref: 'users' },
    updatedAt: { type: Date },
    updatedBy: { type: ObjectId, ref: 'users' },
    isDeleted: { type: String, default: IS_DELETED[200], index: true },
};
const multiLanguageCode = {
    en: { type: String, trim: true },
    ja: { type: String, trim: true },
    // fr: { type: String, trim: true },
    // de: { type: String, trim: true },
    // es: { type: String, trim: true },
    // zh: { type: String, trim: true },
    // ar: { type: String, trim: true },
};
const multiLanguageName = [
    { en: 'English' },
    { ja: '日本語' },
    // { fr: 'Français' },
    // { de: 'Deutsch' },
    // { es: 'Español' },
    // { zh: '中文' },
    // { ar: 'عربي' },
];
const findNotDeletedMiddleware = function (next) {
    this.where({ isDeleted: IS_DELETED[200] });
    next();
};

module.exports = {
    footer,
    ObjectId,
    Schema,
    mongoose,
    findNotDeletedMiddleware,
    defaultFooter,
    multiLanguageCode,
    multiLanguageName,
};
