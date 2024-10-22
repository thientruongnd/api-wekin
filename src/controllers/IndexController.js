/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
const util = require('util');
const moment = require('moment-timezone');
const WhatsappHelper = require('../helpers/WhatsappHelper');
const DataVekinHelper = require('../helpers/DataVekinHelper');
// eslint-disable-next-line import/order
const stripe = require('stripe')('sk_test_51QCZlt2LB1xmFw9BPr6qfcYgp49uOLs5G1uhWCcnUHyDQb2L1UUVRB2sTXuPJVDiaiLbeu5TyE2piDEzEmzRxkbS00R2xVcFdu');
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
        console.log(util.inspect(req.body, false, null, true));
        const resData = await WhatsappHelper.sendMessage(req.body);
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
