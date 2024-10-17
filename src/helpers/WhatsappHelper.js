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
class WhatsappHelper {
    sendMessage = async (data) => {
        const uri = `${configEvn.URI_WHATS_APP}/${configEvn.VERSION}/${configEvn.PHONE_NUMBER_ID}/messages`;
        const config = {
            method: 'post',
            url: uri,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${configEvn.TOKEN}`,
            },
            data,
        };
        const result = await axios(config);
        console.log(util.inspect(result?.data, false, null, true));
        return result?.data;
    }

    
}
module.exports = new WhatsappHelper();
