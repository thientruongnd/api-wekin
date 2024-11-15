/**
 * Created by Truong on 10/08/23.
 * truongdx@runsystem.net - Xuan Truong
 * Function Name
 * */
const util = require('util');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const { configEvn } = require('../configs/configEnvSchema');

const {
    isEmpty,
    getYearToday,
    getMonthToday,
    getDayToday,
    makeDir,
    downloadImage,

} = require('../utils/shared');

class DataVekinHelper {
    eventCarbonReceipt = async (data) => {
        const uri = `${configEvn.BASE_URL_VEKIN}/api/event/carbon-receipt`;
        const config = {
            method: 'get',
            url: uri,
            headers: {
                Authorization: `${configEvn.AUTHORIZATION_VEKIN}`,
            },
        };
        const result = await axios(config);
        return result?.data;
    }

    transportationList = async (data) => {
        let uri = `${configEvn.BASE_URL_VEKIN}/api/event/dashboard/controller/transportation-list/`;
        uri = data?.uri ? `${configEvn.BASE_URL_VEKIN}/${data.uri}` : uri;
        // console.log('this log uri: ', uri);
        const config = {
            method: 'get',
            url: uri,
            headers: {
                Authorization: `${configEvn.AUTHORIZATION_VEKIN}`,
            },
        };
        const result = await axios(config);
        return result?.data;
    }

    eventLocations = async () => {
        const uri = `${configEvn.BASE_URL_VEKIN}/api/event/locations/`;
        const config = {
            method: 'get',
            url: uri,
            headers: {
                Authorization: `${configEvn.AUTHORIZATION_VEKIN}`,
            },
        };
        const result = await axios(config);
        return result?.data;
    }

    eventCarbonReceiptPartner = async (data) => {
        const uri = `${configEvn.BASE_URL_VEKIN}/api/event/carbon-receipt/controller/partner/`;
        const config = {
            method: 'post',
            url: uri,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${configEvn.AUTHORIZATION_VEKIN}`,
            },
            data: JSON.stringify(data),
        };
        const result = await axios(config);
        return result?.data;
    }

    eventOffset = async (data) => {
        const uri = `${configEvn.BASE_URL_VEKIN}/api/event/carbon-receipt/event/offset/`;
        const config = {
            method: 'post',
            url: uri,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${configEvn.AUTHORIZATION_VEKIN}`,
            },
            data: JSON.stringify(data),
        };
        const result = await axios(config);
        return result?.data;
    }
}
module.exports = new DataVekinHelper();
