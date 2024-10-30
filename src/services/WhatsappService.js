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
    convertTextToImage,
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
                    text: 'Welcome to CERO!\n\n'
                    + `Hi ${name}!\n\n`
                    + 'We’re thrilled to have you here at CERO, where we focus on creating sustainable, eco-friendly events and experiences.\n\n'
                    + 'Would you like to join our exclusive Sustainable Events Community?\n\n'
                    + 'You’ll receive updates on upcoming events, tips for greener living, and opportunities to make a difference!',
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
        const phone = data?.phone || '84987662808';
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
        const template2 = {
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
        const resData = await WhatsappHelper.sendMessage(template2);
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
            lat: latitude, long: longitude, eventId, d: 3, type: 'distance',
        };
        const flow5Token = {
            lat: latitude, long: longitude, eventId, d: 5, type: 'distance',
        };
        const flow10Token = {
            lat: latitude, long: longitude, eventId, d: 10, type: 'distance',
        };
        const flow15Token = {
            lat: latitude, long: longitude, eventId, d: 15, type: 'distance',
        };
        const flow20Token = {
            lat: latitude, long: longitude, eventId, d: 20, type: 'distance',
        };
        const rows = [
            {
                id: await Base64.encode(JSON.stringify(flow1Token)),
                title: 'Less than 5 km',
            },
            {
                id: await Base64.encode(JSON.stringify(flow5Token)),
                title: '5-10 km',
            },
            {
                id: await Base64.encode(JSON.stringify(flow10Token)),
                title: '10-15 km',
            },
            {
                id: await Base64.encode(JSON.stringify(flow15Token)),
                title: '15-20 km',
            },
            {
                id: await Base64.encode(JSON.stringify(flow20Token)),
                title: 'More than 20 km',
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
                    text: 'How far did you travel to attend the event?\n',
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
        const resData = await WhatsappHelper.sendMessage(template);
        const response = {};
        if (resData?.status && resData?.status !== 200) {
            response.status = resData.status;
            response.message = resData.message;
            response.code = resData.code;
            return response;
        }
        return true;
    } catch (err) {
        return err;
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
        return true;
    } catch (err) {
        return promiseReject(err);
    }
};
const checkCountry = async (data) => {
    try {
        const typeCountry = data?.typeCountry || 'differentCountry';
        const countryName = data?.countryName || '2_United_Arab_Emirates';
        const customerName = data?.customerName;
        const eventId = data?.eventId || 230;
        const distance = data?.distance || 0;
        const phone = data?.phone || '84902103222';
        const locationFrom = {};
        const userDetails = {};
        if (typeCountry === 'differentCountry') {
            const myLatitude = data?.latitude || '20.4458553';
            const myLongitude = data?.longitude || '106.1173998';
            const infoCountry = await getCountry(countryName);
            locationFrom.code = infoCountry?.country;
            const latitudeFrom = infoCountry?.latitude || '13.7379374';
            const longitudeFrom = infoCountry?.longitude || '100.5239999';
            userDetails.name = customerName;
            const myCountry = await getCountryFromCoordinates(myLatitude, myLongitude);
            const countryFrom = await getCountryFromCoordinates(latitudeFrom, longitudeFrom);
            if (myCountry?.country_code === countryFrom?.country_code) {
                return await selectDistance(data);
            }
        }
        userDetails.phone = phone;
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
                flowToken.typeCountry = typeCountry;
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
            recipient_type: 'individual',
            type: 'image',
            image: {
                link: eventImage,
                caption: 'Thank you for offsetting your carbon footprint of\n\n'
                  + `${`${eventEmissionValue } ${ eventEmissionUnit}`}\n\n`
                  + `${`${unitAmount } ${ currency}`}\n\n`,
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
        const customerName = data?.uds?.name;
        const phone = data?.uds?.phone || '84902103222';
        const typeCountry = data?.typeCountry || 'differentCountry';
        const distance = data?.lf?.d || 0;
        const eventId = data?.eid;
        const locationFrom = {};
        if (typeCountry === 'sameCountry') {
            const resDataEvent = await DataVekinHelper.eventCarbonReceipt();
            const event = resDataEvent.find((event) => event.id === eventId);
            locationFrom.name = event?.country;
            locationFrom.city = event?.city;
            locationFrom.lat = event?.latitude;
            locationFrom.long = event?.longitude;
            locationFrom.distance = distance;
        } else {
            const countryCode = data?.lf?.code;
            const country = dataCountries.find((country) => country.country === countryCode);
            locationFrom.name = country?.name;
            locationFrom.lat = country?.latitude;
            locationFrom.long = country?.longitude;
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
            const currency = 'thb';
            const formattedDate = moment(date).format('DD MMMM YYYY HH:mm');
            const amount = calculateCost(eventEmission.value);
            const eventImageUrl = receipt?.event_image;
            // const fileName = getRandomFileName('png');
            // const outputPath = path.join(__dirname, '../public/images', fileName);
            // await downloadImage(receipt?.event_image, outputPath);g
            // const eventImage = getImageLink(data.host, `/images/${fileName}`);
            // const eventImage = 'https://cdn.prod.website-files.com/64f417aa4ab67502c724d8c5/6503dfb8fab9f0c7a354aff6_LOGO_CERO_TEXT.png';

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
                eventImageUrl,
                eventId,
                host: 'https://api-wekin-5300daa06a95.herokuapp.com',
            };
            // host: 'https://api-wekin-5300daa06a95.herokuapp.com' || data.host,
            const eventImage = await convertTextToImage(params);
            if (eventImage) {
                // const eventImage = 'https://cdn.prod.website-files.com/64f417aa4ab67502c724d8c5/6503dfb8fab9f0c7a354aff6_LOGO_CERO_TEXT.png';
                console.log(eventImage);
                const paramHeader = [
                    {
                        type: 'image',
                        image: {
                            link: eventImage,
                        },
                    },
                ];
                params.eventImage = eventImage;
                const checkoutSessionURL = buildCheckoutSessionURL(baseURL, params);
                const paramButton = [
                    {
                        type: 'text',
                        text: checkoutSessionURL,
                    },
                ];
                console.log(checkoutSessionURL);
                const payloadParams = { type: 'maybe_later_payload' };
                const payloadEncode = Base64.encode(JSON.stringify(payloadParams));
                const template = {
                    messaging_product: 'whatsapp',
                    to: phone,
                    recipient_type: 'individual',
                    type: 'template',
                    template: {
                        name: 'confirm_payment',
                        language: {
                            code: 'en_US',
                        },
                        components: [
                            {
                                type: 'header',
                                parameters: paramHeader,
                            },
                            // {
                            //     type: 'body',
                            //     parameters: paramBody,
                            // },
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
