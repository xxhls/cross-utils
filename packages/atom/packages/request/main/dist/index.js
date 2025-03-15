import axios from 'axios';

const envName = {
    isWeixinApp: 'WeixinApp',
    isAlipayApp: 'AlipayApp',
    isJDApp: 'JDApp',
    isDaojiaApp: 'DaojiaApp',
    isJDMiniApp: 'JDMiniApp',
    isJDLtApp: 'JDLtApp',
    isJDPinGou: 'JDPinGou',
    isDadaApp: 'DadaApp',
    isJDdinnovationApp: 'JDdinnovationApp',
    isJDHApp: 'JDHApp',
    isMobileQQ: 'MobileQQ',
    isSafari: 'Safari',
    isIOS: 'IOS',
    isAndroid: 'Android',
    isAliMiniProgram: "AliMiniProgram",
    isWeChatMiniProgram: "WeChatMiniProgram",
    isJdMiniProgram: "JDMiniProgram"
};

/**
 * 该文件为env库公共层
 */
/**
 * isWeb
 */
const isWeb = typeof window !== 'undefined' && 'onload' in window;
/**
 * isNode
 */
const isNode$1 = typeof process !== 'undefined' && !!(process.versions && process.versions.node);
/**
 * is支付宝小程序
 */
const isAliMiniProgram$1 = typeof my !== 'undefined' && my !== null && typeof my.alert !== 'undefined';
/**
 * is微信小程序
 */
const isWeChatMiniProgram$1 = typeof wx !== 'undefined' && wx !== null && (typeof wx.request !== 'undefined' || typeof wx.miniProgram !== 'undefined');
/**
 * is京东小程序
 */
const isJdMiniProgram$1 = typeof jd !== 'undefined';
/**
 * isRN
 */
function isReactNative() {
    const GLOBAL = typeof global !== 'undefined' ? global : window;
    return !!GLOBAL && !!GLOBAL.ReactNative && !!GLOBAL.ReactNative.NativeModules;
}
const isRN = isReactNative();
/**
 * qin统一环境变量
 */
const qin$1 = (isWeChatMiniProgram$1 && wx) || (isJdMiniProgram$1 && jd) || (isAliMiniProgram$1 && my) || (isWeb && window) || {};
/**
 * getEnv
 */
const getSystemName = (system) => {
    let result = null;
    Object.keys(system).forEach((env) => {
        if (system[env]) {
            result = env;
        }
    });
    return envName[result] || '';
};

/**
 * 获取设备UA
 */
const ua$2 = window.navigator.userAgent;
/**
 * 安卓设备
 */
const isAndroid$5 = /android/gi.test(ua$2);
const isHarmony = /harmony/gi.test(ua$2);
/**
 * IOS设备
 */
const isIOS$5 = /iPhone|iPad|iOS/gi.test(ua$2) && !isAndroid$5;
/**
 * 微信环境
 */
const isWeixinApp$2 = /MicroMessenger/gi.test(ua$2);
/**
 * 支付宝环境
 */
const isAlipayApp$2 = /AlipayClient/gi.test(ua$2);
/**
 * 京东环境
 */
const isJDApp$3 = /jdapp/gi.test(ua$2);
/**
 * 京东到家环境
 */
const isDaojiaApp$3 = /appName=jdLocal/gi.test(ua$2);
/**
 * 京小包APP
 */
const isJDMiniApp$2 = /jdltapp/gi.test(ua$2);
/**
 * 京东特价版本app
 */
const isJDLtApp$2 = /jdltapp/gi.test(ua$2);
/**
 * 京喜app
 */
const isJDPinGou$2 = /jdpingou/gi.test(ua$2);
/**
 * 达达app
 */
const isDadaApp$2 = /dada/gi.test(ua$2) && !/quickapp/gi.test(ua$2);
/**
 * 京东金融app
 */
const isJDdinnovationApp$2 = false;
/**
 * 京东健康app
 */
const isJDHApp$2 = false;
/**
 * QQapp
 */
const isMobileQQ$2 = /QQ\/([\d.]+)/gi.test(ua$2);
/**
 * Safari
 */
const isSafari$2 = /Safari/gi.test(ua$2);
// isAliMiniProgram,
// isWeChatMiniProgram,
// isJdMiniProgram,
/**
 * 微信小程序内嵌webview
 */
const isWeChatMiniProgram = (/miniProgram/gi.test(ua$2) && (/wechat/gi.test(ua$2) || /MicroMessenger/gi.test(ua$2)));
/**
 * 京东小程序内嵌webview
 */
