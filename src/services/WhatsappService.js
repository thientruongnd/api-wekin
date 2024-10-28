/**
 * Mr : Dang Xuan Truong
 * Email: truongdx@runsystem.net
 * Common
 */
const util = require('util');
const moment = require('moment');
const { Base64 } = require('js-base64');
const WhatsappHelper = require('../helpers/WhatsappHelper');
const DataVekinHelper = require('../helpers/DataVekinHelper');

const {
    promiseReject,
    promiseResolve,
    isEmpty,
    calculateCost,
    buildCheckoutSessionURL,
    getNearestLocations,
    getImageLink,
} = require('../utils/shared');
const { type } = require('os');

const joinNow = async (data) => {
    try {
        const phone = data?.phone || '84902103222';
        const name = data?.name || 'Xuan Truong';
        const imageId = data?.imageId || '439102592147175';
        const template = {
            messaging_product: 'whatsapp',
            to: phone,
            type: 'template',
            template: {
                name: 'join_now',
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
                    {
                        type: 'button',
                        sub_type: 'quick_reply',
                        index: 0,
                        parameters: [
                            {
                                type: 'payload',
                                payload: 'join_now_payload', // Thay thế bằng chuỗi payload tùy chọn
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
const listEvent = async (data) => {
    try {
        const phone = data?.phone || '84902103222';
        const latitude = data?.latitude || '13.7379374';
        const longitude = data?.longitude || '100.5239999';
        const resDataVekin = await DataVekinHelper.eventCarbonReceipt();
        const rows = [];
        if (!isEmpty(resDataVekin)) {
            // khi có sự kiện
            const nearestLocations = getNearestLocations(resDataVekin, latitude, longitude);
            for (let i = 0; i < nearestLocations.length; i++) {
                const element = {};
                element.id = nearestLocations[i].id;
                element.title = nearestLocations[i].name;
                // Gán lại giá trị sau khi cắt chuỗi
                element.title = element.title.substring(0, 24);
                element.description = nearestLocations[i].event_code;
                // Kiểm tra số lượng phần tử trong rows
                if (rows.length < 10) {
                    rows.push(element);
                }
            }
            let template;
            if (!isEmpty(rows)) {
                template = {
                    messaging_product: 'whatsapp',
                    to: phone,
                    type: 'interactive',
                    interactive: {
                        type: 'list',
                        header: {
                            type: 'text',
                            text: 'Explore Sustainable Events',
                        },
                        body: {
                            text: 'Here’s a curated list of Sustainable Events,\n'
                                + 'brought to you by Vekin Group and our trusted eco-partners.\n'
                                + 'Join us in making a positive impact on the environment\n'
                                + 'by attending these events! Please choose an event.',
                        },
                        action: {
                            button: 'List events',
                            sections: [
                                {
                                    title: 'Event Options',
                                    rows,
                                },
                            ],
                        },
                    },
                };
            } else {
                template = {
                    messaging_product: 'whatsapp',
                    to: phone,
                    type: 'template',
                    template: {
                        name: 'no_events',
                        language: {
                            code: 'en_US',
                        },
                    },
                };
            }
            const resData = await WhatsappHelper.sendMessage(template);
            const response = {};
            if (resData?.status && resData?.status !== 200) {
                response.status = resData.status;
                response.message = resData.message;
                response.code = resData.code;
                return promiseResolve(response);
            }
            return promiseResolve(resDataVekin);
        }
        // không có sự kiện nào <- redirect to website "https://www.cero.org/"
    } catch (err) {
        return promiseReject(err);
    }
};
const paymentSuccess = async (data) => {
    try {
        const phone = data?.phone || '84902103222';
        const amount = data?.amount || '0';
        const urlImage = data?.urlImage || 'https://cdn.prod.website-files.com/64f417aa4ab67502c724d8c5/6503dfb8fab9f0c7a354aff6_LOGO_CERO_TEXT.png';
        const template = {
            messaging_product: 'whatsapp',
            to: phone,
            type: 'template',
            template: {
                name: 'payment_success_test',
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
                                    link: urlImage,
                                },
                            },
                        ],
                    },
                    {
                        type: 'body',
                        parameters: [
                            {
                                type: 'text',
                                text: amount,
                            },
                        ],
                    },
                ],
            },
        };
        // const template = {
        //     messaging_product: 'whatsapp',
        //     to: phone,
        //     type: 'image',
        //     image: {
        //         link: urlImage,
        //     },
        // };
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
const selectRegion = async (data) => {
    try {
        const flowId = data?.flowId || '570243495575706';
        const phone = data?.phone || '84902103222';
        const screen = data?.screen || 'QUESTION_ONE';
        const latitude = data?.latitude || '13.7379374';
        const longitude = data?.longitude || '100.5239999';
        const flowToken = { latitude, longitude, type: 'region' };
        const encodedToken = Base64.encode(JSON.stringify(flowToken));
        const template = {
            messaging_product: 'whatsapp',
            to: phone,
            recipient_type: 'individual',
            type: 'interactive',
            interactive: {
                type: 'flow',
                body: {
                    text: 'To better understand your journey and help calculate your carbon footprint, could you tell us where you’ll be traveling from?',
                },
                action: {
                    name: 'flow',
                    parameters: {
                        flow_message_version: '3',
                        flow_token: encodedToken,
                        flow_id: flowId,
                        flow_cta: 'Sustainable Events',
                        flow_action: 'navigate',
                        flow_action_payload: {
                            screen,
                        },
                    },
                },
            },
        };
        const decodedToken = JSON.parse(Base64.decode(encodedToken));
        console.log('Decoded flowToken:', decodedToken);
        console.log(util.inspect(template, false, null, true));
        const resData = await WhatsappHelper.sendMessage(template);
        console.log(util.inspect(resData, false, null, true));
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
        const template = {
            messaging_product: 'whatsapp',
            to: phone,
            type: 'template',
            template: {
                name: data.templateName || 'select_country',
                language: {
                    code: 'en_US',
                },
                components: [
                    {
                        type: 'button',
                        sub_type: 'flow',
                        index: 0,
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
    joinNow,
    listEvent,
    paymentSuccess,
    selectRegion,
    selectCountry,
    paymentConfirmation,
};
