/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
 */
const util = require('util');
const axios = require('axios');
const https = require('https');
const { configEvn } = require('../configs/configEnvSchema');

const sendQueryToAPI = async (data) => {
    try {
        const uri = data.uri;
        const xAccessToken = data.token ? data.token : '';
        let result;
        if (xAccessToken) {
            const headerConfig = {
                headers: {
                    'x-access-token': xAccessToken,
                },
            };
            result = await axios.get(uri, headerConfig);
        } else {
            const headerConfig = {
                headers: {
                    withCredentials: true,
                    Cookie: data.cookie ? data.cookie : '',
                },
            };
            result = await axios.get(uri, headerConfig);
        }
        return Promise.resolve(result.data ? result.data : null);
    } catch (error) {
        return Promise.resolve({ error: true, msg: error });
    }
};
const axiosBodyToAPI = async (uri, params, type = null) => {
    try {
        const agent = new https.Agent({
            rejectUnauthorized: false,
        });
        const data = JSON.stringify(params);
        const config = {
            method: 'post',
            url: uri,
            headers: {
                'Content-Type': 'application/json',
                Cookie: params?.cookie,
            },
            data,
        };
        if (type === 'singleSignOn') {
            config.httpsAgent = agent;
        }
        const result = await axios(config);
        return Promise.resolve(result.data ? result.data : null);
    } catch (error) {
        return Promise.reject(error);
    }
};
const axiosBodyFormDataToAPI = async (uri, params) => {
    try {
        const config = {
            method: 'post',
            url: uri,
            data: params,
        };
        const result = await axios(config);
        return Promise.resolve(result.data ? result.data : null);
    } catch (error) {
        if (error?.response?.data) {
            return Promise.resolve(error?.response?.data ? error?.response?.data : null);
        }
        return Promise.reject(error);
    }
};
const sendHeaders = async (data) => {
    try {
        const uri = data.uri;
        const result = await axios.head(uri, { withCredentials: true });
        return Promise.resolve(result.data ? result.data : null);
    } catch (error) {
        return Promise.resolve({ error: true, msg: error });
    }
};

const googleTranslateApi = async (text, targetLang, sourceLang) => {
    try {
        const apiKey = configEvn?.GOOGLE_TRANSLATE_API_KEY || null;
        const uri = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

        const request = {
            q: text,
            target: targetLang,
            source: sourceLang,
            format: 'text',
        };

        const result = await axios.post(uri, request);
        const translatedText = result?.data?.data?.translations[0]?.translatedText || null;
        return Promise.resolve(translatedText);
    } catch (error) {
        return Promise.resolve({ error: true, msg: error });
    }
};
const axiosBodyChatGPT = async (uri, params) => {
    try {
        // const data = JSON.stringify(params);
        const config = {
            method: 'post',
            url: uri,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${configEvn.OPEN_API_KEY}`,
                organization: configEvn.ORGANIZATION_ID,
            },
            data: params,
        };
        const result = await axios(config);
        return Promise.resolve(result.data ? result.data : null);
    } catch (error) {
        // console.log(util.inspect(error, false, null, true));
        return Promise.reject(error);
    }
};
module.exports = {
    sendQueryToAPI,
    axiosBodyToAPI,
    sendHeaders,
    googleTranslateApi,
    axiosBodyChatGPT,
    axiosBodyFormDataToAPI,
};
