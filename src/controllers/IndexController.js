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
        const resData = await DataVekinHelper.eventCarbonReceipt();
        const rows = [];
        if (!isEmpty(resData)) {
            for (let i = 0; i < resData.length; i++) {
                const element = {};
                element.id = resData[i].id;
                element.title = resData[i].name;
                element.title = element.title.substring(0, 24);
                let eventStartDate = resData[i].event_start_date;
                let eventEndDate = resData[i].event_end_date;
                eventStartDate = moment(eventStartDate).format('YYYY-MM-DD HH:mm:ss');
                eventEndDate = moment(eventEndDate).format('YYYY-MM-DD HH:mm:ss');
                element.description = `Start: ${eventStartDate} - End: ${eventEndDate}`;
                rows.push(element);
            }
        }
        const params = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: phone,
            type: 'interactive',
            interactive: {
                type: 'list',
                header: {
                    type: 'text',
                    text: 'Choose Sustainable Events',
                },
                body: {
                    // eslint-disable-next-line max-len
                    text: 'Here’s a curated list of Sustainable Events happening near you, brought to you by Vekin Group and our trusted eco-partners. Join us in making a positive impact on the environment by attending these events! Please choose an event.',
                },

                action: {
                    button: 'Choose an event.',
                    sections: [
                        {
                            title: 'List events',
                            rows,
                        },

                    ],
                },
            },
        };
        const resDataWhatsapp = await WhatsappHelper.sendMessage(params);
        return res.json(responseSuccess(10261, resDataWhatsapp, 'en'));
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
    createCheckoutSessionStripe: async (req, res) => {
        console.log('this log createCheckoutSessionStripe');
        try {
            const YOUR_DOMAIN = 'http://localhost:8900';
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                        price: 'price_1QCaA52LB1xmFw9BEm1AYzfc',
                        quantity: 1,
                    },
                ],
                mode: 'subscription',
                success_url: `${YOUR_DOMAIN}/success.html`,
                cancel_url: `${YOUR_DOMAIN}/cancel.html`,
            });
            res.redirect(303, session.url);
        } catch (errors) {
            console.log(util.inspect(errors, false, null, true));
            return resJsonError(res, errors);
        }
        // return res.json(responseSuccess(10261, resData, 'en'));
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
