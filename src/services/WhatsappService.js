/**
 * Mr : Dang Xuan Truong
 * Email: truongdx@runsystem.net
 * Common
 */
const util = require('util');
const moment = require('moment');
const { Base64 } = require('js-base64');
const path = require('path');
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
    downloadImage,
    getRandomFileName,
    convertTemplateName,
    getCountry,
    getCountryFromCoordinates,
} = require('../utils/shared');

const joinNow = async (data) => {
    try {
        const phone = data?.phone || '84902103222';
        const name = data?.name || 'Xuan Truong';
        const imageId = data?.imageId || '439102592147175';
        const payloadParams = { type: 'join_now_payload' };
        const payloadEncode = Base64.encode(JSON.stringify(payloadParams));
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
                                payload: payloadEncode, // Thay thế bằng chuỗi payload tùy chọn
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
        const flowToken = { lat: latitude, long: longitude, type: 'selectEvent' };
        const rows = [];
        if (!isEmpty(resDataVekin)) {
            // khi có sự kiện
            const nearestLocations = getNearestLocations(resDataVekin, latitude, longitude);
            for (let i = 0; i < nearestLocations.length; i++) {
                const element = {};
                flowToken.eventId = nearestLocations[i].id;
                const encodedToken = Base64.encode(JSON.stringify(flowToken));
                element.id = encodedToken;
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
const ecoTravel = async (data) => {
    try {
        const phone = data?.phone || '84902103222';
        const latitude = data?.latitude || '13.7379374';
        const longitude = data?.longitude || '100.5239999';
        const eventId = data?.eventId;
        const flowToken = {
            lat: latitude, long: longitude, eventId, type: 'sameCountry',
        };
        const sameCountryEncode = Base64.encode(JSON.stringify(flowToken));
        const differentCountry = {
            lat: latitude, long: longitude, eventId, type: 'differentCountry',
        };
        const differentCountryEncode = Base64.encode(JSON.stringify(differentCountry));
        const template = {
            messaging_product: 'whatsapp',
            to: phone,
            type: 'template',
            template: {
                name: 'eco_travel',
                language: {
                    code: 'en_US',
                },
                components: [

                    {
                        type: 'button',
                        sub_type: 'quick_reply',
                        index: 0,
                        parameters: [
                            {
                                type: 'payload',
                                payload: sameCountryEncode,
                            },
                        ],
                    },
                    {
                        type: 'button',
                        sub_type: 'quick_reply',
                        index: 1,
                        parameters: [
                            {
                                type: 'payload',
                                payload: differentCountryEncode,
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
        return false;
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
const completed = async (data) => {
    try {
        const phone = data?.phone || '84902103222';
        const template = {
            messaging_product: 'whatsapp',
            to: phone,
            type: 'template',
            template: {
                name: 'completed',
                language: {
                    code: 'en_US',
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
        return promiseResolve(resData);
    } catch (err) {
        return promiseReject(err);
    }
};

const selectRegion = async (data) => {
    try {
        const phone = data?.phone || '84902103222';
        const latitude = data?.latitude || '13.7379374';
        const longitude = data?.longitude || '100.5239999';
        const eventId = data?.eventId || 230;
        const flowToken = {
            latitude, longitude, eventId, type: 'region',
        };
        const encodedToken = Base64.encode(JSON.stringify(flowToken));
        const template = {
            messaging_product: 'whatsapp',
            to: phone,
            type: 'template',
            template: {
                name: 'fill_travel_information',
                language: {
                    code: 'en_US',
                },
                components: [
                    {
                        type: 'button',
                        sub_type: 'flow',
                        index: 0,
                        parameters: [
                            {
                                type: 'action',
                                action: {
                                    flow_token: encodedToken,
                                },
                            },
                        ],
                    },
                ],
            },
        };
        // const decodedToken = JSON.parse(Base64.decode(encodedToken));
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
    const regionName = data?.regionName || '2_South-central_Asia';
    const customerName = data?.customerName || 'Xuan Truong';
    const templateName = convertTemplateName(regionName);
    const phone = data?.phone || '84902103222';
    const latitude = data?.latitude || '13.7379374';
    const longitude = data?.longitude || '100.5239999';
    const eventId = data?.eventId || 230;
    const flowToken = {
        latitude, longitude, eventId, customerName, type: 'country',
    };
    const encodedToken = Base64.encode(JSON.stringify(flowToken));
    try {
        const template = {
            messaging_product: 'whatsapp',
            to: phone,
            type: 'template',
            template: {
                name: templateName || 'select_country',
                language: {
                    code: 'en_US',
                },
                components: [
                    {
                        type: 'button',
                        sub_type: 'flow',
                        index: 0,
                        parameters: [
                            {
                                type: 'action',
                                action: {
                                    flow_token: encodedToken,
                                },
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
        return promiseResolve(data);
    } catch (err) {
        return promiseReject(err);
    }
};
const checkCountry = async (data) => {
    try {
        const countryName = data?.regionName || '2_United_Arab_Emirates';
        const myLatitude = data?.latitude || '20.4458553';
        const myLongitude = data?.longitude || '106.1173998';
        const infoCountry = await getCountry(countryName);
        const latitudeFrom = infoCountry?.latitude || '13.7379374';
        const longitudeFrom = infoCountry?.longitude || '100.5239999';
        const myCountry = await getCountryFromCoordinates(myLatitude, myLongitude);
        const countryFrom = await getCountryFromCoordinates(latitudeFrom, longitudeFrom);
        console.log(util.inspect(countryFrom, false, null, true));
        const locationFrom = {};
        if (myCountry.country_code !== countryFrom.country_code) {
            // select different country
            locationFrom.lat = latitudeFrom;
            locationFrom.long = longitudeFrom;
            const resData = await DataVekinHelper.transportationList();
            const rows = [];
            if (!isEmpty(resData)) {
                const emissionList = resData?.emission_list || [];
                // for (let i = 0; i < emissionList.length; i++) {
                //     const element = {};
                //     flowToken.eventId = nearestLocations[i].id;
                //     const encodedToken = Base64.encode(JSON.stringify(flowToken));
                //     element.id = encodedToken;
                //     element.title = nearestLocations[i].name;
                //     // Gán lại giá trị sau khi cắt chuỗi
                //     element.title = element.title.substring(0, 24);
                //     element.description = nearestLocations[i].event_code;
                //     // Kiểm tra số lượng phần tử trong rows
                //     if (rows.length < 10) {
                //         rows.push(element);
                //     }
                // }
            }
        }

        return promiseResolve(data);
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
            const title = receipt?.title;
            const date = receipt?.date;
            const eventName = receipt?.event_name;
            const eventLocation = receipt?.event_location;
            const eventEmission = receipt?.event_emission;
            const eventCarbonSaved = receipt?.event_carbon_saved;
            const blockchain = receipt?.blockchain;
            const refNumber = receipt?.ref_number;
            const verifiedBy = receipt?.verified_by;
            const eventId = receipt?.event_id;
            const currency = '$';
            const formattedDate = moment(date).format('DD MMMM YYYY HH:mm');
            const amount = calculateCost(eventEmission.value);
            const fileName = getRandomFileName('png');
            const outputPath = path.join(__dirname, '../public/images', fileName);
            await downloadImage(receipt?.event_image, outputPath);
            const eventImage = getImageLink(data.host, `/images/${fileName}`);
            // const eventImage = 'https://cdn.prod.website-files.com/64f417aa4ab67502c724d8c5/6503dfb8fab9f0c7a354aff6_LOGO_CERO_TEXT.png';
            const paramHeader = [
                {
                    type: 'image',
                    image: {
                        link: eventImage,
                    },
                },
            ];
            const paramBody = [
                {
                    type: 'text',
                    text: title,
                },
                {
                    type: 'text',
                    text: formattedDate,
                },
                {
                    type: 'text',
                    text: eventName,
                },
                {
                    type: 'text',
                    text: eventLocation,
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
                    text: `${amount} ${currency}`,
                },
                {
                    type: 'text',
                    text: blockchain,
                },
                {
                    type: 'text',
                    text: verifiedBy,
                },
                {
                    type: 'text',
                    text: refNumber,
                },
            ];
            const baseURL = 'stripes/createCheckoutSession';
            const params = {
                productName: eventName,
                unitAmount: amount,
                blockchain,
                phone,
                name,
                eventEmission,
                currency,
                title,
                date: formattedDate,
                eventName,
                eventLocation,
                eventCarbonSaved,
                verifiedBy,
                refNumber,
                eventImage,

            };

            const checkoutSessionURL = buildCheckoutSessionURL(baseURL, params);
            const paramButton = [
                {
                    type: 'text',
                    text: checkoutSessionURL,
                },
            ];
            const payloadParams = { type: 'maybe_later_payload' };
            const payloadEncode = Base64.encode(JSON.stringify(payloadParams));
            const template = {
                messaging_product: 'whatsapp',
                to: phone,
                type: 'template',
                template: {
                    name: 'payment_confirmation',
                    language: {
                        code: 'en_US',
                    },
                    components: [
                        {
                            type: 'header',
                            parameters: paramHeader,
                        },
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
                        {
                            type: 'button',
                            sub_type: 'quick_reply',
                            index: '1',
                            parameters: [
                                {
                                    type: 'payload',
                                    payload: payloadEncode,
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
    ecoTravel,
    completed,
    checkCountry,
};
