import {
  ua,
  isWeixinApp,
  isAlipayApp,
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

const res = (isJdMiniProgram && jd.getSystemInfoSync()) || {};
/**
 * IOS设备
 */
const isIOS: boolean =
  (res.system && res.system.toLowerCase() === "ios") || false;
/**
 * 安卓设备
 */
const isAndroid: boolean =
  (res.system && res.system.toLowerCase() === "android") || false;

const isJDApp: boolean = res.hostName === "jdapp";
const isDaojiaApp: boolean =
  res.hostName === "daojia" || res.hostName === "jddjApp";
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

  getEnv,

  qin,
};
