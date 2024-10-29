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
const { countries: dataCountries } = require('../utils/dataSample/data.countries');
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
/**
 * selectDistance
 * */
const selectDistance = async (data) => {
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
        const countryName = data?.countryName || '2_United_Arab_Emirates';
        const customerName = data?.customerName;
        const eventId = data?.eventId || 230;
        const phone = data?.phone || '84902103222';
        const myLatitude = data?.latitude || '20.4458553';
        const myLongitude = data?.longitude || '106.1173998';
        const infoCountry = await getCountry(countryName);
        const latitudeFrom = infoCountry?.latitude || '13.7379374';
        const longitudeFrom = infoCountry?.longitude || '100.5239999';
        // const myCountry = await getCountryFromCoordinates(myLatitude, myLongitude);
        // const countryFrom = await getCountryFromCoordinates(latitudeFrom, longitudeFrom);
        const locationFrom = {};
        const userDetails = {};
        userDetails.name = customerName;
        userDetails.phone = phone;
        // if (myCountry.country_code !== countryFrom.country_code) {
        if ('nd' !== 'na') {
        // select different country
            locationFrom.code = infoCountry?.country;
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
                    const encodedToken = Base64.encode(JSON.stringify(flowToken));
                    element.id = encodedToken;
                    element.title = emissionList[i].name;
                    // Gán lại giá trị sau khi cắt chuỗi
                    element.title = element.title.substring(0, 24);
                    // element.description = nearestLocations[i].event_code;
                    // // Kiểm tra số lượng phần tử trong rows
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
                                text: 'Transportation',
                            },
                            body: {
                                text: 'The amount of CO2 emission is different depended on the type of your transportation.\n'
                            + 'Please select the transportation for offset receipt .\n',
                            },
                            action: {
                                button: 'Transportation',
                                sections: [
                                    {
                                        title: 'Options',
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
        }

        return promiseResolve(data);
    } catch (err) {
        return promiseReject(err);
    }
};
const paymentSuccess = async (data) => {
    try {
        const phone = data?.phone || '84902103222';
        const eventEmissionValue = data?.eventEmissionValue || null;
        const eventEmissionUnit = data?.eventEmissionUnit || null;
        const unitAmount = data?.unitAmount || '0';
        const currency = data?.currency || '$';
        const eventImage = data?.eventImage || 'https://cdn.prod.website-files.com/64f417aa4ab67502c724d8c5/6503dfb8fab9f0c7a354aff6_LOGO_CERO_TEXT.png';
        const template = {
            messaging_product: 'whatsapp',
            to: phone,
            type: 'template',
            template: {
                name: 'payment_successful',
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
                                    link: eventImage,
                                },
                            },
                        ],
                    },
                    {
                        type: 'body',
                        parameters: [
                            {
                                type: 'text',
                                text: eventEmissionValue + eventEmissionUnit,
                            },
                            {
                                type: 'text',
                                text: unitAmount + currency,
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

const paymentFailure = async (data) => {
    try {
        const phone = data?.phone || '84902103222';
        const name = data?.name || 'Xuân Trường';
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

const paymentConfirmation = async (data) => {
    try {
        const resData = await DataVekinHelper.transportationList();
        if (isEmpty(resData)) return false;
        const emissionId = data?.id;
        const emissionList = resData?.emission_list || [];
        const transportation = emissionList.find((emission) => emission.id === emissionId);
        const countryCode = data?.lf?.code;
        const locationFrom = dataCountries.find((country) => country.country === countryCode);
        const customerName = data?.uds?.name;
        const phone = data?.uds?.phone || '84902103222';
        const eventId = data?.eid;
        const eventCarbonReceipt = {};
        eventCarbonReceipt.transportation = transportation;
        eventCarbonReceipt.location_from = {
            id: 111,
            name: locationFrom.name,
            lat: locationFrom.latitude,
            long: locationFrom.longitude,
        };
        eventCarbonReceipt.user_details = {
            name: customerName,
            phone_number: phone,
        };
        eventCarbonReceipt.event_id = eventId;
        const resDataVekin = await DataVekinHelper.eventCarbonReceiptPartner(eventCarbonReceipt);
        if (resDataVekin?.receipt) {
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
            const currency = 'thb';
            const formattedDate = moment(date).format('DD MMMM YYYY HH:mm');
            const amount = calculateCost(eventEmission.value);
            const fileName = getRandomFileName('png');
            const outputPath = path.join(__dirname, '../public/images', fileName);
            // await downloadImage(receipt?.event_image, outputPath);
            // const eventImage = getImageLink(data.host, `/images/${fileName}`);
            const eventImage = 'https://cdn.prod.website-files.com/64f417aa4ab67502c724d8c5/6503dfb8fab9f0c7a354aff6_LOGO_CERO_TEXT.png';
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
    ecoTravel,
    selectDistance,
    selectRegion,
    selectCountry,
    paymentConfirmation,
    paymentSuccess,
    paymentFailure,
    completed,
    checkCountry,
};
