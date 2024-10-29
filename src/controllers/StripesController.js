/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
const util = require('util');
const { configEvn } = require('../configs/configEnvSchema');
// eslint-disable-next-line import/order
const stripe = require('stripe')(configEvn.KEY_STRIPE);
const WhatsappService = require('../services/WhatsappService');
const {
    responseSuccess,
    resJsonError,
    getImageLink,
} = require('../utils/shared');

module.exports.DEFAULT = {
    createCheckoutSession: async (req, res) => {
        const productName = req.query?.productName;
        const unitAmount = parseInt(req.query?.unitAmount, 10);
        const image = getImageLink(req.headers.host, '/images/logo_cero.png');
        const eventImage = req.query?.eventImage || image;
        try {
            const metadata = { ...req.query, eventImage };
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'thb', // Đơn vị tiền tệ (có thể thay đổi theo nhu cầu của bạn)
                            product_data: {
                                name: metadata?.eventName || productName, // Tên sản phẩm
                            },
                            unit_amount: Math.round(unitAmount * 100), // Số tiền bạn muốn truyền vào (5000 là 50.00 USD)
                        },
                        quantity: 1,
                    },
                ],
                phone_number_collection: {
                    enabled: true,
                },
                metadata,
                payment_intent_data: {
                    metadata,
                },
                mode: 'payment', // Thay vì subscription
                success_url: `https://wa.me/${configEvn.PHONE_WHATSAPP}`,
                cancel_url: `https://wa.me/${configEvn.PHONE_WHATSAPP}`,
            });
            res.redirect(303, session.url);
        } catch (errors) {
            return resJsonError(res, errors);
        }
        // return res.json(responseSuccess(10261, resData, 'en'));
    },
    webhook: async (req, res) => {
        const body = req.body;
        try {
            if (body?.type === 'checkout.session.completed') {
                console.log('--------checkout.session.completed-----');
                const sessionId = body?.data?.object?.id;
                const amountTotal = body?.data?.object?.amount_total;
                const currency = body?.data?.object?.currency;
                const customer = body?.data?.object?.customer_details;
                const paymentIntentId = body?.data?.object?.payment_intent;
                const metadata = body?.data?.object.metadata;
                const paymentStatus = body?.data?.object.payment_status;
                console.log('sessionId', sessionId);
                console.log('customer', customer);
                console.log('amountTotal', amountTotal);
                console.log('currency', currency);
                console.log('paymentIntentId', paymentIntentId);
                console.log('payment_status', paymentStatus);
                console.log('metadata', metadata);
                if (paymentStatus === 'paid') {
                    const params = body?.data?.object?.metadata;
                    const resData = await WhatsappService.paymentSuccess(params);
                    console.log(util.inspect(resData, false, null, true));
                }
            }
            if (body?.type === 'checkout.session.expired') {
                console.log('--------START checkout.session.expired-----');
                console.log(body);
                console.log('--------END checkout.session.expired-----');
            }
            if (body?.type === 'payment_intent.canceled') {
                console.log('-------- START payment_intent.canceled-----');
                console.log(body);
                const params = body?.data?.object?.metadata;
                const resData = await WhatsappService.completed(params);
                console.log(util.inspect(resData, false, null, true));
                console.log('--------END payment_intent.canceled-----');
            }
            if (body?.type === 'payment_intent.payment_failed') {
                console.log('-------- START payment_intent.payment_failed-----');
                console.log(body);
                const params = body?.data?.object?.metadata;
                const resData = await WhatsappService.paymentFailure(params);
                console.log(util.inspect(resData, false, null, true));
                console.log('--------END payment_intent.payment_failed-----');
            }
            if (body?.type === 'payment_intent.partially_funded') {
                console.log('-------- START payment_intent.partially_funded-----');
                console.log(body);
                console.log('--------END payment_intent.partially_funded-----');
            }

            res.status(200).send('EVENT_RECEIVED');
        } catch (errors) {
            console.log(util.inspect(errors, false, null, true));
            res.status(404).send('Not Found');
        }
        // return res.json(responseSuccess(10261, resData, 'en'));
    },
    info: async (req, res) => {
        try {
            // const sessionId = 'cs_test_a1fmJD4JxnJciLU49x6f2rtKjChqKBRdJpnjJfy0ZL94ql0EfWN7ajS9Cd'
            const sessionId = req.query.sessionId;
            const infoSession = await stripe.checkout.sessions.retrieve(sessionId, {
                expand: ['line_items', 'payment_intent'],
            });
            return res.json(responseSuccess(10261, infoSession, 'en'));
        } catch (errors) {
            return resJsonError(res, errors);
        }
    },
    infoPaymentIntent: async (req, res) => {
        try {
            const paymentIntentId = req.query.paymentIntentId;
            const infoPaymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
            return res.json(responseSuccess(10261, infoPaymentIntent, 'en'));
        } catch (errors) {
            return resJsonError(res, errors);
        }
    },
};
