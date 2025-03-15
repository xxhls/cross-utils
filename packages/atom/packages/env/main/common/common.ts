/**
 * 该文件为env库公共层
 */
import { envName } from "./constant";

/**
 * isWeb
 */
export const isWeb = typeof window !== "undefined" && "onload" in window;

/**
 * isNode
 */
export const isNode =
  typeof process !== "undefined" &&
  !!(process.versions && process.versions.node);

/**
 * is支付宝小程序
 */
export const isAliMiniProgram =
  typeof my !== "undefined" && my !== null && typeof my.alert !== "undefined";

/**
 * is微信小程序
 */
export const isWeChatMiniProgram =
  typeof wx !== "undefined" &&
  wx !== null &&
  (typeof wx.request !== "undefined" || typeof wx.miniProgram !== "undefined");

/**
 * is京东小程序
 */
export const isJdMiniProgram = typeof jd !== "undefined";

/**
 * isRN
 */
function isReactNative() {
  const GLOBAL = typeof global !== "undefined" ? global : window;
  return !!GLOBAL && !!GLOBAL.ReactNative && !!GLOBAL.ReactNative.NativeModules;
}
export const isRN = isReactNative();

/**
 * qin统一环境变量
 */
export const qin: object =
  (isWeChatMiniProgram && wx) ||
  (isJdMiniProgram && jd) ||
  (isAliMiniProgram && my) ||
  (isWeb && window) ||
  {};

/**
 * getEnv
 */

export const getSystemName = (system) => {
  let result = null;
  Object.keys(system).forEach((env) => {
    if (system[env]) {
      result = env;
    }
  });
  return envName[result] || "";
};
