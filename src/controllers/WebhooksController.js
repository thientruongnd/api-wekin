/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
const util = require('util');
const axios = require('axios');

const {
    responseError,
    responseSuccess,
    isEmpty,
    resJsonError,
} = require('../utils/shared');

const token=process.env.TOKEN;
const verifyTokenApp =process.env.VERIFY_TOKEN;//prasath_token

module.exports.API = {

    /**
     * signOut
     * @param {any} req request
     * @param {any} res response
     * @param {any} next next
     */
    getWebhook: async (req, res) => {
        console.log(util.inspect(req.query, false, null, true));
        const mode = req.query['hub.mode'];
        const token = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];
        const VERIFY_TOKEN = 'apple'; // Đặt mã xác minh tùy chọn của bạn tại đây

        // Kiểm tra nếu mode và token tồn tại trong request
        if (mode && token) {
            // Xác minh token
            if (mode === 'subscribe' && token === verifyTokenApp) {
                console.log('WEBHOOK_VERIFIED');
                res.status(200).send(challenge); // Trả về giá trị challenge
            } else {
                res.status(403).send('Forbidden');
            }
        } else {
            res.status(400).send('Bad Request');
        }
    },
    postWebhook: async (req, res) => {
        const body = req.body;
        console.log(util.inspect(req.body, false, null, true));
        // Kiểm tra request có chứa dữ liệu từ WhatsApp
        if (body.object === 'whatsapp_business_account') {
            body.entry.forEach((entry) => {
                const changes = entry.changes;
                changes.forEach((change) => {
                    const messageData = change.value.messages;
                    if (messageData) {
                        messageData.forEach((message) => {
                            console.log('Message:', message);
                        // Xử lý tin nhắn từ người dùng tại đây
                        });
                    }
                });
            });

            // Trả về 200 OK để xác nhận đã nhận thông báo
            res.status(200).send('EVENT_RECEIVED');
        } else {
            res.status(404).send('Not Found');
        }
    },
};
