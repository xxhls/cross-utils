import Taro, { getEnv, ENV_TYPE } from '@tarojs/taro';

/**
 * @name multi-platform
 * @description 多端判断工具
 * @author heyongqi10 <heyongqi10@jd.com>
 */
const _env = getEnv();
// 微信小程序环境
_env === ENV_TYPE.WEAPP;
// 百度小程序环境
_env === ENV_TYPE.SWAN;
// 支付宝小程序环境
_env === ENV_TYPE.ALIPAY;
// 抖音小程序环境
_env === ENV_TYPE.TT;
// QQ小程序环境
_env === ENV_TYPE.QQ;
// 京东小程序环境
_env === ENV_TYPE.JD;
// 鸿蒙混合环境
_env === ENV_TYPE.HARMONYHYBRID;
// RN环境
_env === ENV_TYPE.RN;
// Web环境
const isWeb = _env === ENV_TYPE.WEB;
const isH5 = isWeb;

// 同步获取cookie
const get$1 = (name) => {
    const allCookies = document.cookie;
    let cookieValue = '';
    if (allCookies) {
        const cookiesArray = allCookies.split('; '); // 分割所有的cookie
        cookiesArray.forEach(cookie => {
            const [key, value] = cookie.split('='); // 分割键和值
            if (key == name) {
                cookieValue = value;
            }
        });
    }
    return cookieValue;
};
/**
* 设置cookie
* @param name cookie-name
* @param value  cookie - value
* @param daysToLive  cookie - 超时时间
*/
const set$1 = (name, value, daysToLive) => {
    var cookie = name + "=" + encodeURIComponent(value);
    if (typeof daysToLive === "number") {
        cookie += "; max-age=" + (daysToLive * 24 * 60 * 60); // max-age单位是秒
    }
    document.cookie = cookie;
};
/**
* 删除cookie
* @param name cookie-name
* @param value  cookie - value
* @param daysToLive  cookie - 超时时间
*/
const del$1 = (name) => {
    set$1(name, "", -1); // 设置为过去的时间即可删除
};
const getAll$1 = async () => {
    const cookies = {};
    document.cookie?.split(";").forEach((item) => {
        const [key, value] = item.split("=");
        cookies[key?.trim()] = value?.trim() || "";
    });
    return cookies;
};
const cookie$3 = {
    get: get$1,
    set: set$1,
    del: del$1,
    getAll: getAll$1
};

/** @format */
// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-commonjs
// const { set: setCookie } = process.argv.includes("--blended") ? require("@base/cookie") : { set: null };
// 获取具体 - cookie值
const getValue = (name, _expire, _data) => {
    if (!_data) {
        throw new Error('cookies not exist');
    }
    if (_expire <= Date.now()) {
        throw new Error('cookies expire');
    }
    if (!(name in _data)) {
        throw new Error(`cookies["${name}"] not exists`);
    }
    const data = _data[name];
    if (data.expires !== 'session' && new Date(data.expires) <= new Date()) {
        throw new Error(`cookies["${name}"] expire`);
    }
    return data.value;
};
// cookie - get 操作的是同步存储
const get = async (name) => {
    let val = '';
    try {
        const { _expire, _data } = Taro.getStorageSync('cookies') || {};
        val = getValue(name, _expire, _data) || '';
    }
    catch (error) {
        // console.warn('getSyncCookieError', error);
    }
    return val;
};
// cookie - set 操作的是同步存储
const set = async (name, value) => {
    const item = {
        name,
        value,
        expires: new Date(Date.now() + 1000 * 3600 * 24 * 365).toUTCString(),
    };
    try {
        let { _data } = Taro.getStorageSync('cookies') || {};
        // 如果清空了storage，_data会是undefined，拿空对象做兜底
        if (!_data) {
            _data = {};
        }
        _data[name] = item;
        Taro.setStorageSync('cookies', { _data, _expire: 9876543210 * 1000 });
    }
    catch (error) {
        // console.warn('setSyncCookieError', error)
    }
};
// cookie - del 删除cookie
const del = async (name) => {
    const item = null;
    try {
        let { _data } = Taro.getStorageSync('cookies') || {};
        // 如果清空了storage，_data会是undefined，拿空对象做兜底
        if (!_data) {
            _data = {};
        }
        _data[name] = item;
        Taro.setStorageSync('cookies', { _data, _expire: 9876543210 * 1000 });
    }
    catch (error) {
        // console.warn('setSyncCookieError', error)
    }
};
// cookie - getAll 操作的是异步
const getAll = async () => {
    const { data: { _expire, _data }, } = await Taro.getStorage({ key: 'cookiesAll' });
    if (_expire <= Date.now()) {
        throw new Error('cookies expire');
    }
    const data = {};
    for (const key in _data) {
        const value = _data[key];
        if (value.expires === 'session' || new Date(value.expires) > new Date()) {
            data[key] = value.value;
        }
    }
    return data;
};
const cookie$2 = {
    set,
    get,
    del,
    getAll
};

let cookie = undefined;
if (isH5) {
    cookie = cookie$3;
}
else {
    cookie = cookie$2;
}
var cookie$1 = cookie;

export { cookie$1 as default };
