/**
 *
 * 内容：RN基础库Env
 *
 */

// 为了兼容env大包，需要这样实现
let Platform;
try {
  /* eslint-disable */
  Platform = require("react-native").Platform;
} catch (err) {
  Platform = {};
}
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
  qin,
} from "./common/common";

// 是否安卓
const isAndroid: boolean = Platform.OS == "android";

// 是否ios
const isIOS: boolean = Platform.OS == "ios";

// getEnv方法，内容包含 平台，宿主等
const getEnv = () => {
  const os = Platform.OS;
  return {
    os: os.toUpperCase(),
    host: "JDApp",
    miniProgram: null,
  };
};

export const getCommonParams = (key, cb) => {
  throw new Error("API: getCommonParams暂不支持");
};

// 以下几个方法不对外暴露

function getRandomId(ERROR_VALUE) {
  return isIOS
    ? `RN${ERROR_VALUE}--${new Date().getTime()}-${Math.random()}`
    : `RN${ERROR_VALUE}-${new Date().getTime()}-${Math.random()}`;
}

const ERROR_VALUE_a = "a";
const ERROR_VALUE_b = "b";
const ERROR_VALUE_c = "c";
const ERROR_VALUE_TIMEOUT = "TO";

const ERROR_VALUE_9 = "9";
const ERROR_VALUE_8 = "8";
const ERROR_VALUE_7 = "7";
const ERROR_VALUE_6 = "6";
const ERROR_VALUE_5 = "5";
const ERROR_VALUE_4 = "4";
const ERROR_VALUE_0 = "0";
// const ERROR_VALUE_TIMEOUT = 'TO';

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
