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
const { configEvn } = require('../configs/configEnvSchema');
const {
    promiseReject,
    promiseResolve,
    isEmpty,
    calculateCost,
    buildCheckoutSessionURL,
    getNearestLocations,
    getCountryFromCoordinates,
    convertTextToImage,
    getLocationData,
} = require('../utils/shared');

const joinNow = async (data) => {
    try {
        const phone = data?.phone || '84902103222';
        const name = data?.name || 'Xuan Truong';
        const imageId = data?.imageId || '1092387271735133';// 439102592147175
        const joinNowPayload = { type: 'join_now_payload' };
        const joinNowPayloadId = Base64.encode(JSON.stringify(joinNowPayload));
        const template = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: phone,
            type: 'interactive',
            interactive: {
                type: 'button',
                header: {
                    type: 'image',
                    image: {
                        id: imageId,
                    },
                },
                body: {
                    text: `🌍✨ Welcome to CERO, ${name}! ✨🌍!\n\n`
                    + 'We\'re absolutely thrilled to have you join our mission of crafting unforgettable,'
                    + ' eco-friendly events that make a positive impact on our planet! Ready to go green together? 🌱\n'
                    + 'Join us in exploring our exclusive Sustainable Events Community\n\n',
                },

                action: {
                    buttons: [
                        {
                            type: 'reply',
                            reply: {
                                id: joinNowPayloadId,
                                title: 'Join now!',
                            },
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
        let template = {
            messaging_product: 'whatsapp',
            to: phone,
            type: 'interactive',
            interactive: {
                type: 'cta_url',
                body: {
                    text: 'Unfortunately, there are no events currently taking place at the selected location.'
                     + ' We encourage you to explore options in other place.',
                },
                action: {
                    name: 'cta_url',
                    parameters: {
                        display_text: 'More information',
                        url: 'https://www.cero.org/',
                    },
                },
            },
        };
        if (!isEmpty(resDataVekin)) {
            // khi có sự kiện
            const nearestLocations = getNearestLocations(resDataVekin, latitude, longitude);
            const rows = [];
            for (let i = 0; i < nearestLocations.length; i++) {
                const element = {};
                flowToken.eventId = nearestLocations[i].id;
                flowToken.lat = nearestLocations[i].latitude;
                flowToken.long = nearestLocations[i].longitude;
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
                            text: 'Here’s a curated list of Sustainable Events, brought to you by CERO and our trusted eco-partners.'
                                + ' Join us in making a positive impact on the environment by attending these events!\n'
                                + 'Please choose an event.',
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
            }
        }
        const resData = await WhatsappHelper.sendMessage(template);
        const response = {};
        if (resData?.status && resData?.status !== 200) {
            response.status = resData.status;
            response.message = resData.message;
            response.code = resData.code;
            return promiseResolve(response);
        }
        return true;
        // không có sự kiện nào <- redirect to website "https://www.cero.org/"
    } catch (err) {
        return promiseReject(err);
    }
};
const notEvent = async (data) => {
    try {
        const phone = data?.phone || '84902103222';
        const template = {
            messaging_product: 'whatsapp',
            to: phone,
            type: 'interactive',
            interactive: {
                type: 'cta_url',
                body: {
                    text: 'The event you selected is no longer available. We encourage you to explore our other events.\n\n',
                },
                action: {
                    name: 'cta_url',
                    parameters: {
                        display_text: 'More information',
                        url: 'https://www.cero.org/',
                    },
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
        return false;
    } catch (err) {
        return promiseReject(err);
    }
};
const ecoTravel = async (data) => {
    try {
        const resDataVekin = await DataVekinHelper.eventCarbonReceipt();
        const dataVekin = resDataVekin ? resDataVekin : [];
        const phone = data?.phone || '84902103222';
        const latitude = data?.latitude || '13.7379374';
        const longitude = data?.longitude || '100.5239999';
        const eventId = data?.eventId;
        const event = dataVekin.find((event) => event.id === eventId);
        if (isEmpty(event)) {
            return notEvent(data);
        }
        const flowToken = {
            lat: latitude, long: longitude, eventId, type: 'sC',
        };
        const sameCountryEncode = Base64.encode(JSON.stringify(flowToken));
        const differentCountry = {
            lat: latitude, long: longitude, eventId, type: 'dC',
        };
        const differentCountryEncode = Base64.encode(JSON.stringify(differentCountry));
        const template = {
            messaging_product: 'whatsapp',
            to: phone,
            type: 'interactive',
            interactive: {
                type: 'button',
                body: {
                    text: 'To better understand your journey and help us calculate your'
                    + ' carbon footprint, could you let us know if you traveled to the event'
                    + ' from within the same country or from a different country?',
                },
                action: {
                    buttons: [
                        {
                            type: 'reply',
                            reply: {
                                id: sameCountryEncode,
                                title: 'Same Country',
                            },
                        },
                        {
                            type: 'reply',
                            reply: {
                                id: differentCountryEncode,
                                title: 'Different Country',
                            },
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
        return false;
    } catch (err) {
        return promiseReject(err);
    }
};
/**
 * selectDistance
 * */
const selectDistance = async (data) => {
    try {
        const phone = data?.phone || '84902103222';
        const latitude = data?.latitude || '13.7379374';
        const longitude = data?.longitude || '100.5239999';
        const eventId = data?.eventId || 230;

        const flow1Token = {
            lat: latitude, long: longitude, eventId, d: 5, type: 'distance',
        };
        const flow5Token = {
            lat: latitude, long: longitude, eventId, d: 20, type: 'distance',
        };
        const flow10Token = {
            lat: latitude, long: longitude, eventId, d: 30, type: 'distance',
        };
        const flow15Token = {
            lat: latitude, long: longitude, eventId, d: 40, type: 'distance',
        };
        const flow20Token = {
            lat: latitude, long: longitude, eventId, d: 50, type: 'distance',
        };
        const rows = [
            {
                id: await Base64.encode(JSON.stringify(flow1Token)),
                title: 'Less than 5 km',
            },
            {
                id: await Base64.encode(JSON.stringify(flow5Token)),
                title: '6-20 km',
            },
            {
                id: await Base64.encode(JSON.stringify(flow10Token)),
                title: '21-30 km',
            },
            {
                id: await Base64.encode(JSON.stringify(flow15Token)),
                title: '31-40 km',
            },
            {
                id: await Base64.encode(JSON.stringify(flow20Token)),
                title: 'More than 40 km',
            },
        ];
        const template = {
            messaging_product: 'whatsapp',
            to: phone,
            type: 'interactive',
            interactive: {
                type: 'list',
                header: {
                    type: 'text',
                    text: 'Select distance',
                },
                body: {
                    text: 'How far did you travel to attend the event? (Approximation)\n',
                },
                action: {
                    button: 'Select distance',
                    sections: [
                        {
                            title: 'Select distance',
                            rows,
                        },
                    ],
                },
            },
        };
        await WhatsappHelper.sendMessage(template);
        return true;
    } catch (err) {
        return err;
    }
};

const fillAddress = async (data) => {
    try {
        const phone = data?.phone || '84902103222';
        const latitude = data?.latitude || '13.7379374';
        const longitude = data?.longitude || '100.5239999';
        const eventId = data?.eventId || 230;
        const flowToken = {
            lat: latitude, long: longitude, eventId, type: 'checkCountry',
        };
        const encodedToken = Base64.encode(JSON.stringify(flowToken));
        const template = {
            messaging_product: 'whatsapp',
            to: phone,
            type: 'template',
            template: {
                name: 'your_address_complate',
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

const enterLocationAgain = async (data) => {
    try {
        const phone = data?.phone || '84902103222';
        const eventId = data?.eventId || 230;
        const latitude = data?.latitude || '13.7379374';
        const longitude = data?.longitude || '100.5239999';
        const typeCountry = data?.typeCountry;
        const flowToken = {
            lat: latitude, long: longitude, eventId, typeCountry, type: 'enter_location_again',
        };
        const flowTokenEncode = Base64.encode(JSON.stringify(flowToken));
        const template = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: phone,
            type: 'interactive',
            interactive: {
                type: 'button',
                body: {
                    text: 'We couldn’t find the location based on the address provided. '
                    + 'Please check the details you entered and try again.\n\n',
                },

                action: {
                    buttons: [
                        {
                            type: 'reply',
                            reply: {
                                id: flowTokenEncode,
                                title: 'Enter location again',
                            },
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
        return true;
    } catch (err) {
        return promiseReject(err);
    }
};
const checkCountry = async (data) => {
    try {
        const customerName = data?.customerName || ' Damg xian truong';
        const customerAddress = data?.customerAddress || 'Thai lan';
        const typeCountry = data?.typeCountry || 'dC';
        const eventId = data?.eventId || 230;
        const distance = data?.distance || 0;
        const phone = data?.phone || '84902103222';
        const myLatitude = data?.latitude || '20.4458553';
        const myLongitude = data?.longitude || '106.1173998';
        const resGetLocationData = await getLocationData({ address: customerAddress });
        if (isEmpty(resGetLocationData)) {
            const params = {
                phone, latitude: myLatitude, longitude: myLongitude, eventId,
            };
            return await enterLocationAgain(params);
        }

        const locationFrom = {};
        const userDetails = {};
        locationFrom.lat = resGetLocationData?.latitude || '21.0058166';
        locationFrom.long = resGetLocationData?.longitude || '105.8473071';
        if (typeCountry === 'dC') {
            userDetails.name = customerName;
            const myCountry = await getCountryFromCoordinates(myLatitude, myLongitude);
            if (myCountry?.country_code === resGetLocationData?.country_code) {
                return await selectDistance(data);
            }
        }
        locationFrom.d = distance;
        const resData = await DataVekinHelper.transportationList();
        const rows = [];
        if (!isEmpty(resData)) {
            const emissionList = resData?.emission_list || [];
            for (let i = 0; i < emissionList.length; i++) {
                const element = {}; const flowToken = {};
                flowToken.id = emissionList[i].id;
                flowToken.lf = locationFrom;
                flowToken.uds = userDetails;
                flowToken.eid = eventId;
                flowToken.type = 'receipt';
                flowToken.tC = typeCountry;
                const encodedToken = Base64.encode(JSON.stringify(flowToken));
                element.id = encodedToken;
                element.title = emissionList[i].name;
                // Gán lại giá trị sau khi cắt chuỗi
                element.title = element.title.substring(0, 24);
                // element.description = nearestLocations[i].event_code;
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
                        body: {
                            text: 'The amount of CO2 emission is different depended on the type of your transportation.'
                            + ' Please select the transportation to display your CO2 emission.\n',
                        },
                        action: {
                            button: 'Transportation',
                            sections: [
                                {
                                    title: 'Choose',
                                    rows,
                                },
                            ],
                        },
                    },
                };
            }
            const resDataWhatsapp = await WhatsappHelper.sendMessage(template);
            const response = {};
            if (resData?.status && resDataWhatsapp?.status !== 200) {
                response.status = resDataWhatsapp.status;
                response.message = resDataWhatsapp.message;
                response.code = resDataWhatsapp.code;
                return promiseResolve(response);
            }
            return false;
        }
    } catch (err) {
        return promiseReject(err);
    }
};
const paymentConfirmation = async (data) => {
    try {
        const eventCarbonReceipt = {};
        const resData = await DataVekinHelper.transportationList();
        if (isEmpty(resData)) return false;
        const emissionId = data?.id;
        const emissionList = resData?.emission_list || [];
        const transportation = emissionList.find((emission) => emission.id === emissionId);
        eventCarbonReceipt.transportation = {
            id: transportation.id,
            unit: transportation.unit,
            name: transportation.name,
            total_co2: transportation.total_co2,
            unit_converter: [],
        };
        const phone = data?.phone || '84902103222';
        const customerName = data?.uds?.name;
        const typeCountry = data?.typeCountry || 'dC';
        const distance = data?.lf?.d || 0;
        const eventId = data?.eid;
        const locationFrom = data?.lf || {};
        let countryEvent = 'Thailand';
        const resDataEvent = await DataVekinHelper.eventCarbonReceipt();
        const event = resDataEvent.find((event) => event.id === eventId);
        if (isEmpty(event)) {
            return notEvent(data);
        }
        countryEvent = event?.country;
        if (typeCountry === 'sC') {
            locationFrom.name = event?.country;
            locationFrom.city = event?.city;
            locationFrom.lat = event?.latitude;
            locationFrom.long = event?.longitude;
            locationFrom.distance = distance;
        }
        eventCarbonReceipt.location_from = locationFrom;
        eventCarbonReceipt.user_details = {
            name: customerName,
            phone_number: phone,
        };
        eventCarbonReceipt.event_id = eventId;
        const resDataVekin = await DataVekinHelper.eventCarbonReceiptPartner(eventCarbonReceipt);
        if (resDataVekin?.receipt) {
            const name = data?.name || null;
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
            const formattedDate = moment(date).format('DD MMMM YYYY HH:mm');
            let amount = calculateCost(eventEmission.value, countryEvent);
            const currency = countryEvent === 'Singapore' ? 'sgd' : 'thb';
            if (currency === 'thb' && amount < 18) {
                amount = 18;
            }
            if (currency === 'sgd' && amount < 0.7) {
                amount = 0.7;
            }
            const eventImageUrl = receipt?.event_image;
            const baseURL = 'stripes/createCheckoutSession';
            const params = {
                productName: eventName,
                unitAmount: amount,
                blockchain,
                phone,
                name,
                eventEmissionValue: eventEmission.value,
                eventEmissionUnit: eventEmission.unit,
                currency,
                title,
                date: formattedDate,
                eventName,
                eventLocation,
                eventCarbonSavedValue: eventCarbonSaved.value,
                eventCarbonSavedUnit: eventCarbonSaved.unit,
                verifiedBy,
                refNumber,
                eventImageUrl,
                eventId,
                host: configEvn.URL,
            };
            const eventImage = await convertTextToImage(params);
            const imagePaymentSuccess = await convertTextToImage(params, 'paymentSuccess');
            if (eventImage) {
                const paramHeader = [
                    {
                        type: 'image',
                        image: {
                            link: eventImage,
                        },
                    },
                ];
                params.eventImage = eventImage;
                params.imagePaymentSuccess = imagePaymentSuccess;
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
                    recipient_type: 'individual',
                    type: 'template',
                    template: {
                        name: configEvn.TEMPLATE_CONFIRM_PAYMENT || 'confirm_payment',
                        language: {
                            code: 'en_US',
                        },
                        components: [
                            {
                                type: 'header',
                                parameters: paramHeader,
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
        }
        return promiseResolve(resDataVekin);
    } catch (err) {
        return promiseReject(err);
    }
};
const paymentSuccess = async (data) => {
    try {
        const phone = data?.phone || '84902103222';
        const imagePaymentSuccess = data?.imagePaymentSuccess
         || 'https://cdn.prod.website-files.com/64f417aa4ab67502c724d8c5/6503dfb8fab9f0c7a354aff6_LOGO_CERO_TEXT.png';

        const template = {
            messaging_product: 'whatsapp',
            to: phone,
            recipient_type: 'individual',
            type: 'image',
            image: {
                link: imagePaymentSuccess,
            },
        };
        const resData = await WhatsappHelper.sendMessage(template);
        const paramEvent = {
            event_id: data.eventId,
            total_offset: data.eventEmissionValue,
        };
        await DataVekinHelper.eventOffset(paramEvent);
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

const paymentFailure = async (data) => {
    try {
        const phone = data?.phone || '84902103222';
        const name = data?.name || null;
        const title = data?.title;
        const date = data?.date;
        const eventName = data?.eventName;
        const eventLocation = data?.eventLocation;
        const eventEmissionValue = data?.eventEmissionValue;
        const eventEmissionUnit = data?.eventEmissionUnit;
        const eventCarbonSavedValue = data?.eventCarbonSavedValue;
        const eventCarbonSavedUnit = data?.eventCarbonSavedUnit;
        const blockchain = data?.blockchain;
        const refNumber = data?.refNumber;
        const verifiedBy = data?.verifiedBy;
        const eventId = data?.eventId;
        const currency = data.currency;
        const unitAmount = data.unitAmount;
        const eventImage = data.eventImage;
        const paramBody = [
            {
                type: 'text',
                text: title,
            },
            {
                type: 'text',
                text: date,
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
                text: eventEmissionValue + eventEmissionUnit,
            },
            {
                type: 'text',
                text: eventCarbonSavedValue + eventCarbonSavedUnit,
            },
            {
                type: 'text',
                text: `${unitAmount} ${currency}`,
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
            unitAmount,
            blockchain,
            phone,
            name,
            eventEmissionValue,
            eventEmissionUnit,
            currency,
            title,
            date,
            eventName,
            eventLocation,
            eventCarbonSavedValue,
            eventCarbonSavedUnit,
            verifiedBy,
            refNumber,
            eventImage,
            eventId,
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
                name: 'payment_failure',
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
                name: 'maybe_later',
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


module.exports = {
    joinNow,
    listEvent,
    ecoTravel,
    selectDistance,
    fillAddress,
    paymentConfirmation,
    paymentSuccess,
    paymentFailure,
    completed,
    checkCountry,
};