const isJdMiniProgram = /(?:jdmp)/.test(ua$2.toLocaleLowerCase());
/**
 * 支付宝小程序内嵌webview
 */
const isAliMiniProgram = /AliApp/gi.test(ua$2);
/**
 * 获取端
 */
const getEnv$5 = () => {
    const os = {
        isAndroid: isAndroid$5,
        isIOS: isIOS$5
    };
    const host = {
        isWeixinApp: isWeixinApp$2,
        isAlipayApp: isAlipayApp$2,
        isJDApp: isJDApp$3,
        isDaojiaApp: isDaojiaApp$3,
        isJDMiniApp: isJDMiniApp$2,
        isJDLtApp: isJDLtApp$2,
        isJDPinGou: isJDPinGou$2,
        isDadaApp: isDadaApp$2,
        isMobileQQ: isMobileQQ$2,
        isSafari: isSafari$2,
        isJDdinnovationApp: isJDdinnovationApp$2,
        isJDHApp: isJDHApp$2,
    };
    const miniProgram = {
        isAliMiniProgram,
        isWeChatMiniProgram,
        isJdMiniProgram
    };
    return {
        os: getSystemName(os),
        host: getSystemName(host),
        miniProgram: getSystemName(miniProgram)
    };
};
var index_h5 = {
    ua: ua$2,
    isIOS: isIOS$5,
    isAndroid: isAndroid$5,
    isHarmony,
    isWeixinApp: isWeixinApp$2,
    isAlipayApp: isAlipayApp$2,
    isJDApp: isJDApp$3,
    isDaojiaApp: isDaojiaApp$3,
    isJDMiniApp: isJDMiniApp$2,
    isJDLtApp: isJDLtApp$2,
    isJDPinGou: isJDPinGou$2,
    isDadaApp: isDadaApp$2,
    isMobileQQ: isMobileQQ$2,
    isSafari: isSafari$2,
    isJDdinnovationApp: isJDdinnovationApp$2,
    isJDHApp: isJDHApp$2,
    isWeb,
    isNode: isNode$1,
    isAliMiniProgram,
    isWeChatMiniProgram,
    isJdMiniProgram,
    isRN,
    qin: qin$1,
    getEnv: getEnv$5
};

/**
 * 该文件为env库适配层
 */
/**
 * 获取设备UA
 */
const ua$1 = '';
/**
 * 微信浏览器环境
 */
const isWeixinApp$1 = false;
/**
 * 支付宝浏览器环境
 */
const isAlipayApp$1 = false;
/**
 * 京境app
 */
const isJDApp$2 = false;
/**
 * 京东到家app
 */
const isDaojiaApp$2 = false;
/**
 * 京小包APP
 */
const isJDMiniApp$1 = false;
/**
 * 京东特价版本app
 */
const isJDLtApp$1 = false;
/**
 * 京喜app
 */
const isJDPinGou$1 = false;
/**
 * 达达app
 */
const isDadaApp$1 = false;
/**
 * 京东金融app
 */
const isJDdinnovationApp$1 = false;
/**
 * 京东健康app
 */
const isJDHApp$1 = false;
/**
 * QQapp
 */
const isMobileQQ$1 = false;
/**
 * Safari
 */
const isSafari$1 = false;

const myEnv = isAliMiniProgram$1 && my.env.platform || '';
/**
 * IOS设备
 */
const isIOS$4 = myEnv.toLowerCase() === 'ios';
/**
 * 安卓设备
 */
const isAndroid$4 = myEnv.toLowerCase() === 'android';
/**
 * 获取端
 */
const getEnv$4 = () => {
    const os = {
        isAndroid: isAndroid$4,
        isIOS: isIOS$4
    };
    return {
        os: getSystemName(os),
        host: '',
        miniProgram: ''
    };
};
var index_alipay = {
    isIOS: isIOS$4,
    isAndroid: isAndroid$4,
    ua: ua$1,
    isWeixinApp: isWeixinApp$1,
    isAlipayApp: isAlipayApp$1,
    isJDApp: isJDApp$2,
    isDaojiaApp: isDaojiaApp$2,
    isJDMiniApp: isJDMiniApp$1,
    isJDLtApp: isJDLtApp$1,
    isJDPinGou: isJDPinGou$1,
    isDadaApp: isDadaApp$1,
    isMobileQQ: isMobileQQ$1,
    isSafari: isSafari$1,
    isJDdinnovationApp: isJDdinnovationApp$1,
    isJDHApp: isJDHApp$1,
    isWeb,
    isNode: isNode$1,
    isAliMiniProgram: isAliMiniProgram$1,
    isWeChatMiniProgram: isWeChatMiniProgram$1,
    isJdMiniProgram: isJdMiniProgram$1,
    isRN,
    qin: qin$1,
    getEnv: getEnv$4
};

