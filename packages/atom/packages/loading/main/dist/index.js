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

function styleOptions(options) {
    if (!options) {
        options = {};
    }
    if (isAliMiniProgram$1) {
        options.content = options.title || '';
        delete options.title;
    }
    return options;
}
/**
 * showLoading
 * @param api
 */
function normalizeShow(api, containerName) {
    return (args) => {
        return promisify(api)(styleOptions(styleIn(args, containerName)));
    };
}
function normalizeHide(api, containerName) {
    return (args) => {
        return promisify(api)(styleIn(args, containerName));
    };
}

// window.__uni_loadingWin = null;
const clsPrefix = '__universal_loading';
const styles = `.${clsPrefix} {
  background-color: rgba(0, 0, 0, 0.6);
  box-sizing: border-box;
  max-width: 80%;
  color: #ffffff;
  padding: 15px;
  position: fixed;
  left: 50%;
  bottom: 50%;
  border-radius: 4px;
  text-align: center;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  z-index: 9999;
  outline: none;
}
.${clsPrefix}_circle {
  border: 2px solid rgba(200, 200, 200, 0.5);
  border-radius: 50%;
  position: relative;
  height: 40px;
  width: 40px;
  margin: auto;
}
.${clsPrefix}_circle:after {
  content: "";
  display: block;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  position: absolute;
  top: -2px;
  left: -2px;
  border: 2px solid;
  border-color: transparent;
  border-left-color: #fff;
  box-sizing: content-box;
  animation: ${clsPrefix}_roller 1s infinite linear;
}
.${clsPrefix}_text {
  margin-top: 6px;
  color: #fff;
  line-height: 1.5;
  font-size: 14px;
  text-align: center;
  font-weight: normal;
}
@keyframes ${clsPrefix}_roller {
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(360deg);
  }
}`.replace(/\n/g, '');
/*
 * @param message {String}
 */
let styleElement = null;
const showLoading$5 = normalizeShow(({ title = '', success = () => { }, fail = () => { }, complete = () => { } }) => {
    try {
        if (!styleElement) {
            // create a style tag for keyframes
            styleElement = document.createElement('style');
            styleElement.innerHTML = styles;
            document.body.appendChild(styleElement);
        }
        if (!window.__uni_loadingWin) {
            // create loading win
            window.__uni_loadingWin = document.createElement('div');
            window.__uni_loadingWin.className = clsPrefix;
            window.__uni_loadingWin.setAttribute('role', 'alert');
            // support for ARIA, add tabindex for focus
            // https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/tabindex
            window.__uni_loadingWin.setAttribute('tabindex', '-1');
            // add a circle element
            const circle = document.createElement('div');
            circle.className = `${clsPrefix}_circle`;
            window.__uni_loadingWin.appendChild(circle);
            // add text element
            const text = document.createElement('div');
            text.className = `${clsPrefix}_text`;
            window.__uni_loadingWin.appendChild(text);
            document.body.appendChild(window.__uni_loadingWin);
        }
        const text = window.__uni_loadingWin.querySelector(`.${clsPrefix}_text`);
        if (title) {
            text.style.display = 'block';
            text.innerText = title;
        }
        else {
            text.style.display = 'none';
            text.innerText = '';
        }
        success();
        complete();
    }
    catch (error) {
        fail();
        complete();
    }
}, CONTAINER_NAME.WEB);

const hideLoading$5 = normalizeHide(({ success = () => { }, fail = () => { }, complete = () => { } }) => {
    try {
        setTimeout(() => {
            if (window.__uni_loadingWin && window.__uni_loadingWin.parentNode) {
                window.__uni_loadingWin.parentNode.removeChild(window.__uni_loadingWin);
            }
            window.__uni_loadingWin = null;
            success();
            complete();
        }, 0);
    }
    catch (error) {
        fail();
        complete();
    }
}, CONTAINER_NAME.WEB);

var h5Module = {
    showLoading: showLoading$5,
    hideLoading: hideLoading$5,
};

// const showLoading = (options)=>{
//     return jd.showLoading(options)
// }
// const hideLoading = (options)=>{
//     return jd.hideLoading(options)
// }
// export default {
//     showLoading,
//     hideLoading
// }
const hideLoading$4 = normalizeHide((args) => jd.hideLoading(args), CONTAINER_NAME.JD);
const showLoading$4 = normalizeShow((args) => jd.showLoading(args), CONTAINER_NAME.JD);
var jdModule = {
    showLoading: showLoading$4,
    hideLoading: hideLoading$4
};

// const showLoading = (options)=>{
//     return wx.showLoading(options)
// }
// const hideLoading = (options)=>{
//     return wx.hideLoading(options)
// }
// export default {
//     showLoading,
//     hideLoading
// }
const hideLoading$3 = normalizeHide((args) => wx.hideLoading(args), CONTAINER_NAME.WECHAT);
const showLoading$3 = normalizeShow((args) => wx.showLoading(args), CONTAINER_NAME.WECHAT);
var weappModule = {
    showLoading: showLoading$3,
    hideLoading: hideLoading$3
};

// const showLoading = (options)=>{
//     return my.showLoading(options)
// }
// const hideLoading = (options)=>{
//     return my.hideLoading(options)
// }
// export default {
//     showLoading,
//     hideLoading
// }
const hideLoading$2 = normalizeHide((args) => (my.hideLoading(args)), CONTAINER_NAME.ALIPAY);
const showLoading$2 = normalizeShow((args) => (my.showLoading(args)), CONTAINER_NAME.ALIPAY);
var alipayModule = {
    showLoading: showLoading$2,
    hideLoading: hideLoading$2
};

const hideLoading$1 = (options) => {
    throw new Error('RN：hideLoading待实现 ');
};
const showLoading$1 = (options) => {
    throw new Error('RN：showLoading待实现 ');
};
var rnModule = {
    hideLoading: hideLoading$1,
    showLoading: showLoading$1
};

const hideLoading = (option) => {
    if (isWeb) {
        return h5Module.hideLoading(option);
    }
    else if (isRN) {
        return rnModule.hideLoading(option);
    }
    else if (isAliMiniProgram$1) {
        return alipayModule.hideLoading(option);
    }
    else if (isWeChatMiniProgram$1) {
        return weappModule.hideLoading(option);
    }
    else if (isJdMiniProgram$1) {
        return jdModule.hideLoading(option);
    }
    else {
        throw new Error("Qin API：hideLoading暂不支持");
    }
};
const showLoading = (option) => {
    if (isWeb) {
        return h5Module.showLoading(option);
    }
    else if (isRN) {
        return rnModule.showLoading(option);
    }
    else if (isAliMiniProgram$1) {
        return alipayModule.showLoading(option);
    }
    else if (isWeChatMiniProgram$1) {
        return weappModule.showLoading(option);
    }
    else if (isJdMiniProgram$1) {
        return jdModule.showLoading(option);
    }
    else {
        throw new Error("Qin API：showLoading暂不支持");
    }
};
var index = {
    showLoading,
    hideLoading
};

export { index as default, hideLoading, showLoading };
