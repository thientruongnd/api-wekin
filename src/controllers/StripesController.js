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
                line_items: [
                    {
                        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                        price: 'price_1QCaA52LB1xmFw9BEm1AYzfc',
                        quantity: 1,
                    },
                ],
                phone_number_collection: {
                    enabled: true,
                },
                mode: 'subscription', // payment
                success_url: `${YOUR_DOMAIN}/success.html`,
                cancel_url: `${YOUR_DOMAIN}/cancel.html`,
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
        // checkout.session.completed
        // customer.subscription.created
        // payment_intent.succeeded //
        // invoice.create //
        // invoice.finalized //
        // invoice.updated //
        // invoice.paid
        // invoice.payment_succeeded
        const body = req.body;
        console.log('this log webhook stripe', body?.type);
        try {
            console.log(body);
            res.status(200).send('EVENT_RECEIVED');
        } catch (errors) {
            console.log(util.inspect(errors, false, null, true));
            res.status(404).send('Not Found');
        }
        // return res.json(responseSuccess(10261, resData, 'en'));
    },
};
