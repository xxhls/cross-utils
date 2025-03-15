import {
    isWeb,
    isNode,
    isRN,
    getSystemName,
    qin
} from './common/common'


/**
 * 获取设备UA
 */
const ua: string = window.navigator.userAgent;

/**
 * 安卓设备
 */
 const isAndroid: boolean = /android/gi.test(ua);

 const isHarmony: boolean = /harmony/gi.test(ua);
/**
 * IOS设备
 */
 const isIOS: boolean = /iPhone|iPad|iOS/gi.test(ua) && !isAndroid;

/**
 * 微信环境
 */
export const isWeixinApp: boolean = /MicroMessenger/gi.test(ua);
/**
 * 支付宝环境
 */
export const isAlipayApp: boolean = /AlipayClient/gi.test(ua);
/**
 * 京东环境
 */
export const isJDApp: boolean = /jdapp/gi.test(ua);
/**
 * 京东到家环境
 */
export const isDaojiaApp: boolean = /appName=jdLocal/gi.test(ua);
/**
 * 京小包APP
 */
export const isJDMiniApp: boolean = /jdltapp/gi.test(ua);
/**
 * 京东特价版本app
 */
export const isJDLtApp: boolean = /jdltapp/gi.test(ua);
/**
 * 京喜app
 */
export const isJDPinGou: boolean = /jdpingou/gi.test(ua);
/**
 * 达达app
 */
export const isDadaApp: boolean = /dada/gi.test(ua) && !/quickapp/gi.test(ua);
/**
 * 京东金融app
 */
export const isJDdinnovationApp = false;
/**
 * 京东健康app
 */
export const isJDHApp = false;
/**
 * QQapp
 */
export const isMobileQQ: boolean = /QQ\/([\d.]+)/gi.test(ua);
/**
 * Safari
 */
export const isSafari: boolean = /Safari/gi.test(ua);

// isAliMiniProgram,
// isWeChatMiniProgram,
// isJdMiniProgram,

/**
 * 微信小程序内嵌webview
 */
const isWeChatMiniProgram: boolean = (/miniProgram/gi.test(ua) && (/wechat/gi.test(ua) || /MicroMessenger/gi.test(ua)));

/**
 * 京东小程序内嵌webview
 */
const isJdMiniProgram: boolean = /(?:jdmp)/.test(ua.toLocaleLowerCase());


/**
 * 支付宝小程序内嵌webview
 */
const isAliMiniProgram: boolean = /AliApp/gi.test(ua);

const version = "1.0.0"

/**
 * 获取端
 */
export const getEnv = () => {
    const os = {
        isAndroid,
        isIOS
    }

    const host = {
        isWeixinApp,
        isAlipayApp,
        isJDApp,
        isDaojiaApp,
        isJDMiniApp,
        isJDLtApp,
        isJDPinGou,
        isDadaApp,
        isMobileQQ,
        isSafari,
        isJDdinnovationApp,
        isJDHApp,
    }

    const miniProgram = {
        isAliMiniProgram,
        isWeChatMiniProgram,
        isJdMiniProgram
    }
    return {
        os: getSystemName(os),
        host: getSystemName(host),
        miniProgram: getSystemName(miniProgram)
    }
}
export {
    ua,
    isIOS,
    isAndroid,
    isHarmony,
    isWeb,
    isNode,
    isAliMiniProgram,
    isWeChatMiniProgram,
    isJdMiniProgram,
    isRN,
    qin
}

export default {
    ua,
    isIOS,
    isAndroid,
    isHarmony,
    isWeixinApp,
    isAlipayApp,
    isJDApp,
    isDaojiaApp,
    isJDMiniApp,
    isJDLtApp,
    isJDPinGou,
    isDadaApp,
    isMobileQQ,
    isSafari,
    isJDdinnovationApp,
    isJDHApp,

    isWeb,
    isNode,
    isAliMiniProgram,
    isWeChatMiniProgram,
    isJdMiniProgram,
    isRN,
    qin,

    getEnv
}