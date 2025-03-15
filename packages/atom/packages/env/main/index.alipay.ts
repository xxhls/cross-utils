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
  isJDHApp,
} from "./common/compatibilityLayer";
import {
  isWeb,
  isNode,
  isAliMiniProgram,
  isWeChatMiniProgram,
  isJdMiniProgram,
  isRN,
  getSystemName,
  qin,
} from "./common/common";
const myEnv = (isAliMiniProgram && my.env.platform) || "";

/**
 * IOS设备
 */
const isIOS: boolean = myEnv.toLowerCase() === "ios";
/**
 * 安卓设备
 */
const isAndroid: boolean = myEnv.toLowerCase() === "android";

/**
 * 获取端
 */
const getEnv = () => {
  const os = {
    isAndroid,
    isIOS,
  };
  return {
    os: getSystemName(os),
    host: "",
    miniProgram: "",
  };
};

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
  qin,
};
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
  qin,
  getEnv,
};
