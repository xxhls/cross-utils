import { AsyncStorage } from 'react-native';

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

function promisify(api) {
    return (arg) => {
        return new Promise((resolve, reject) => {
            const promisifyArg = arg;
            api({
                ...promisifyArg,
                success: (res) => {
                    if (promisifyArg && typeof promisifyArg.success === 'function') {
                        promisifyArg.success(res);
                    }
                    resolve(res);
                },
                onSuccess: (res) => {
                    if (promisifyArg && typeof promisifyArg.onSuccess === 'function') {
                        promisifyArg.onSuccess(res);
                    }
                    resolve(res);
                },
                fail: (res) => {
                    if (promisifyArg && typeof promisifyArg.fail === 'function') {
                        promisifyArg.fail(res);
                    }
                    reject(res);
                },
                onFail: (res) => {
                    if (promisifyArg && typeof promisifyArg.onFail === 'function') {
                        promisifyArg.onFail(res);
                    }
                    reject(res);
                },
                complete: (res) => {
                    if (promisifyArg && typeof promisifyArg.complete === 'function') {
                        promisifyArg.complete(res);
                    }
                },
                onComplete: (res) => {
                    if (promisifyArg && typeof promisifyArg.onComplete === 'function') {
                        promisifyArg.onComplete(res);
                    }
                },
            });
        });
    };
}

const CONTAINER_NAME = {
    WECHAT: 'wechatMiniProgram',
    ALIPAY: 'aliMiniProgramp',
    WEB: 'web',
    JD: "jdMiniProgram"
};

const styleIn = (options, baseName) => {
    const { _ext = {}, ...rest } = options || {};
    return {
        ...rest,
        ...(_ext[baseName] || {}),
    };
};
// 处理类似于getStorageSync这种，微信与支付宝有参数差异
const aliIn = (options, baseName) => {
    if (baseName === CONTAINER_NAME.ALIPAY) {
        return {
            key: options
        };
    }
    return options;
};

/**
 * @param params
 */
function formatGetStorageRes(params) {
    if (params && typeof params.fail === 'function') {
        const failFn = params.fail;
        params.fail = (err) => {
            if (err.errMsg === 'getStorage:fail data not found') {
                typeof params.success === 'function' && params.success({ data: null });
                typeof params.complete === 'function' && params.complete({ data: null });
                return;
            }
            failFn(err);
        };
    }
    return params;
}
const normalize = {
    getStorage: (api, containerName) => {
        return (args) => {
            args = styleIn(args, containerName);
            return promisify(api)(formatGetStorageRes(args)).catch((e) => {
                if (e.errMsg === 'getStorage:fail data not found') {
                    return { data: null };
                }
            });
        };
    },
    setStorage: (api, containerName) => {
        return (args) => {
            return promisify(api)(styleIn(args, containerName));
        };
    },
    removeStorage: (api, containerName) => {
        return (args) => {
            return promisify(api)(styleIn(args, containerName));
        };
    },
};

const getStorage$5 = normalize.getStorage((args) => {
    const { success = () => { }, fail = () => { }, complete = () => { } } = args || {};
    try {
        if (Object.prototype.toString.call(args) !== '[object Object]') {
            throw new Error('the Function need a param of Object type');
        }
        if (!args.hasOwnProperty('key')) {
            throw new Error('the first param of this Function must contain a property named "key"');
        }
        if (typeof args.key !== 'string') {
            throw new Error('the first param of this Function must contain a property named "key" of string type');
        }
        const res = { data: JSON.parse(window.localStorage.getItem(args.key)) };
        success(res);
        complete(res);
        return res;
    }
    catch (e) {
        fail(e);
        complete(e);
    }
}, CONTAINER_NAME.WEB);

const getStorageSync$5 = (args) => {
    if (Object.prototype.toString.call(args) !== '[object Object]') {
        throw new Error('the Function need a param of Object type');
    }
    const argsIn = aliIn(args, CONTAINER_NAME.WEB);
    if (!argsIn) {
        throw new Error('the first param of this Function must contain a property named "key"');
    }
    return JSON.parse(window.localStorage.getItem(argsIn));
};

