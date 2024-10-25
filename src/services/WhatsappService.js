/**
 * Mr : Dang Xuan Truong
 * Email: truongdx@runsystem.net
 * Common
 */
const util = require('util');
const moment = require('moment');
const WhatsappHelper = require('../helpers/WhatsappHelper');
const DataVekinHelper = require('../helpers/DataVekinHelper');

const {
    promiseReject,
    promiseResolve,
    isEmpty,
    calculateCost,
    buildCheckoutSessionURL,
} = require('../utils/shared');

const message001 = async (data) => {
    try {
        const phone = data?.phone || '84902103222';
        const name = data?.name || 'Xuan Truong';
        const imageId = data?.imageId || '439102592147175';
        const template = {
            messaging_product: 'whatsapp',
            to: phone,
            type: 'template',
            template: {
                name: 'ms001',
                language: {
                    code: 'en_US',
                },
                components: [
                    {
                        type: 'header',
                        parameters: [
                            {
                                type: 'image',
                                image: {
                                    id: imageId,
                                },
                            },
                        ],
                    },
                    {
                        type: 'body',
                        parameters: [
                            {
                                type: 'text',
                                text: name,
                            },
                        ],
                    },
                ],
            },
        };
        const resData = await WhatsappHelper.sendMessage(template);
        const response = {};
        if (resData?.status && resData?.status !== 200) {
            response.status = resData.status;
            response.message = resData.message;
            response.code = resData.code;
            return promiseResolve(response);
        }
        return promiseResolve(resData);
    } catch (err) {
        return promiseReject(err);
    }
};
/**
 * select Event
 * */
