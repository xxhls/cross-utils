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

const CONTAINER_NAME = {
    WECHAT: 'wechatMiniProgram',
    ALIPAY: 'aliMiniProgramp',
    WEB: 'web',
    JD: "jdMiniProgram"
};

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

const styleIn = (options, baseName) => {
    const { _ext = {}, ...rest } = options || {};
    return {
        ...rest,
        ...(_ext[baseName] || {}),
    };
};

/**
 * @param res
 */
const formatResponse = (res) => {
    return {
        confirm: res.confirm,
        cancel: !res.confirm,
    };
};
function normalize(api, containerName) {
    return (args) => {
        args = styleIn(args, containerName);
        return promisify(api)({
            ...args,
            title: args.title || '',
            content: args.content || '',
            confirmText: args.confirmText || '确定',
            cancelText: args.cancelText || '取消',
            success: (res) => {
                args.success && args.success(formatResponse(res));
            },
            complete: (res) => {
                args.complete && args.complete(res);
            },
        }).then(formatResponse);
    };
}

const clsPrefix = '__universal_confirm';
const styles = `.${clsPrefix} {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  background: #fff;
  color: #000;
  box-sizing: border-box;
  border-radius: 12px;
  z-index: 9999;
  outline: none;
  text-align: center;
  width: 280px;
  opacity: 0;
  animation-duration: .3s;
  animation-fill-mode: both;
  font-size:14px;
}
.${clsPrefix}_mask {
  content: "";
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
  display: block;
  z-index: 9999;
  background: #000;
  opacity: 0;
  animation-duration: .3s;
  animation-fill-mode: both;
}
.${clsPrefix}_title {
  padding: 28px 16px 16px;
  font-weight: bold;
}
.${clsPrefix}_content {
  color: #666;
  padding: 0 16px;
  margin-bottom: 28px;
  word-break: break-all;
  max-height: 200px;
  overflow: scroll;
}
.${clsPrefix}_cancel {
  display: inline-block;
  font-weight: bold;
  padding: 14px 0;
  width: 50%;
  box-sizing: border-box;
  border-top: 1px solid #eee;
  border-right: 1px solid #eee;
}
.${clsPrefix}_confirm {
  display: inline-block;
  font-weight: bold;
  color: #576B95;
  padding: 14px 0;
  width: 50%;
  box-sizing: border-box;
  border-top: 1px solid #eee;
}
@keyframes ${clsPrefix}_in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes ${clsPrefix}_out {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes ${clsPrefix}_fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: .6;
  }
}
@keyframes ${clsPrefix}_fadeOut {
  0% {
    opacity: .6;
  }
  100% {
    opacity: 0;
  }
}`.replace(/\n/g, '');
let styleElement = null;
let confirmElement = null;
let hideFn = () => { };
// let hideFn:() => void
const confirm$1 = (args) => {
    try {
        if (!styleElement) {
            // create a style tag for keyframes
            styleElement = document.createElement('style');
            styleElement.innerHTML = styles;
            document.body.appendChild(styleElement);
        }
        if (!confirmElement) {
            // create a actionsheet element
            confirmElement = document.createElement('div');
            // create a mask element
            const maskEle = document.createElement('div');
            maskEle.className = `${clsPrefix}_mask`;
            confirmElement.appendChild(maskEle);
            // create container element
            const containerEle = document.createElement('div');
            containerEle.className = clsPrefix;
            // add title
            const titleEle = document.createElement('div');
            titleEle.className = `${clsPrefix}_title`;
            titleEle.innerText = args.title;
            containerEle.appendChild(titleEle);
            // add content
            const contentEle = document.createElement('div');
            contentEle.className = `${clsPrefix}_content`;
            contentEle.innerText = args.content;
            containerEle.appendChild(contentEle);
            // add operators
            const operateEle = document.createElement('div');
            // add cancelButton
            if (args.showCancel !== false) {
                const cancelButton = document.createElement('div');
                cancelButton.className = `${clsPrefix}_cancel`;
                cancelButton.innerText = args.cancelText;
                cancelButton.setAttribute('tabindex', '-1');
                cancelButton.addEventListener('click', () => {
                    hideFn(() => {
                        args.success({ confirm: false });
                        args.complete({ confirm: false });
                    });
                });
                operateEle.appendChild(cancelButton);
            }
            // add confirmButton
            const confirmButton = document.createElement('div');
            confirmButton.className = `${clsPrefix}_confirm`;
            if (args.showCancel === false) {
                confirmButton.style.width = '100%';
            }
            confirmButton.innerText = args.confirmText;
            confirmButton.setAttribute('tabindex', '-1');
            confirmButton.addEventListener('click', () => {
                hideFn(() => {
                    args.success({ confirm: true });
                    args.complete({ confirm: true });
                });
            });
            operateEle.appendChild(confirmButton);
            containerEle.appendChild(operateEle);
            confirmElement.appendChild(containerEle);
            document.body.appendChild(confirmElement);
            maskEle.style.animationName = `${clsPrefix}_fadeIn`;
            containerEle.style.animationName = `${clsPrefix}_in`;
            hideFn = (callback) => {
                maskEle.style.animationName = `${clsPrefix}_fadeOut`;
                confirmElement.removeChild(containerEle);
                setTimeout(() => {
                    document.body.removeChild(confirmElement);
                    confirmElement = null;
                    callback();
                }, 300);
            };
        }
    }
    catch (err) {
        args.fail(err);
        args.complete(err);
    }
};
const showModal$5 = normalize(confirm$1, CONTAINER_NAME.WEB);
var h5Module = {
    showModal: showModal$5
};

const showModal$4 = normalize((args) => jd.showModal(args), CONTAINER_NAME.JD);
var jdModule = {
    showModal: showModal$4
};

const showModal$3 = normalize((args) => wx.showModal(args), CONTAINER_NAME.WECHAT);
var weappModule = {
    showModal: showModal$3
};

const confirm = (args) => {
    const params = {
        ...args,
        confirmButtonText: args.confirmText,
        cancelButtonText: args.cancelText,
    };
    // 兼容  showCancel场景，是否显示取消按钮：默认是true的时候是显示取消的。如果false  则调用my.alert({})
    if (Object.prototype.hasOwnProperty.call(args, 'showCancel') && (args.showCancel).toString() === 'false') {
        const { confirmText } = args;
        const paramsAlert = {
            ...args,
            buttonText: confirmText
        };
        my.alert(paramsAlert);
    }
    my.confirm(params);
};
const showModal$2 = normalize(confirm, CONTAINER_NAME.ALIPAY);
var alipayModule = {
    showModal: showModal$2
};

const showModal$1 = (options) => {
    throw new Error('RN：showLoading待实现 ');
};
var rnModule = {
    showModal: showModal$1
};

const showModal = (option) => {
    if (isWeb) {
        return h5Module.showModal(option);
    }
    else if (isRN) {
        return rnModule.showModal(option);
    }
    else if (isAliMiniProgram$1) {
        return alipayModule.showModal(option);
    }
    else if (isWeChatMiniProgram$1) {
        return weappModule.showModal(option);
    }
    else if (isJdMiniProgram$1) {
        return jdModule.showModal(option);
    }
    else {
        throw new Error("Qin API：hideLoading暂不支持");
    }
};
var index = {
    showModal
};

export { index as default, showModal };