const res$1 = isJdMiniProgram$1 && jd.getSystemInfoSync() || {};
/**
 * IOS设备
 */
const isIOS$3 = res$1.system && res$1.system.toLowerCase() === 'ios' || false;
/**
 * 安卓设备
 */
const isAndroid$3 = res$1.system && res$1.system.toLowerCase() === 'android' || false;
const isJDApp$1 = res$1.hostName === 'jdapp';
const isDaojiaApp$1 = res$1.hostName === 'daojia' || res$1.hostName === 'jddjApp';
/**
 * 获取端
 */
const getEnv$3 = () => {
    const os = {
        isAndroid: isAndroid$3,
        isIOS: isIOS$3
    };
    return {
        os: getSystemName(os),
        host: '',
        miniProgram: ''
    };
};
var index_jd = {
    isIOS: isIOS$3,
    isAndroid: isAndroid$3,
    ua: ua$1,
    isWeixinApp: isWeixinApp$1,
    isAlipayApp: isAlipayApp$1,
    isJDApp: isJDApp$1,
    isDaojiaApp: isDaojiaApp$1,
    isJDMiniApp: isJDMiniApp$1,
    isJDLtApp: isJDLtApp$1,
    isJDPinGou: isJDPinGou$1,
    isDadaApp: isDadaApp$1,
    isMobileQQ: isMobileQQ$1,
    isSafari: isSafari$1,
    isJDdinnovationApp: isJDdinnovationApp$1,
    isJDHApp: isJDHApp$1,
    isWeb,
    isNode: isNode$1,
    isAliMiniProgram: isAliMiniProgram$1,
    isWeChatMiniProgram: isWeChatMiniProgram$1,
    isJdMiniProgram: isJdMiniProgram$1,
    isRN,
    getEnv: getEnv$3,
    qin: qin$1
};

const res = isWeChatMiniProgram$1 && wx.getSystemInfoSync() || {};
const matches = res.system && res.system.match(/([^\s]+)/);
/**
 * IOS设备
 */
const isIOS$2 = matches ? matches[1].toLowerCase() === 'ios' : false;
/**
 * 安卓设备
 */
const isAndroid$2 = matches ? matches[1].toLowerCase() === 'android' : false;
/**
 * 获取端
 */
const getEnv$2 = () => {
    const os = {
        isAndroid: isAndroid$2,
        isIOS: isIOS$2
    };
    return {
        os: getSystemName(os),
        host: '',
        miniProgram: ''
    };
};
var index_weapp = {
    isIOS: isIOS$2,
    isAndroid: isAndroid$2,
    ua: ua$1,
    isWeixinApp: isWeixinApp$1,
    isAlipayApp: isAlipayApp$1,
    isJDApp: isJDApp$2,
    isDaojiaApp: isDaojiaApp$2,
    isJDMiniApp: isJDMiniApp$1,
    isJDLtApp: isJDLtApp$1,
    isJDPinGou: isJDPinGou$1,
    isDadaApp: isDadaApp$1,
    isMobileQQ: isMobileQQ$1,
    isSafari: isSafari$1,
    isJDdinnovationApp: isJDdinnovationApp$1,
    isJDHApp: isJDHApp$1,
    isWeb,
    isNode: isNode$1,
    isAliMiniProgram: isAliMiniProgram$1,
    isWeChatMiniProgram: isWeChatMiniProgram$1,
    isJdMiniProgram: isJdMiniProgram$1,
    isRN,
    getEnv: getEnv$2,
    qin: qin$1
};

/**
 *
 * 内容：RN基础库Env
 *
 */
