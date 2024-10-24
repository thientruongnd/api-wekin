/**
 * Created by Truong on 10/08/23.
 * truongdx@runsystem.net - Xuan Truong
 * Function Name
 * */
const util = require('util');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const { configEvn } = require('../configs/configEnvSchema');

const {
    isEmpty,
    getYearToday,
    getMonthToday,
    getDayToday,
    makeDir,
    downloadImage,
    promiseResolve,
    promiseReject,

} = require('../utils/shared');

class WhatsappHelper {
    sendMessage = async (dataPost) => {
        try {
            const uri = `${configEvn.URI_WHATS_APP}/${configEvn.VERSION}/${configEvn.PHONE_NUMBER_ID}/messages`;
            const config = {
                method: 'post',
                url: uri,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${configEvn.TOKEN}`,
                },
                data: JSON.stringify(dataPost),
            };
            const result = await axios(config);
            return result?.data;
        } catch (error) {
            return error;
        }
    }

    sendMessageLocation = async (data) => {
        const phone = data?.phone;
        const dataPost = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            type: 'interactive',
            to: phone,
            interactive: {
                type: 'location_request_message',
                body: {
                    text: 'Where would you like to be picked up?',
                },
                action: {
                    name: 'send_location',
                },
            },
        };
        const uri = `${configEvn.URI_WHATS_APP}/${configEvn.VERSION}/${configEvn.PHONE_NUMBER_ID}/messages`;
        const config = {
            method: 'post',
            url: uri,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${configEvn.TOKEN}`,
            },
            data: JSON.stringify(dataPost),
        };
        const result = await axios(config);
        return result?.data;
    }
}
module.exports = new WhatsappHelper();
