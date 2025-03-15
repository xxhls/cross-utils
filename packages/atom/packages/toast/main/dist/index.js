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

const SHORT_DELAY = 2000; // 2 seconds
function styleOptions(options) {
    const DEFAULT_REQUEST_OPTIONS = {
        title: '',
        icon: 'none',
        duration: SHORT_DELAY,
    };
    if (typeof options === 'string') {
        return {
            ...DEFAULT_REQUEST_OPTIONS,
            content: options,
        };
    }
    else {
        return {
            ...DEFAULT_REQUEST_OPTIONS,
            ...options,
        };
    }
}
function normalize(api) {
    return (options) => {
        const afterOptions = styleOptions(options);
        return promisify(api)(afterOptions);
    };
}

/* eslint-disable guard-for-in */
const styles = {
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        boxSizing: 'border-box',
        maxWidth: '80%',
        color: '#ffffff',
        padding: '8px 16px',
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        left: '50%',
        bottom: '50%',
        fontSize: '16px',
        lineHeight: '32px',
        fontWeight: '600',
        borderRadius: '4px',
        textAlign: 'center',
        transition: 'all 0.4s ease-in-out',
        webkitTransition: 'all 0.4s ease-in-out',
        transform: 'translateX(-50%)',
        webkitTransform: 'translateX(-50%)',
        zIndex: 9999,
    },
    icon: {
        marginBottom: '5px',
        width: '45px',
        height: '45px',
    },
};
function showToastWindow(message, iconUrl) {
    if (!window._uni_toast_status.toastWin) {
        window._uni_toast_status.toastIcon = null;
        window._uni_toast_status.toastWin = document.createElement('div');
        window._uni_toast_status.toastWin.setAttribute('role', 'alert');
        // support for ARIA, add tabindex for focus
        // https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/tabindex
        window._uni_toast_status.toastWin.setAttribute('tabindex', '-1');
        for (const key in styles.container) {
            window._uni_toast_status.toastWin.style[key] = styles.container[key];
        }
        window._uni_toast_status.toastContent = document.createElement('div');
        window._uni_toast_status.toastWin.appendChild(window._uni_toast_status.toastContent);
        document.body.appendChild(window._uni_toast_status.toastWin);
    }
    // 创建icon
    if (window._uni_toast_status.toastIcon && !iconUrl) {
        window._uni_toast_status.toastWin.removeChild(window._uni_toast_status.toastIcon);
        window._uni_toast_status.toastIcon = null;
    }
    else if (window._uni_toast_status.toastIcon && iconUrl) {
        window._uni_toast_status.toastIcon.setAttribute('src', iconUrl);
    }
    else if (!window._uni_toast_status.toastIcon && iconUrl) {
        window._uni_toast_status.toastIcon = document.createElement('img');
        window._uni_toast_status.toastIcon.setAttribute('src', iconUrl);
        for (const key in styles.icon) {
            window._uni_toast_status.toastIcon.style[key] = styles.icon[key];
        }
        window._uni_toast_status.toastWin.insertBefore(window._uni_toast_status.toastIcon, window._uni_toast_status.toastContent);
    }
    window._uni_toast_status.toastContent.textContent = message;
    window._uni_toast_status.toastWin.style.transform = 'translateX(-50%)';
    window._uni_toast_status.toastWin.style.webkitTransform = 'translateX(-50%)';
}
function hideToastWindow() {
    setTimeout(() => {
        if (window._uni_toast_status.toastWin && window._uni_toast_status.toastWin.style) {
            window._uni_toast_status.toastWin.style.transform = 'translateX(-50%) scale(0.8)';
            window._uni_toast_status.toastWin.style.webkitTransform = 'translateX(-50%) scale(0.8)';
        }
    }, 0);
}
const innerToast = {
    hideTimer: null,
    show() {
        // All messages had been toasted already, so remove the toast window,
        if (!window._uni_toast_status.queue.length) {
            if (window._uni_toast_status.toastWin) {
                // eslint-disable-next-line
                window._uni_toast_status.toastWin.parentNode.removeChild(window._uni_toast_status.toastWin);
            }
            window._uni_toast_status.toastWin = null;
            return;
        }
        // the previous toast is not ended yet.
        if (window._uni_toast_status.isProcessing)
            return;
        window._uni_toast_status.isProcessing = true;
        const toastInfo = window._uni_toast_status.queue.shift();
        try {
            showToastWindow(toastInfo.title, toastInfo.icon);
        }
        catch (e) {
            toastInfo.fail && toastInfo.fail(e);
            toastInfo.complete && toastInfo.complete(e);
        }
        innerToast.hideTimer = setTimeout(() => {
            toastInfo.success && toastInfo.success();
            toastInfo.complete && toastInfo.complete();
            innerToast.switchToNext();
        }, toastInfo.duration);
    },
    push(options) {
        window._uni_toast_status.queue.push(options);
        innerToast.show();
    },
    // Switch to next message
    // This function will hide current, and call `show()` to display next
    // If queue is empty, DOM will be clear in `show()`
    switchToNext() {
        hideToastWindow();
        window._uni_toast_status.isProcessing = false;
        setTimeout(() => innerToast.show(), 500);
        if (innerToast.hideTimer) {
            clearTimeout(innerToast.hideTimer);
            innerToast.hideTimer = null;
        }
    },
};
const show = normalize((options) => {
    window._uni_toast_inner_toast = innerToast;
    window._uni_toast_status = window._uni_toast_status || {
        queue: [],
        isProcessing: false,
        toastWin: '',
        toastContent: '',
        toastIcon: '',
    };
    const { icon, title, duration, success, fail, complete } = options;
    const iconMap = {
        success: 'https://gw.alicdn.com/imgextra/i1/O1CN01h684sE1Td4mwYyChK_!!6000000002404-2-tps-200-200.png',
        fail: 'https://gw.alicdn.com/imgextra/i1/O1CN01yOywus1et4ORJzafk_!!6000000003928-2-tps-200-200.png',
        none: '',
    };
    innerToast.push({
        title,
        duration,
        icon: iconMap[icon] || '',
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
});

const hide = normalize((options) => {
    const { success, fail, complete } = options;
    // remove all queued messages
    try {
        if (!window._uni_toast_status) {
            success && success();
            complete && complete();
            return;
        }
        window._uni_toast_status.queue = [];
        window._uni_toast_inner_toast.switchToNext();
        success && success();
        complete && complete();
    }
    catch (e) {
        fail && fail(e);
        complete && complete(e);
    }
});

var h5Module = {
    showToast: show,
    hideToast: hide,
};

// const showToast = (options)=>{
//     return wx.showToast(options)
// }
// const hideToast = (options)=>{
//     return wx.hideToast(options)
// }
// export default {
//     showToast,
//     hideToast
// }
const hideToast$4 = normalize((options) => {
    jd.hideToast(options);
});
const showToast$4 = normalize((options) => {
    const { icon, title, duration, success, fail, complete } = options;
    const iconMap = {
        success: 'success',
        fail: 'error',
        none: 'none',
        loading: 'loading',
    };
    jd.showToast({
        icon: iconMap[icon] || '',
        title,
        duration,
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
});
var jdModule = {
    hideToast: hideToast$4,
    showToast: showToast$4
};

// const showToast = (options)=>{
//     return wx.showToast(options)
// }
// const hideToast = (options)=>{
//     return wx.hideToast(options)
// }
// export default {
//     showToast,
//     hideToast
// }
const hideToast$3 = normalize((options) => {
    wx.hideToast(options);
});
const showToast$3 = normalize((options) => {
    const { icon, title, duration, success, fail, complete } = options;
    const iconMap = {
        success: 'success',
        fail: 'error',
        none: 'none',
        loading: 'loading',
    };
    wx.showToast({
        icon: iconMap[icon] || '',
        title,
        duration,
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
});
var weappModule = {
    hideToast: hideToast$3,
    showToast: showToast$3
};

const hideToast$2 = normalize((options) => {
    return my.hideToast(options);
});
const showToast$2 = normalize((options) => {
    const { icon, title, duration, success, fail, complete } = options;
    return my.showToast({
        type: icon,
        content: title,
        duration,
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
});
var alipayModule = {
    hideToast: hideToast$2,
    showToast: showToast$2
};

const showToast$1 = (options) => {
    throw new Error('RN：showToast待实现 ');
};
const hideToast$1 = (options) => {
    throw new Error('RN：hideToast待实现 ');
};
var rnModule = {
    showToast: showToast$1,
    hideToast: hideToast$1
};

const hideToast = (option) => {
    if (isWeb) {
        return h5Module.hideToast(option);
    }
    else if (isRN) {
        return rnModule.hideToast(option);
    }
    else if (isAliMiniProgram$1) {
        return alipayModule.hideToast(option);
    }
    else if (isWeChatMiniProgram$1) {
        return weappModule.hideToast(option);
    }
    else if (isJdMiniProgram$1) {
        return jdModule.hideToast(option);
    }
    else {
        throw new Error("Qin API：hideToast暂不支持");
    }
};
const showToast = (option) => {
    if (isWeb) {
        return h5Module.showToast(option);
    }
    else if (isRN) {
        return rnModule.showToast(option);
    }
    else if (isAliMiniProgram$1) {
        return alipayModule.showToast(option);
    }
    else if (isWeChatMiniProgram$1) {
        return weappModule.showToast(option);
    }
    else if (isJdMiniProgram$1) {
        return jdModule.showToast(option);
    }
    else {
        throw new Error("Qin API：showToast暂不支持");
    }
};
var index = {
    showToast,
    hideToast
};

export { index as default, hideToast, showToast };
