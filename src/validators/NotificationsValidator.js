/**
 * Created by Truongbx on 01/02/24.
 * truongbx@runsystem.net - Bui Xuan Truong
 */
const { check } = require('express-validator');
const { validateObjectId, paginate, validateSelect } = require('./GeneralValidator');
const { NOTIFICATION_TYPE } = require('../utils/constants');

const senderObjIdValidator = validateObjectId('senderObjId', true);
const notifyTypeValidator = validateSelect('notifyType', NOTIFICATION_TYPE, true);
const notifyTitleValidator = check('notifyTitle').notEmpty();
const isNotificationObjIdValidator = validateObjectId('notificationObjId', true);
const listValidator = paginate;
const createValidator = [
    senderObjIdValidator,
    notifyTypeValidator,
    notifyTitleValidator,
];

module.exports = {
    createValidator,
    listValidator,
    isNotificationObjIdValidator,
};
