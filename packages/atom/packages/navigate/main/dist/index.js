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
var index_h5$1 = {
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
var index_alipay$1 = {
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
var index_jd$1 = {
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
var index_weapp$1 = {
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
var index_rn$1 = {
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

let module$2;
if (isWeb) {
    module$2 = index_h5$1;
}
else if (isAliMiniProgram$1) {
    module$2 = index_alipay$1;
}
else if (isWeChatMiniProgram$1) {
    module$2 = index_weapp$1;
}
else if (isJdMiniProgram$1) {
    module$2 = index_jd$1;
}
else if (isRN) {
    module$2 = index_rn$1;
}
else {
    throw new Error('Qin API：暂不支持');
}
const { isIOS, isAndroid, ua, isWeixinApp, isAlipayApp, isJDApp, isDaojiaApp, isJDMiniApp, isJDLtApp, isJDPinGou, isDadaApp, isMobileQQ, isSafari, isJDdinnovationApp, isJDHApp, isNode, getEnv, qin } = module$2;

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
    WEB: 'web'};

const styleIn = (options, baseName) => {
    const { _ext = {}, ...rest } = options || {};
    return {
        ...rest,
        ...(_ext[baseName] || {}),
    };
};

const normalize = {
    push: (api, containerName) => {
        return (options) => {
            return promisify(api)(styleIn(options, containerName));
        };
    },
    back: (api, containerName) => {
        return (options) => {
            return promisify(api)(styleIn(options, containerName));
        };
    },
    go: (api, containerName) => {
        return (options) => {
            return promisify(api)(styleIn(options, containerName));
        };
    },
    replace: (api, containerName) => {
        return (options) => {
            return promisify(api)(styleIn(options, containerName));
        };
    },
    reLaunch: (api, containerName) => {
        return (options) => {
            return promisify(api)(styleIn(options, containerName));
        };
    },
    switchTab: (api, containerName) => {
        return (options) => {
            return promisify(api)(styleIn(options, containerName));
        };
    },
};

const navigateTo$5 = normalize.push((options) => {
    const { url, isHash = false, refresh = true, success, fail, complete } = options;
    setTimeout(() => {
        try {
            if (isHash) {
                location.hash = `#${url}`;
            }
            else if (refresh) {
                location.href = url;
            }
            else {
                const state = { page_id: 1 };
                const title = '';
                history.pushState(state, title, url);
            }
            success && success();
            complete && complete();
        }
        catch (e) {
            fail && fail(e);
            complete && complete(e);
        }
    });
}, CONTAINER_NAME.WEB);
const redirectTo$5 = normalize.replace((options) => {
    const { url, isHash = false, refresh = true, success, fail, complete } = options || {};
    const _url = isHash ? `/#${url}` : url;
    setTimeout(() => {
        try {
            if ((url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1) &&
                url.indexOf(location.origin) === -1) {
                console.warn('API: Replace does not support cross-domain');
                location.href = url;
                return;
            }
            if (isHash) {
                const { href } = location;
                const index = href.indexOf('#');
                // 域名不变的情况下不会刷新页面
                window.location.replace(index > 0
                    ? `${href.slice(0, index)}#${url}`
                    : `${href}#${url}`);
            }
            else {
                window.history.replaceState(null, null, _url);
                refresh && (location.reload());
            }
            success && success();
            complete && complete();
        }
        catch (e) {
            fail && fail(e);
            complete && complete(e);
        }
    });
}, CONTAINER_NAME.WEB);
const switchTab$5 = normalize.switchTab(() => {
    throw new Error('API: switchTab 不支持');
}, CONTAINER_NAME.WEB);
const navigateBack$5 = normalize.back((options) => {
    const { data, success, fail, complete } = options;
    if (data < 0) {
        setTimeout(() => {
            history.go(options.data);
            success && success();
            complete && complete();
        });
    }
    else {
        fail && fail({ errMsg: 'data不能大于或等于0' });
        complete && complete({ errMsg: 'data不能大于或等于0' });
    }
}, CONTAINER_NAME.WEB);
var index_h5 = {
    navigateTo: navigateTo$5,
    redirectTo: redirectTo$5,
    switchTab: switchTab$5,
    navigateBack: navigateBack$5
};

const navigateTo$4 = normalize.push((options) => {
    const { url, events, success, fail, complete } = options;
    my.navigateTo({
        url,
        events,
        success() {
            success && success();
        },
        fail(res) {
            fail && fail(res);
        },
        complete(res) {
            complete && complete(res);
        },
    });
}, CONTAINER_NAME.ALIPAY);
const redirectTo$4 = normalize.replace((options) => {
    const { url, success, fail, complete } = options || {};
    my.redirectTo({
        url,
        success() {
            success && success();
        },
        fail(res) {
            fail && fail(res);
        },
        complete(res) {
            complete && complete(res);
        },
    });
}, CONTAINER_NAME.ALIPAY);
const switchTab$4 = normalize.switchTab((options) => {
    my.switchTab(options);
}, CONTAINER_NAME.ALIPAY);
const navigateBack$4 = normalize.back((options) => {
    const { data, success, fail, complete } = options || {};
    my.navigateBack({
        delta: data,
        success() {
            success && success();
        },
        fail(res) {
            fail && fail(res);
        },
        complete(res) {
            complete && complete(res);
        },
    });
}, CONTAINER_NAME.ALIPAY);
var index_alipay = {
    navigateTo: navigateTo$4,
    redirectTo: redirectTo$4,
    switchTab: switchTab$4,
    navigateBack: navigateBack$4
};

const navigateTo$3 = normalize.push((options) => {
    const { url, success, fail, complete } = options;
    jd.navigateTo({
        url,
        success() {
            success && success();
        },
        fail(res) {
            fail && fail(res);
        },
        complete(res) {
            complete && complete(res);
        },
    });
}, CONTAINER_NAME.WECHAT);
const redirectTo$3 = normalize.replace((options) => {
    const { url, success, fail, complete } = options || {};
    jd.redirectTo({
        url,
        success() {
            success && success();
        },
        fail(res) {
            fail && fail(res);
        },
        complete(res) {
            complete && complete(res);
        },
    });
}, CONTAINER_NAME.WECHAT);
const switchTab$3 = normalize.switchTab((options) => {
    jd.switchTab(options);
}, CONTAINER_NAME.WECHAT);
const navigateBack$3 = normalize.back((options) => {
    const { data, success, fail, complete } = options || {};
    jd.navigateBack({
        delta: data,
        success() {
            success && success();
        },
        fail(res) {
            fail && fail(res);
        },
        complete(res) {
            complete && complete(res);
        },
    });
}, CONTAINER_NAME.WECHAT);
var index_jd = {
    navigateTo: navigateTo$3,
    redirectTo: redirectTo$3,
    switchTab: switchTab$3,
    navigateBack: navigateBack$3
};

const navigateTo$2 = normalize.push((options) => {
    const { url, success, fail, complete } = options;
    wx.navigateTo({
        url,
        success() {
            success && success();
        },
        fail(res) {
            fail && fail(res);
        },
        complete(res) {
            complete && complete(res);
        },
    });
}, CONTAINER_NAME.WECHAT);
const redirectTo$2 = normalize.replace((options) => {
    const { url, success, fail, complete } = options || {};
    wx.redirectTo({
        url,
        success() {
            success && success();
        },
        fail(res) {
            fail && fail(res);
        },
        complete(res) {
            complete && complete(res);
        },
    });
}, CONTAINER_NAME.WECHAT);
const switchTab$2 = normalize.switchTab((options) => {
    wx.switchTab(options);
}, CONTAINER_NAME.WECHAT);
const navigateBack$2 = normalize.back((options) => {
    const { data, success, fail, complete } = options || {};
    wx.navigateBack({
        delta: data,
        success() {
            success && success();
        },
        fail(res) {
            fail && fail(res);
        },
        complete(res) {
            complete && complete(res);
        },
    });
}, CONTAINER_NAME.WECHAT);
var index_weapp = {
    navigateTo: navigateTo$2,
    redirectTo: redirectTo$2,
    switchTab: switchTab$2,
    navigateBack: navigateBack$2
};

var navigateTo$1 = function navigateTo() {};
var redirectTo$1 = function redirectTo() {};
var switchTab$1 = function switchTab() {};
var navigateBack$1 = function navigateBack() {};
var index_rn = {
  navigateTo: navigateTo$1,
  redirectTo: redirectTo$1,
  switchTab: switchTab$1,
  navigateBack: navigateBack$1
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
const { navigateTo, redirectTo, switchTab, navigateBack } = module;
var module$1 = module;

export { module$1 as default, navigateBack, navigateTo, redirectTo, switchTab };
