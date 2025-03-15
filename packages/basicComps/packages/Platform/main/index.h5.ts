/**
 * Date: 2020-09-14 11:01:27
 * LastEditors: zhangwenshun
 * LastEditTime: 2023-02-06 15:27:41
 * title: 平台判断类方法
 * description: 平台判断类方法
 * classify: 公共方法
 * searchKeyword: 公共方法、平台判断
 * created by: zhangwenshun
 */

const UserAgent =
  window.navigator.userAgent || navigator.vendor || window.opera;
const URL = window.location.href || "";

export const isH5 = true;
export const isHourPRO = URL.indexOf("hour.jd.com") != -1 ? true : false;
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
  UserAgent.indexOf("jdFinance") != -1 || UserAgent.indexOf("jdfinance") != -1;

export const isLocalhost = URL.indexOf("localhost") != -1 ? true : false;

// ... existing code ...
//锦礼
export const isJinliMiniprogram =
  UserAgent.indexOf("wx54c5683ae3f8a574") !== -1;

//京购小程序
export const isJingGouMiniprogram =
  UserAgent.indexOf("wx91d27dbf599dff74") !== -1;
