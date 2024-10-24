/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
const util = require('util');
const moment = require('moment-timezone');
const axios = require('axios');
const WhatsappHelper = require('../helpers/WhatsappHelper');
const DataVekinHelper = require('../helpers/DataVekinHelper');
const WhatsappService = require('../services/WhatsappService');
const { configEvn } = require('../configs/configEnvSchema');

const {
    responseError,
    responseSuccess,
    isEmpty,
    resJsonError,
} = require('../utils/shared');

module.exports.DEFAULT = {
    index: async (req, res) => {
        res.status(200).send('Hello this is webhook setup by GMO');
    },
    sendMessage: async (req, res) => {
        // const resData = await WhatsappHelper.sendMessage(req.body);
        const params = {};
        params.phone = '84902103222';
        params.name = 'Xuan Truong';
        params.imageId = '439102592147175';
        const resData = await WhatsappService.message001(params);
        return res.json(responseSuccess(10261, resData, 'en'));
    },
    sendMessageLocation: async (req, res) => {
        const resData = await WhatsappHelper.sendMessageLocation({ phone: '84902103222' });

        return res.json(responseSuccess(10261, resData, 'en'));
    },
    eventCarbonReceipt: async (req, res) => {
        const phone = '84902103222';
        const resData = await WhatsappService.message003();
        
        return res.json(responseSuccess(10261, resData, 'en'));
    },
    transportationList: async (req, res) => {
        const resData = await DataVekinHelper.transportationList();
        return res.json(responseSuccess(10261, resData, 'en'));
    },
    eventLocations: async (req, res) => {
        console.log('this log eventLocations');
        const resData = await DataVekinHelper.eventLocations();
        const countries = [];
        for (const elm of resData) {
            const element = {};
            element.country = elm.country;
            countries.push(element);
        }
        console.log('countries', countries.length);
        return res.json(responseSuccess(10261, countries, 'en'));
    },

    eventCarbonReceiptPartner: async (req, res) => {
        const data = req.body;
        const resData = await DataVekinHelper.eventCarbonReceiptPartner(data);
        return res.json(responseSuccess(10261, resData, 'en'));
    },
    
    senTemplateFlow: async (req, res) => {
        // URL API WhatsApp để gửi tin nhắn
        const apiUrl = `${configEvn.URI_WHATS_APP}/${configEvn.VERSION}/${configEvn.PHONE_NUMBER_ID}/messages`;
        // Access token từ Meta (thay YOUR_ACCESS_TOKEN bằng token thật)

        // Cấu trúc dữ liệu template flow từ yêu cầu của bạn
        const templateFlow = {
            version: '5.0',
            screens: [
                {
                    id: 'QUESTION_TWO',
                    title: 'Choose coutry',
                    data: {},
                    terminal: true,
                    layout: {
                        type: 'SingleColumnLayout',
                        children: [
                            {
                                type: 'Form',
                                name: 'flow_path',
                                children: [
                                    {
                                        type: 'RadioButtonsGroup',
                                        label: 'Choose all that apply:',
                                        required: true,
                                        name: 'question2RadioButtons',
                                        'data-source': [
                                            {
                                                id: '0_Buy_something_new',
                                                title: 'Buy something new',
                                            },
                                            {
                                                id: '1_Wear_the_same,_as_usual',
                                                title: 'Wear the same, as usual',
                                            },
                                            {
                                                id: '2_Look_for_a_deal_online',
                                                title: 'Look for a deal online',
                                            },
                                        ],
                                    },
                                    {
                                        type: 'Footer',
                                        label: 'Continue',
                                        'on-click-action': {
                                            name: 'complete',
                                            payload: {
                                                screen_0_question2RadioButtons_0: '${form.question2RadioButtons}',
                                            },
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                },
            ],
        };

        // Gửi tin nhắn WhatsApp
        const messageData = {
            messaging_product: 'whatsapp',
            to: '84902103222',
            type: 'template',
            template: {
                name: 'ms02', // Tên template bạn đã tạo trên Meta
                language: {
                    code: 'en_US', // Mã ngôn ngữ của template
                },
                components: [
                    {
                        type: 'body',
                        parameters: [
                            {
                                type: 'text',
                                text: JSON.stringify(templateFlow), // Chuỗi template flow bạn muốn gửi
                            },
                        ],
                    },
                ],
            },
        };

        try {
            const response = await axios({
                method: 'POST',
                url: apiUrl,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${configEvn.TOKEN}`,
                },
                data: messageData,
            });

            console.log('Message sent successfully:', response.data);
        } catch (error) {
            console.error('Error sending message:', error.response ? error.response.data : error.message);
        }
    },

};
module.exports.API = {

    /**
     * signOut
     * @param {any} req request
     * @param {any} res response
     * @param {any} next next
     */
    auth: async (req, res) => {
        try {
            return res.json(responseError(40230, [], ''));
        } catch (errors) {
            return resJsonError(res, errors, 'login');
        }
    },
};
