/**
 Mr : Dang Xuan Truong
 Email: truongdx@runsystem.net
 @name activation_keys Mã kích hoạt
 */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');
const { defaultFooter, ObjectId } = require('./utils/Common');

const activationKeyBase = {
    code: { type: String, trim: true, required: true }, // mã gói unique
    name: { type: String, trim: true, required: true }, // tên gói
    planObjId: { type: ObjectId, ref: 'plans', index: true }, // planObjId plans. objectplans . FK refers to the many id field in the plans table
    quantity: { type: Number, trim: true, required: true }, // số tháng
    modelOptions: [{
        codeOption: { type: String, trim: true },
        nameOption: { type: String, trim: true },
        chatgptObjId: { // chatgptObjId chatgpt. objectchatgpts . FK refers to the many id field in the chatgpts table
            type: ObjectId, ref: 'chatgpts',
        },
        credits: { type: Number, default: -1, required: true }, // số credit tối đa
        maxDayCredits: { type: Number, default: 0, required: true }, // số credit tối đa  trong ngày
        maxMonthCredits: { type: Number, default: 0, required: true }, // số credit tối đa  trong tháng
    }],
    endDate: { type: String, required: true }, // ngày activation key hết hiệu lực
    usedStatus: { type: String, default: 'No', enum: ['Yes', 'No'] }, // trạng thái sử dụng Yes : đã sử dụng, No: chưa sử dụng
    activationDate: { type: Date, default: null }, // ngày sử dụng
    usedBy: { type: ObjectId, ref: 'users', default: null }, // người sử dụng
    fullName: { type: String, trim: true }, // họ tên khách hàng
    email: { type: String, trim: true }, // email khách hàng
    phone: { type: String, trim: true }, // số điện thoại khách hàng
    note: { type: String, trim: true }, // ghi chú
    resellerObjId: { type: ObjectId, ref: 'users', default: null }, // userObjId user. FK refers to the many id field in the users table
};
const activationKey = { ...activationKeyBase, ...defaultFooter };
const activationKeySchema = new Schema(activationKey, { versionKey: false });
activationKeySchema.plugin(mongoosePaginate);
activationKeySchema.index({
    code: 1, isDeleted: 1,
}, {
    unique: true,
    partialFilterExpression: {
        isDeleted: { $eq: 'No' },
    },
});
const couponsModel = mongoose.model('activation_keys', activationKeySchema);
module.exports = couponsModel;
