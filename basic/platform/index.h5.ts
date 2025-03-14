const UserAgent =
  globalThis.navigator.userAgent || navigator.vendor || globalThis.opera;
const URL = globalThis.location.href || "";

export const isH5 = true;
export const isHourPRO = URL.includes("hour.jd.com") ? true : false;
export const isDevelopment = !isHourPRO;
export const isIOS = /iPhone|iPad/gi.test(UserAgent); // iso设备
export const isAndroid = /android/gi.test(UserAgent); // 安卓设备
export const isHarmonyOS = UserAgent.includes("HarmonyOS");
export const isJDReactNativeWebView = false;
export const isMiniprogram = /miniprogram/gi.test(UserAgent.toLowerCase());
export const isWeixin = /MicroMessenger/gi.test(UserAgent);
export const isJDApp = UserAgent.startsWith("jdapp;");
//  京小包APP
export const isJDMiniApp = UserAgent.startsWith("jdmini;");
// 京东特价版本app
export const isJDLtApp = UserAgent.startsWith("jdltapp;");
// 京东app版本号
export const jdAppVersion = (UserAgent.split(";") || [])[2];
// 京东极速版app？
export const isjdjrApp =
  UserAgent.includes("jdFinance") || UserAgent.includes("jdfinance");

export const isLocalhost = URL.includes("localhost") ? true : false;

// ... existing code ...
//锦礼
export const isJinliMiniprogram = UserAgent.includes("wx54c5683ae3f8a574");

//京购小程序
export const isJingGouMiniprogram = UserAgent.includes("wx91d27dbf599dff74");
