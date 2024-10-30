/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
const util = require('util');
const axios = require('axios');
const WhatsappHelper = require('../helpers/WhatsappHelper');
const DataVekinHelper = require('../helpers/DataVekinHelper');
const WhatsappService = require('../services/WhatsappService');

const {
    responseError,
    responseSuccess,
    resJsonError,
    convertTextToImage,
} = require('../utils/shared');

module.exports.DEFAULT = {
    index: async (req, res) => {
        res.status(200).send('Hello this is webhook setup by GMO');
    },
    joinNow: async (req, res) => {
        console.log('this log ');
        const params = {};
        params.phone = req.body.phone || '84902103222';
        params.name = 'Xuan Truong';
        params.imageId = '439102592147175';
        const resData = await WhatsappService.joinNow(params);
        console.log(util.inspect(resData, false, null, true));
        return res.json(responseSuccess(10261, resData, 'en'));
    },
    sendMessageLocation: async (req, res) => {
        const resData = await WhatsappHelper.sendMessageLocation({ phone: '84987662808' });

        return res.json(responseSuccess(10261, resData, 'en'));
    },
    eventCarbonReceipt: async (req, res) => {
        const phone = '84902103222';
        const resData = await WhatsappService.listEvent(req.body);

        return res.json(responseSuccess(10261, resData, 'en'));
    },
    transportationList: async (req, res) => {
        const resData = await DataVekinHelper.transportationList();
        return res.json(responseSuccess(10261, resData, 'en'));
    },
    eventLocations: async (req, res) => {
        console.log('this log eventLocations');
        const resData = await DataVekinHelper.eventLocations();
        const countries = [];
        for (const elm of resData) {
            const element = {};
            element.country = elm.country;
            countries.push(element);
        }
        console.log('countries', countries.length);
        return res.json(responseSuccess(10261, countries, 'en'));
    },

    eventCarbonReceiptPartner: async (req, res) => {
        const host = req.headers.host;
        const data = req.body;
        data.host = host;
        const resData = await WhatsappService.paymentConfirmation(data);
        return res.json(responseSuccess(10261, resData, 'en'));
    },

    paymentSuccess: async (req, res) => {
        const params = {};
        params.phone = '84974418454';
        params.eventEmissionValue = 2629.943;
        params.eventEmissionUnit = 'kg co2e';
        params.eventImage = 'https://cdn.prod.website-files.com/64f417aa4ab67502c724d8c5/6503dfb8fab9f0c7a354aff6_LOGO_CERO_TEXT.png';
        params.unitAmount = 2629.943;
        params.currency = 'thb';
        params.eventId = 230;
        const resData = await WhatsappService.paymentSuccess(params);
        return res.json(responseSuccess(10261, resData, 'en'));
    },
    paymentFailure: async (req, res) => {
        const params = {
            phone: req.body.phone || '84974418454',
            title: 'carbon receipt',
            plantImage: 'https://cdn.prod.website-files.com/64f417aa4ab67502c724d8c5/6503dfb8fab9f0c7a354aff6_LOGO_CERO_TEXT.png',
            date: '08 August 2024 20:22',
            eventName: 'Thailand green2026',
            eventImage: 'https://cdn.prod.website-files.com/64f417aa4ab67502c724d8c5/6503dfb8fab9f0c7a354aff6_LOGO_CERO_TEXT.png',
            eventLocation: 'JOHN PARK building',
            eventEmissionValue: 2629.943,
            eventEmissionUnit: 'kg co2e',
            eventCarbonSavedValue: 0,
            eventCarbonSavedUnit: 'kg co2e',
            blockchain: '4HNwtpG6Nvv6ahtsaP54ghPses7YZo7AEse2Wr52hLgzfNSAAgmxPb4por618WMCdZjKe1uriNgRaYrdtGCawHvh',
            refNumber: 'ASG16A7',
            verifiedBy: 'TGO CFO Standard',
            eventId: 230,
            unitAmount: 2629.943,
            currency: '$',
            host: req.headers.host,
        };
        const resData = await WhatsappService.paymentFailure(params);
        return res.json(responseSuccess(10261, resData, 'en'));
    },
    selectRegion: async (req, res) => {
        const params = {};
        params.phone = req.body.phone || '84974418454';
        const resData = await WhatsappService.selectRegion(params);
        return res.json(responseSuccess(10261, resData, 'en'));
    },
    selectCountry: async (req, res) => {
        // const regionName = '2_South-central_Asia';
        // const templateName = convertTemplateName(regionName);
        // const findCountry = getCountry('2_United_Arab_Emirates');
        // console.log(util.inspect(findCountry, false, null, true));
        const params = {};
        params.phone = req.body.phone || '84974418454';
        // params.templateName = templateName;
        // params.flowToken = 'country';
        // console.log(util.inspect(params, false, null, true));
        const resData = await WhatsappService.selectCountry(params);
        return res.json(responseSuccess(10261, resData, 'en'));
    },
    completed: async (req, res) => {
        const params = {};
        params.phone = req.body.phone || '84974418454';
        const resData = await WhatsappService.completed(params);
        return res.json(responseSuccess(10261, resData, 'en'));
    },
    ecoTravel: async (req, res) => {
        const resData = await WhatsappService.ecoTravel(req.body);
        return res.json(responseSuccess(10261, resData, 'en'));
    },
    selectDistance: async (req, res) => {
        const resData = await WhatsappService.selectDistance();
        return res.json(responseSuccess(10261, resData, 'en'));
    },
    checkCountry: async (req, res) => {
        const resData = await WhatsappService.checkCountry();
        return res.json(responseSuccess(10261, resData, 'en'));
    },
    eventOffset: async (req, res) => {
        const resData = await DataVekinHelper.eventOffset(req.body);
        return res.json(responseSuccess(10261, resData, 'en'));
    },
    textToImage: async (req, res) => {
        const resData = await convertTextToImage(req.body);
        return res.json(responseSuccess(10261, resData, 'en'));
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
