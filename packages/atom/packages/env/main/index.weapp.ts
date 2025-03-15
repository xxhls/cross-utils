import {
    ua,
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
    isJDHApp
} from './common/compatibilityLayer'
import {
    isWeb,
    isNode,
    isAliMiniProgram,
    isWeChatMiniProgram,
    isJdMiniProgram,
    isRN,
    getSystemName,
    qin
} from './common/common'


const res = isWeChatMiniProgram && wx.getSystemInfoSync() || {}
const matches = res.system && res.system.match(/([^\s]+)/)
/**
 * IOS设备
 */
const isIOS = matches ? matches[1].toLowerCase() === 'ios' : false
/**
 * 安卓设备
 */
const isAndroid = matches ? matches[1].toLowerCase() === 'android' : false

/**
 * 获取端
 */
const getEnv = () => {
    const os = {
        isAndroid,
        isIOS
    }
    return {
        os: getSystemName(os),
        host: '',
        miniProgram: ''
    }
}
export {
    isIOS,
    isAndroid,
    ua,
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
    getEnv,
    qin
}
export default {
    isIOS,
    isAndroid,

    ua,
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

    getEnv,

    qin
}