// 为了兼容env大包，需要这样实现
let Platform;
try {
    /* eslint-disable */
    Platform = require('react-native').Platform;
}
catch (err) {
    Platform = {};
}
// 是否安卓
const isAndroid$1 = Platform.OS == 'android';
// 是否ios
const isIOS$1 = Platform.OS == 'ios';
// getEnv方法，内容包含 平台，宿主等
const getEnv$1 = () => {
    const os = Platform.OS;
    return {
        os: os.toUpperCase(),
        host: "JDApp",
        miniProgram: null
    };
};
var index_rn = {
    isIOS: isIOS$1,
    isAndroid: isAndroid$1,
    ua: ua$1,
    isWeixinApp: isWeixinApp$1,
    isAlipayApp: isAlipayApp$1,
    isJDApp: isJDApp$2,
    isDaojiaApp: isDaojiaApp$2,
    isJDMiniApp: isJDMiniApp$1,
    isJDLtApp: isJDLtApp$1,
    isJDPinGou: isJDPinGou$1,
    isDadaApp: isDadaApp$1,
    isMobileQQ: isMobileQQ$1,
    isSafari: isSafari$1,
    isJDdinnovationApp: isJDdinnovationApp$1,
    isJDHApp: isJDHApp$1,
    isWeb,
    isNode: isNode$1,
    isAliMiniProgram: isAliMiniProgram$1,
    isWeChatMiniProgram: isWeChatMiniProgram$1,
    isJdMiniProgram: isJdMiniProgram$1,
    isRN,
    getEnv: getEnv$1,
    qin: qin$1
};

let module;
if (isWeb) {
    module = index_h5;
}
else if (isAliMiniProgram$1) {
    module = index_alipay;
}
else if (isWeChatMiniProgram$1) {
    module = index_weapp;
}
else if (isJdMiniProgram$1) {
    module = index_jd;
}
else if (isRN) {
    module = index_rn;
}
else {
    throw new Error('Qin API：暂不支持');
}
const { isIOS, isAndroid, ua, isWeixinApp, isAlipayApp, isJDApp, isDaojiaApp, isJDMiniApp, isJDLtApp, isJDPinGou, isDadaApp, isMobileQQ, isSafari, isJDdinnovationApp, isJDHApp, isNode, getEnv, qin } = module;

const axiosInstance = axios.create({
    baseURL: 'https://api.example.com', // 根据您的实际需求修改为您的API地址
    timeout: 5000, // 设置请求超时时间，单位为毫秒
    headers: {
        'Content-Type': 'application/json', // 设置请求的Content-Type头部
    },
});
const get = (url, params) => {
    return axiosInstance.get(url, { params });
};
const post = (url, data) => {
    return axiosInstance.post(url, data);
};
const request$4 = (options) => {
    if (options.method === 'GET') {
        return get(options.url, options.params);
    }
    else if (options.method === 'POST') {
        return post(options.url, options.data);
    }
};
// 可以根据需要进一步封装其他请求方法，如PUT、DELETE等

const CONTAINER_NAME = {
    WECHAT: 'wechatMiniProgram',
    ALIPAY: 'aliMiniProgramp',
    WEB: 'web',
    JD: "jdMiniProgram"
};
const JSONP_SIGN = '__uni_jsonp_handler_sign__';

const styleIn = (options, baseName) => {
    const { _ext = {}, ...rest } = options || {};
    return {
        ...rest,
        ...(_ext[baseName] || {}),
    };
};