const setStorage$5 = normalize.setStorage((args) => {
    const { success = () => { }, fail = () => { }, complete = () => { } } = args || {};
    try {
        if (Object.prototype.toString.call(args) !== '[object Object]') {
            throw new Error('the Function need a param of Object type');
        }
        if (!args.hasOwnProperty('key')) {
            throw new Error('the first param of this Function must contain a property named "key"');
        }
        if (typeof args.key !== 'string') {
            throw new Error('the first param of this Function must contain a property named "key" of string type');
        }
        if (!args.hasOwnProperty('data')) {
            throw new Error('the first param of this Function must contain a property named "data"');
        }
        window.localStorage.setItem(args.key, JSON.stringify(args.data));
        success();
        complete();
    }
    catch (e) {
        fail(e);
        complete(e);
    }
}, CONTAINER_NAME.WEB);

const setStorageSync$5 = (key, data) => {
    if (!key) {
        throw new Error('the first param of this Function must contain a property named "key"');
    }
    if (typeof key !== 'string') {
        throw new Error('the first param of this Function must contain a property named "key" of string type');
    }
    if (!data) {
        throw new Error('the first param of this Function must contain a property named "data"');
    }
    window.localStorage.setItem(key, JSON.stringify(data));
};

const removeStorage$5 = normalize.removeStorage((args) => {
    const { success = () => { }, fail = () => { }, complete = () => { } } = args || {};
    try {
        if (Object.prototype.toString.call(args) !== '[object Object]') {
            throw new Error('the Function need a param of Object type');
        }
        if (!args.hasOwnProperty('key')) {
            throw new Error('the first param of this Function must contain a property named "key"');
        }
        if (typeof args.key !== 'string') {
            throw new Error('the first param of this Function must contain a property named "key" of string type');
        }
        window.localStorage.removeItem(args.key);
        success();
        complete();
    }
    catch (e) {
        fail(e);
        complete(e);
    }
}, CONTAINER_NAME.WEB);

const removeStorageSync$5 = (args) => {
    if (Object.prototype.toString.call(args) !== '[object Object]') {
        throw new Error('the Function need a param of Object type');
    }
    const argsIn = aliIn(args, CONTAINER_NAME.WEB);
    if (!argsIn) {
        throw new Error('the first param of this Function must contain a property named "key"');
    }
    window.localStorage.removeItem(argsIn);
};

var webModule = {
    getStorage: getStorage$5,
    getStorageSync: getStorageSync$5,
    setStorage: setStorage$5,
    setStorageSync: setStorageSync$5,
    removeStorage: removeStorage$5,
    removeStorageSync: removeStorageSync$5,
};

function isUndef(type) {
    return type === 'undefined';
}
const isDingdingMiniapp = !isUndef(typeof dd) && dd !== null && !isUndef(typeof dd.alert);

const getStorage$4 = normalize.getStorage((args) => (isDingdingMiniapp ? dd.getStorage(args) : my.getStorage(args)), CONTAINER_NAME.ALIPAY);

// 出参抹平
const result$1 = (args) => {
    const s = my.getStorageSync(aliIn(args, CONTAINER_NAME.ALIPAY));
    if (typeof s === 'object')
        return s.data;
};
const getStorageSync$4 = (args) => (isDingdingMiniapp ? dd.getStorageSync(styleIn(args, CONTAINER_NAME.ALIPAY)) : result$1(args));

const setStorage$4 = normalize.setStorage((args) => (isDingdingMiniapp ? dd.setStorage(args) : my.setStorage(args)), CONTAINER_NAME.ALIPAY);

// 参数抹平
const result = (key, data) => {
    const args = {
        key,
        data
    };
    if (isDingdingMiniapp) {
        dd.setStorageSync(styleIn(args, CONTAINER_NAME.ALIPAY));
    }
    else {
        my.setStorageSync(styleIn(args, CONTAINER_NAME.ALIPAY));
    }
};
const setStorageSync$4 = (key, data) => result(key, data);

const removeStorage$4 = normalize.removeStorage((args) => (isDingdingMiniapp ? dd.removeStorage(args) : my.removeStorage(args)), CONTAINER_NAME.ALIPAY);

const removeStorageSync$4 = (args) => (isDingdingMiniapp ? dd.removeStorageSync(aliIn(args, CONTAINER_NAME.ALIPAY)) : my.removeStorageSync(aliIn(args, CONTAINER_NAME.ALIPAY)));

var aliMiniAppModule = {
    getStorage: getStorage$4,
    getStorageSync: getStorageSync$4,
    setStorage: setStorage$4,
    setStorageSync: setStorageSync$4,
    removeStorage: removeStorage$4,
    removeStorageSync: removeStorageSync$4,
};

