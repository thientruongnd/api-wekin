/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
const util = require('util');
const { Base64 } = require('js-base64');
const WhatsappService = require('../services/WhatsappService');
const WhatsappHelper = require('../helpers/WhatsappHelper');

const verifyTokenApp = process.env.VERIFY_TOKEN;// prasath_token

module.exports.API = {

    /**
     * signOut
     * @param {any} req request
     * @param {any} res response
     * @param {any} next next
     */
    getWebhook: async (req, res) => {
        const mode = req.query['hub.mode'];
        const token = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];
        // Kiểm tra nếu mode và token tồn tại trong request
        if (mode && token) {
            // Xác minh token
            if (mode === 'subscribe' && token === verifyTokenApp) {
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
        const params = {};
        let typeMessage = ''; let phone = ''; let fullName = ''; let eventId;
        if (body.object === 'whatsapp_business_account') {
            body.entry.forEach((entry) => {
                const changes = entry.changes;
                changes.forEach((change) => {
                    const messageData = change.value.messages;
                    const contacts = change.value.contacts;
                    if (contacts) {
                        contacts.forEach((contact) => {
                            fullName = contact.profile.name;
                        });
                    }
                    if (messageData) {
                        messageData.forEach((message) => {
                        // Xử lý tin nhắn từ người dùng tại đây
                            console.log('Message:', message);
                            const text = message?.text?.body;
                            const type = message?.type;
                            const payload = message?.button?.payload;
                            console.log('this log payload: ', payload);
                            const typeInteractive = message?.interactive?.type; // list_reply
                            phone = message?.from;
                            params.phone = phone;
                            if (type === 'text' && text === 'Starting conversation' || text === 'joinNow' || text === 'ok') {
                                typeMessage = 'joinNow';
                            }
                            if (type === 'button') {
                                const decodedToken = JSON.parse(Base64.decode(payload));
                                typeMessage = decodedToken?.type;
                                params.latitude = decodedToken?.latitude;
                                params.longitude = decodedToken?.longitude;
                                params.eventId = decodedToken?.eventId;
                            }
                            if (type === 'location') {
                                typeMessage = type;
                                params.latitude = message?.location?.latitude;
                                params.longitude = message?.location?.longitude;
                            }
                            if (type === 'interactive' && typeInteractive === 'list_reply') {
                                const id = message?.interactive?.list_reply?.id;
                                const decodedToken = JSON.parse(Base64.decode(id));
                                console.log('this log  list_reply decodedToken', decodedToken);
                                eventId = decodedToken?.eventId;
                                typeMessage = decodedToken?.type;
                                params.latitude = decodedToken?.latitude;
                                params.longitude = decodedToken?.longitude;
                                params.eventId = eventId;
                                params.id = decodedToken.id;
                                params.lf = decodedToken.lf;
                                params.uds = decodedToken.uds;
                                params.eid = decodedToken.eid;
                                params.eid = decodedToken.eid;
                            }
                            if (type === 'interactive' && typeInteractive === 'nfm_reply') {
                                const nfmReply = message?.interactive?.nfm_reply;
                                const responseJson = JSON.parse(nfmReply?.response_json);
                                const decodedToken = JSON.parse(Base64.decode(responseJson?.flow_token));
                                typeMessage = decodedToken?.type;
                                console.log('this log decodedToken', decodedToken);
                                if (typeMessage === 'region') {
                                    const customerName = responseJson?.screen_0_TextInput_0;
                                    const regionName = responseJson?.screen_0_Dropdown_1;
                                    params.regionName = regionName;
                                    params.customerName = customerName;
                                }
                                if (typeMessage === 'country') {
                                    params.countryName = responseJson?.screen_0_Dropdown_0;
                                    params.customerName = decodedToken.customerName;
                                }
                                eventId = decodedToken?.eventId;
                                params.latitude = decodedToken?.latitude;
                                params.longitude = decodedToken?.longitude;
                                params.eventId = decodedToken?.eventId;
                            }
                        });
                    }
                });
            });
            params.phone = phone;
            params.name = fullName;
            console.log('typeMessage: ', typeMessage);
            if (typeMessage === 'joinNow') {
                console.log('joinNow=============================================');
                params.imageId = '439102592147175';
                await WhatsappService.joinNow(params);
            }
            if (typeMessage === 'join_now_payload') {
                console.log('join_now_payload======================================');
                await WhatsappHelper.sendMessageLocation({ phone });
            }
            if (typeMessage === 'location') {
                console.log('location=======================selectEvent====================');
                const resData = await WhatsappService.listEvent(params);
                console.log(`location==========: ${ resData}`);
            }
            if (typeMessage === 'selectEvent') {
                const resData = await WhatsappService.ecoTravel(params);
                console.log('selectEvent============ecoTravel===========: ', resData);
            }
            if (typeMessage === 'sameCountry') {
                console.log('location====================sameCountry===================');
            }
            if (typeMessage === 'differentCountry') {
                const resData = await WhatsappService.selectRegion(params);
                console.log('=differentCountry==============: ', resData);
            }
            if (typeMessage === 'region') {
                await WhatsappService.selectCountry(params);
            }
            if (typeMessage === 'country') {
                console.log('=Country=====show transf====: ', params);
                await WhatsappService.checkCountry(params);
            }
            if (typeMessage === 'receipt') {
                console.log('=receipt=====show transf====: ', params);
                await WhatsappService.paymentConfirmation(params);
            }
            // Trả về 200 OK để xác nhận đã nhận thông báo
            res.status(200).send('EVENT_RECEIVED');
        } else {
            res.status(404).send('Not Found');
        }
    },
};
