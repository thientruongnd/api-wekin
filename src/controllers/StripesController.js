/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
const util = require('util');
const moment = require('moment-timezone');
const { configEvn } = require('../configs/configEnvSchema');
// eslint-disable-next-line import/order
const stripe = require('stripe')(configEvn.KEY_STRIPE);
const {
    responseError,
    responseSuccess,
    isEmpty,
    resJsonError,
} = require('../utils/shared');

module.exports.DEFAULT = {

    createCheckoutSession: async (req, res) => {
        console.log('this log createCheckoutSessionStripe');
        try {
            const YOUR_DOMAIN = 'http://localhost:8900';
            const session = await stripe.checkout.sessions.create({
                // line_items: [
                //     {
                //         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                //         price: 'price_1QDIlM2LB1xmFw9BMl7Q7bQ8',//price_1QCaA52LB1xmFw9BEm1AYzfc
                //         quantity: 1,
                //     },
                // ],
                // mode: 'subscription',
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'usd', // Đơn vị tiền tệ (có thể thay đổi theo nhu cầu của bạn)
                            product_data: {
                                name: 'Custom Amount Product', // Tên sản phẩm
                            },
                            unit_amount: 5000, // Số tiền bạn muốn truyền vào (5000 là 50.00 USD)
                        },
                        quantity: 1,
                    },
                ],
                phone_number_collection: {
                    enabled: true,
                },
                metadata: {
                    order_id: '12345', // ID đơn hàng
                    secret_code: 'mysecretcode', // Mã bí mật
                },
                mode: 'payment', // Thay vì subscription
                success_url: `https://wa.me/${configEvn.PHONE_WHATSAPP}`,
                cancel_url: `https://wa.me/${configEvn.PHONE_WHATSAPP}`,
            });
            console.log(session.url);
            res.redirect(303, session.url);
        } catch (errors) {
            console.log(util.inspect(errors, false, null, true));
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
                const email = body?.data?.object?.customer_details?.email;
                const name = body?.data?.object?.customer_details?.name;
                const phone = body?.data?.object?.customer_details?.phone;
                const paymentIntentId = body?.data?.object?.payment_intent;
                const metadata = body?.data?.object.metadata;
                console.log('-------------------------DATA----------------------');
                console.log('sessionId', sessionId);
                console.log('email', email);
                console.log('name', name);
                console.log('phone', phone);
                console.log('amountTotal', amountTotal);
                console.log('currency', currency);
                console.log('paymentIntentId', paymentIntentId);
                console.log('metadata', metadata);
            }
            if (body?.type === 'checkout.session.expired') {
                console.log('--------START checkout.session.expired-----');
                console.log(body);
                console.log('--------END checkout.session.expired-----');
            }
            if (body?.type === 'payment_intent.canceled') {
                console.log('-------- START payment_intent.canceled-----');
                console.log(body);
                console.log('--------END payment_intent.canceled-----');
            }
            if (body?.type === 'payment_intent.payment_failed') {
                console.log('-------- START payment_intent.payment_failed-----');
                console.log(body);
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