const getStorage$3 = normalize.getStorage((args) => wx.getStorage(args), CONTAINER_NAME.WECHAT);

const getStorageSync$3 = (args) => {
    const argsIn = aliIn(args, CONTAINER_NAME.WECHAT);
    return wx.getStorageSync(argsIn);
};

const setStorage$3 = normalize.setStorage((args) => wx.setStorage(args), CONTAINER_NAME.WECHAT);

const setStorageSync$3 = (key, data) => {
    return wx.setStorageSync(key, data);
};

const removeStorage$3 = normalize.removeStorage((args) => wx.removeStorage(args), CONTAINER_NAME.WECHAT);

const removeStorageSync$3 = (args) => {
    const argsIn = aliIn(args, CONTAINER_NAME.WECHAT);
    return wx.removeStorageSync(argsIn);
};

var weChatModule = {
    getStorage: getStorage$3,
    getStorageSync: getStorageSync$3,
    setStorage: setStorage$3,
    setStorageSync: setStorageSync$3,
    removeStorage: removeStorage$3,
    removeStorageSync: removeStorageSync$3,
};

const getStorage$2 = normalize.getStorage((args) => jd.getStorage(args), CONTAINER_NAME.JD);

const getStorageSync$2 = (args) => {
    const argsIn = aliIn(args, CONTAINER_NAME.JD);
    return jd.getStorageSync(argsIn);
};

const setStorage$2 = normalize.setStorage((args) => jd.setStorage(args), CONTAINER_NAME.JD);

const setStorageSync$2 = (key, data) => {
    return jd.setStorageSync(key, data);
};

const removeStorage$2 = normalize.removeStorage((args) => jd.removeStorage(args), CONTAINER_NAME.JD);

const removeStorageSync$2 = (args) => {
    const argsIn = aliIn(args, CONTAINER_NAME.JD);
    return jd.removeStorageSync(argsIn);
};

var jdModule = {
    getStorage: getStorage$2,
    getStorageSync: getStorageSync$2,
    setStorage: setStorage$2,
    setStorageSync: setStorageSync$2,
    removeStorage: removeStorage$2,
    removeStorageSync: removeStorageSync$2,
};

/**
 * 获取本地存储
 * @param params
 */
const getStorage$1 = (params) => {
    /**
    *
    * key
    * success
    * fail
    * complete
    *
    */
    const { key, success, fail, complete } = params;
    AsyncStorage.getItem(key, (err, result) => {
        if (err) {
            fail(err);
            complete(err);
            return;
        }
        success(getJsonObjectOrRawValue(result));
        complete(getJsonObjectOrRawValue(result));
    });
};
/**
 * 设置本地存储
 * @param params
 */
const setStorage$1 = (params) => {
    const { key, data, success = () => { }, fail = () => { }, complete = () => { } } = params;
    /**
     *
     * key
     * data
     * success
     * fail
     * complete
     *
     */
    const value = stringifyValue(data);
    AsyncStorage.setItem(key, value, (error) => {
        if (error) {
            fail(error);
            complete(error);
            return;
        }
        success();
        complete(error);
    });
};
/**
 * 删除本地存储
 * @param params
 */
const removeStorage$1 = (params) => {
    const { key, success = () => { }, fail = () => { }, complete = () => { } } = params;
    /**
     *
     * key
     * success
     * fail
     * complete
     *
     */
    AsyncStorage.removeItem(key, (err) => {
        if (err) {
            fail(err);
            complete(err);
            return;
        }
        success();
        complete();
    });
};
// 以下为RN不支持方法,但是为了和其他端保持一直，需要对外暴露方法。
const getStorageSync$1 = (key) => {
    throw new Error("API: getStorageSync暂不支持");
};
const setStorageSync$1 = (key) => {
    throw new Error("API: setStorageSync暂不支持");
};
const removeStorageSync$1 = (key) => {
    throw new Error("API: removeStorageSync暂不支持");
};
// 以下方法不对外暴露
function getJsonObjectOrRawValue(str) {
    try {
        const val = JSON.parse(str);
        if (typeof val === "object") {
            return val;
        }
        // 兼容下上一版本问题
        const v = JSON.parse(val);
        if (typeof v === "object") {
            return v;
        }
        return str;
    }
    catch (e) {
        return str;
    }
}
function stringifyValue(obj) {
    if (typeof obj === 'string') {
        return obj;
    }
    try {
        // 如果是object类型，优先序列化，避免走catch逻辑
        if (typeof obj === 'object') {
            return JSON.stringify(obj);
        }
        // 不排除传入的出了 object、string类型之外的值，使用catch兜底
        return JSON.stringify(obj);
    }
    catch (error) {
        console.error('stringifyValue', error);
        return obj;
    }
}
var rnModule = {
    getStorage: getStorage$1,
    getStorageSync: getStorageSync$1,
    setStorage: setStorage$1,
    setStorageSync: setStorageSync$1,
    removeStorage: removeStorage$1,
    removeStorageSync: removeStorageSync$1,
};