/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
/* eslint-disable no-empty */
function isObject(obj) {
    return typeof obj === 'object' && obj !== null;
}
function normalizeHeaders(obj) {
    if (!isObject(obj)) {
        return obj;
    }
    const keyList = ['Accept', 'Content-Type'];
    keyList.forEach((key) => {
        for (const headerKey in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, headerKey)) {
                if (headerKey.toUpperCase() === key.toUpperCase()
                    && headerKey !== key) {
                    obj[key] = obj[headerKey];
                    delete obj[headerKey];
                }
            }
        }
    });
    return obj;
}
const validateStatus = (status) => {
    return (status >= 200 && status < 300) || status === 304;
};
function styleOptions(options, containerName) {
    const DEFAULT_TIMEOUT = 20000;
    const DEFAULT_REQUEST_OPTIONS = {
        url: '',
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
        jsonpCallbackProp: 'callback',
        jsonpCallback: `__uni_jsonp_handler_${new Date().getTime()}`,
        timeout: DEFAULT_TIMEOUT,
        dataType: 'json',
    };
    const isJsonp = options?.method?.toUpperCase() === 'JSONP';
    if (isJsonp && containerName === CONTAINER_NAME.WEB) {
        window[JSONP_SIGN] = typeof (window[JSONP_SIGN]) !== 'undefined' ? (window[JSONP_SIGN] + 1) : 0;
        DEFAULT_REQUEST_OPTIONS.jsonpCallback = `${DEFAULT_REQUEST_OPTIONS.jsonpCallback}_${window[JSONP_SIGN]}`;
    }
    const jsonpCallback = options.jsonpCallback || DEFAULT_REQUEST_OPTIONS.jsonpCallback;
    const adapterResponse = (res) => {
        if ((res.errMsg && res?.errMsg?.indexOf('request:fail') !== -1) || res.error) {
            return {
                ...res,
                error: res.error || res.status || res.statusCode,
                errorMessage: res.errorMessage || res.errMsg || '',
                status: res.statusCode || res.status,
                headers: res.header || res.headers || {},
            };
        }
        const afterRes = {
            ...res,
            errorMessage: res.errorMessage || res.errMsg || '',
            status: res.statusCode || res.status,
            headers: res.header || res.headers || {},
        };
        if (isJsonp && containerName !== CONTAINER_NAME.WEB) {
            try {
                const reg = new RegExp(`${jsonpCallback}\\(([\\s\\S]*)\\);?$`, 'gm');
                const content = reg.exec(res?.data)?.[1];
                const data = content ? JSON.parse(content) : '';
                return {
                    ...afterRes,
                    data,
                };
            }
            catch (e) {
                return {
                    error: 14,
                    data: res,
                    errorMessage: 'JSONP 解码失败',
                };
            }
        }
        return afterRes;
    };
    let afterOptions = { ...DEFAULT_REQUEST_OPTIONS,
        ...options,
        method: (options.method || 'GET').toUpperCase(),
        headers: { ...DEFAULT_REQUEST_OPTIONS.headers, ...normalizeHeaders(options.headers || {}) },
        success: (res) => {
            const _validateStatus = options.validateStatus || validateStatus;
            const _res = adapterResponse(res);
            if (!_validateStatus(_res.status)) {
                options.fail && options.fail(_res);
            }
            else {
                options.success && options.success(_res);
            }
        },
        fail: (res) => {
            options.fail && options.fail(adapterResponse(res));
        },
        complete: (res) => {
            options.complete && options.complete(adapterResponse(res));
        },
    };
    if (isJsonp) {
        afterOptions = {
            ...afterOptions,
            method: 'GET',
            isJsonp,
            dataType: 'text',
            data: { ...options.data,
                [options.jsonpCallbackProp || DEFAULT_REQUEST_OPTIONS.jsonpCallbackProp]: jsonpCallback },
        };
    }
    return afterOptions;
}
function normalize(api, containerName) {
    return (options) => {
        const afterOptions = styleOptions(styleIn(options, containerName), containerName);
        return api(afterOptions);
    };
}

function request$3(options) {
    const { url, method, data, dataType, headers, timeout, success, fail, complete } = options;
    return jd.request({
        url,
        header: headers,
        method,
        data,
        timeout,
        dataType,
        success(res) {
            success && success(res);
        },
        fail(res) {
            fail && fail(res);
        },
        complete(res) {
            complete && complete(res);
        },
    });
}
var jdModule = normalize(request$3, CONTAINER_NAME.JD);

function request$2(options) {
    const { url, method, data, dataType, headers, timeout, success, fail, complete } = options;
    return wx.request({
        url,
        header: headers,
        method,
        data,
        timeout,
        dataType,
        success(res) {
            success && success(res);
        },
        fail(res) {
            fail && fail(res);
        },
        complete(res) {
            complete && complete(res);
        },
    });
}
var weappModule = normalize(request$2, CONTAINER_NAME.WECHAT);

function request$1(options) {
    const { url, method, data, dataType, headers, timeout, success, fail, complete } = options;
    const httpRequest = my.request;
    const _data = data;
    return httpRequest({
        url,
        headers,
        method,
        data: _data,
        timeout,
        dataType,
        success(res) {
            success && success(res);
        },
        fail(res) {
            fail && fail(res);
        },
        complete(res) {
            complete && complete(res);
        },
    });
}
var alipayModule = normalize(request$1, CONTAINER_NAME.ALIPAY);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const JDNetwork = require('@jdreact/jdreact-core-lib/Libraries/JDNetwork');
const request = (options) => {
    const methodName = options.methodName;
    if (!methodName) {
        console.error(`RN请求基础库中必须包含methodName参数`);
        return;
    }
    if (typeof JDNetwork[methodName] !== 'function') {
        console.error(`JDNetwork网络库不支持${methodName}`);
        return;
    }
    return JDNetwork[methodName](options);
};

var index = (options) => {
    if (isWeb) {
        return request$4(options);
    }
    else if (isRN) {
        return request(options);
    }
    else if (isAliMiniProgram$1) {
        return alipayModule(options);
    }
    else if (isWeChatMiniProgram$1) {
        return weappModule(options);
    }
    else if (isJdMiniProgram$1) {
        return jdModule(options);
    }
    else {
        throw new Error('Uni API：request暂不支持');
    }
};

export { index as default };
