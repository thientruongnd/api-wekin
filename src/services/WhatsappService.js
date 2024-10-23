/**
 * Mr : Dang Xuan Truong
 * Email: truongdx@runsystem.net
 * Common
 */
const util = require('util');
const WhatsappHelper = require('../helpers/WhatsappHelper');
const DataVekinHelper = require('../helpers/DataVekinHelper');

const {
    promiseReject,
    promiseResolve,
    isEmpty,
} = require('../utils/shared');

const message001 = async (data) => {
    try {
        const phone = data?.phone || '84902103222';
        const name = data?.name || 'Xuan Truong';
        const imageId = data?.imageId || '439102592147175';
        const template = {
            messaging_product: 'whatsapp',
            to: phone,
            type: 'template',
            template: {
                name: 'ms001',
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
const message003 = async (data) => {
    try {
        const phone = data?.phone || '84902103222';
        const resDataVekin = await DataVekinHelper.eventCarbonReceipt();
        const rows = [];
        if (!isEmpty(resDataVekin)) {
            for (let i = 0; i < resDataVekin.length; i++) {
                const element = {};
                element.id = resDataVekin[i].id;
                element.title = resDataVekin[i].name;
                element.title.substring(0, 24);
                element.description = resDataVekin[i].event_code;
                if (rows.length < 10) {
                    rows.push(element);
                }
            }
        }
        const template = {
            messaging_product: 'whatsapp',
            to: phone,
            type: 'interactive',
            interactive: {
                type: 'list',
                header: {
                    type: 'text',
                    text: 'Choose an Event:',
                },
                body: {
                    text: 'Here’s a curated list of Sustainable Events,\n'
                        + 'brought to you by Vekin Group and our trusted eco-partners.\n'
                        + 'Join us in making a positive impact on the environment\n'
                        + 'by attending these events! Please choose an event.',
                },

                action: {
                    button: 'Select',
                    sections: [
                        {
                            title: 'Section',
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
            return promiseResolve(response);
        }
        return promiseResolve(resDataVekin);
    } catch (err) {
        return promiseReject(err);
    }
};
module.exports = {
    message001,
    message003,
};