const getStorage = (args) => {
    if (isWeb) {
        return webModule.getStorage(args);
    }
    else if (isWeChatMiniProgram$1) {
        return weChatModule.getStorage(args);
    }
    else if (isAliMiniProgram$1) {
        return aliMiniAppModule.getStorage(args);
    }
    else if (isJdMiniProgram$1) {
        return jdModule.getStorage(args);
    }
    else if (isRN) {
        return rnModule.getStorage(args);
    }
    else {
        throw new Error('Qin API：getStorage暂不支持');
    }
};
const getStorageSync = (args) => {
    if (isWeb) {
        return webModule.getStorageSync(args);
    }
    else if (isWeChatMiniProgram$1) {
        return weChatModule.getStorageSync(args);
    }
    else if (isAliMiniProgram$1) {
        return aliMiniAppModule.getStorageSync(args);
    }
    else if (isJdMiniProgram$1) {
        return jdModule.getStorageSync(args);
    }
    else if (isRN) {
        return rnModule.getStorageSync(args);
    }
    else {
        throw new Error('Qin API：getStorageSync暂不支持');
    }
};
const setStorage = (args) => {
    if (isWeb) {
        return webModule.setStorage(args);
    }
    else if (isWeChatMiniProgram$1) {
        return weChatModule.setStorage(args);
    }
    else if (isAliMiniProgram$1) {
        return aliMiniAppModule.setStorage(args);
    }
    else if (isJdMiniProgram$1) {
        return jdModule.setStorage(args);
    }
    else if (isRN) {
        return rnModule.setStorage(args);
    }
    else {
        throw new Error('Qin API：setStorage暂不支持');
    }
};
const setStorageSync = (key, data) => {
    if (isWeb) {
        return webModule.setStorageSync(key, data);
    }
    else if (isWeChatMiniProgram$1) {
        return weChatModule.setStorageSync(key, data);
    }
    else if (isAliMiniProgram$1) {
        return aliMiniAppModule.setStorageSync(key, data);
    }
    else if (isJdMiniProgram$1) {
        return jdModule.setStorageSync(key, data);
    }
    else if (isRN) {
        return rnModule.setStorageSync(key);
    }
    else {
        throw new Error('Qin API：setStorageSync暂不支持');
    }
};
const removeStorage = (args) => {
    if (isWeb) {
        return webModule.removeStorage(args);
    }
    else if (isWeChatMiniProgram$1) {
        return weChatModule.removeStorage(args);
    }
    else if (isAliMiniProgram$1) {
        return aliMiniAppModule.removeStorage(args);
    }
    else if (isJdMiniProgram$1) {
        return jdModule.removeStorage(args);
    }
    else if (isRN) {
        return rnModule.removeStorage(args);
    }
    else {
        throw new Error('Qin API：removeStorage暂不支持');
    }
};
const removeStorageSync = (args) => {
    if (isWeb) {
        return webModule.removeStorageSync(args);
    }
    else if (isWeChatMiniProgram$1) {
        return weChatModule.removeStorageSync(args);
    }
    else if (isAliMiniProgram$1) {
        return aliMiniAppModule.removeStorageSync(args);
    }
    else if (isJdMiniProgram$1) {
        return jdModule.removeStorageSync(args);
    }
    else if (isRN) {
        return rnModule.removeStorageSync(args);
    }
    else {
        throw new Error('Qin API：removeStorageSync暂不支持');
    }
};
var index = {
    getStorage,
    getStorageSync,
    setStorage,
    setStorageSync,
    removeStorage,
    removeStorageSync,
};

export { index as default, getStorage, getStorageSync, removeStorage, removeStorageSync, setStorage, setStorageSync };