const message003 = async (data) => {
    try {
        const phone = data?.phone || '84902103222';
        const resDataVekin = await DataVekinHelper.eventCarbonReceipt();
        const rows = [];
        if (!isEmpty(resDataVekin)) {
            for (let i = 0; i < resDataVekin.length; i++) {
                const element = {};
                element.id = resDataVekin[i].id;
                element.title = resDataVekin[i].name;
                element.title.substring(0, 24);
                element.description = resDataVekin[i].event_code;
                if (rows.length < 10) {
                    rows.push(element);
                }
            }
        }
        const template = {
            messaging_product: 'whatsapp',
            to: phone,
            type: 'interactive',
            interactive: {
                type: 'list',
                header: {
                    type: 'text',
                    text: 'Choose an Event:',
                },
                body: {
                    text: 'Here’s a curated list of Sustainable Events,\n'
                        + 'brought to you by Vekin Group and our trusted eco-partners.\n'
                        + 'Join us in making a positive impact on the environment\n'
                        + 'by attending these events! Please choose an event.',
                },

                action: {
                    button: 'Select',
                    sections: [
                        {
                            title: 'Section',
                            rows,
                        },
                    ],
                },
            },
        };
        const resData = await WhatsappHelper.sendMessage(template);
        const response = {};
        if (resData?.status && resData?.status !== 200) {
            response.status = resData.status;
            response.message = resData.message;
            response.code = resData.code;
            return promiseResolve(response);
        }
        return promiseResolve(resDataVekin);
    } catch (err) {
        return promiseReject(err);
    }
};
const paymentSuccess = async (data) => {
    try {
        const phone = data?.phone || '84902103222';
        const amount = data?.amount || '0';
        const urlImage = data?.urlImage || 'https://cdn.prod.website-files.com/64f417aa4ab67502c724d8c5/6503dfb8fab9f0c7a354aff6_LOGO_CERO_TEXT.png';
        // const template = {
        //     messaging_product: 'whatsapp',
        //     to: phone,
        //     type: 'template',
        //     template: {
        //         name: 'payment_success_test',
        //         language: {
        //             code: 'en_US',
        //         },
        //         components: [
        //             {
        //                 type: 'header',
        //                 parameters: [
        //                     {
        //                         type: 'image',
        //                         image: {
        //                             link: urlImage,
        //                         },
        //                     },
        //                 ],
        //             },
        //             {
        //                 type: 'body',
        //                 parameters: [
        //                     {
        //                         type: 'text',
        //                         text: amount,
        //                     },
        //                 ],
        //             },
        //         ],
        //     },
        // };
        const template = {
            messaging_product: 'whatsapp',
            to: phone,
            type: 'image',
            image: {
                link: urlImage,
            },
        };
        const resData = await WhatsappHelper.sendMessage(template);
        const response = {};
        if (resData?.status && resData?.status !== 200) {
            response.status = resData.status;
            response.message = resData.message;
            response.code = resData.code;
            return promiseResolve(response);
        }
        return promiseResolve(resData);
    } catch (err) {
        return promiseReject(err);
    }
};
const selectCountry = async (data) => {
    try {
        const phone = data?.phone || '84902103222';
        const flowJSON = {
            version: '5.0',
            screens: [
                {
                    id: 'QUESTION_ONE',
                    title: 'Please choosing your country',
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
                                        type: 'Dropdown',
                                        label: 'Your country',
                                        required: true,
                                        name: 'Dropdown_519bd0',
                                        'data-source': [
                                            {
                                                id: '0_China',
                                                title: 'China',
                                            },
                                            {
                                                id: '1_Taiwan',
                                                title: 'Taiwan',
                                            },
                                            {
                                                id: '2_Hong_Kong,_China',
                                                title: 'Hong Kong, China',
                                            },
                                            {
                                                id: '3_Macau',
                                                title: 'Macau',
                                            },
                                            {
                                                id: "4_Democratic_People's_Republic_of_Korea",
                                                title: "Democratic People's Republic of Korea",
                                            },
                                            {
                                                id: '5_Japan',
                                                title: 'Japan',
                                            },
                                            {
                                                id: '6_Mongolia',
                                                title: 'Mongolia',
                                            },
                                            {
                                                id: '7_Republic_of_Korea',
                                                title: 'Republic of Korea',
                                            },
                                        ],
                                    },
                                    {
                                        type: 'Footer',
                                        label: 'Send',
                                        'on-click-action': {
                                            name: 'complete',
                                            payload: {
                                                screen_0_Dropdown_0: '${form.Dropdown_519bd0}',
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
        const template = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: phone,
            type: 'template',
            template: {
                name: 'select_country',
                language: {
                    code: 'en_US',
                },
                components: [
                    {
                        type: 'button',
                        sub_type: 'flow',
                        index: '0',
                    },
                ],
            },
        };
        const resData = await WhatsappHelper.sendMessage(template);
        const response = {};
        if (resData?.status && resData?.status !== 200) {
            response.status = resData.status;
            response.message = resData.message;
            response.code = resData.code;
            return promiseResolve(response);
        }
        return promiseResolve(resData);
    } catch (err) {
        return promiseReject(err);
    }
};
const paymentConfirmation = async (data) => {
    try {
        const resDataVekin = await DataVekinHelper.eventCarbonReceiptPartner(data);
        if (resDataVekin?.receipt) {
            const phone = data?.phone || '84902103222';
            const name = data?.name || 'Xuân Trường';
            const receipt = resDataVekin?.receipt;
            const date = receipt?.date;
            const eventName = receipt?.event_name;
            const eventEmission = receipt?.event_emission;
            const eventCarbonSaved = receipt?.event_carbon_saved;
            const blockchain = receipt?.blockchain;
            const refNumber = receipt?.ref_number;
            const verifiedBy = receipt?.verified_by;
            const eventId = receipt?.event_id;
            const formattedDate = moment(date).format('DD MMMM YYYY HH:mm');
            const amount = calculateCost(eventEmission.value);
            const paramBody = [
                {
                    type: 'text',
                    text: formattedDate,
                },
                {
                    type: 'text',
                    text: eventEmission.value + eventEmission.unit,
                },
                {
                    type: 'text',
                    text: eventCarbonSaved.value + eventCarbonSaved.unit,
                },
                {
                    type: 'text',
                    text: blockchain,
                },
            ];
            const baseURL = 'stripes/createCheckoutSession';
            const params = {
                productName: eventName,
                unitAmount: amount,
                blockchain,
                phone,
                name,
            };

            const checkoutSessionURL = buildCheckoutSessionURL(baseURL, params);
            const paramButton = [
                {
                    type: 'text',
                    text: checkoutSessionURL,
                },
            ];
            const template = {
                messaging_product: 'whatsapp',
                to: phone,
                type: 'template',
                template: {
                    name: 'payment_confirmation_1',
                    language: {
                        code: 'en_US',
                    },
                    components: [
                        {
                            type: 'body',
                            parameters: paramBody,
                        },
                        {
                            type: 'button',
                            sub_type: 'url',
                            index: '0',
                            parameters: paramButton,
                        },
                    ],
                },
            };
            const resData = await WhatsappHelper.sendMessage(template);
            const response = {};
            if (resData?.status && resData?.status !== 200) {
                response.status = resData.status;
                response.message = resData.message;
                response.code = resData.code;
                return promiseResolve(response);
            }
            return promiseResolve(resData);
        }
        return promiseResolve(resDataVekin);
    } catch (err) {
        return promiseReject(err);
    }
};
module.exports = {
    message001,
    message003,
    paymentSuccess,
    selectCountry,
    paymentConfirmation,
};
