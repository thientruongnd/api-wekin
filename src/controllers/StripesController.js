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
                mode: 'payment', // Thay vì subscription
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
    webhook: async (req, res) => {
        console.log('this log webhook');
        try {
            console.log(util.inspect(req.body, false, null, true));
        } catch (errors) {
            console.log(util.inspect(errors, false, null, true));
            return resJsonError(res, errors);
        }
        // return res.json(responseSuccess(10261, resData, 'en'));
    },
};
