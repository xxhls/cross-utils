/**
 * Date: 2020-09-14 11:01:27
 * LastEditors: zhangwenshun
 * LastEditTime: 2023-02-06 15:27:10
 * title: 平台判断类方法
 * description: 平台判断类方法
 * classify: 公共方法
 * searchKeyword: 公共方法、平台判断
 * created by: zhangwenshun
 */
import { Platform } from "react-native";
import System from "../system";

export const isH5 = false;
export const isHourPRO = false;
export const isDevelopment = false;
export const isIOS = Platform.OS == "ios";
export const isAndroid = Platform.OS == "android";
export const isHarmonyOS = false;
export const isJDReactNativeWebView = true;
export const isMiniprogram = false;
export const isWeixin = false;
export const isJDApp = true;
//  京小包APP
export const isJDMiniApp = false;
// 京东特价版本app
export const isJDLtApp = false;
// 京东极速版app？
export const isjdjrApp = false;

export const jdAppVersion = System.hostVersionName();
export const isLocalhost = false;

export const isJinliMiniprogram = false;

//京购小程序
export const isJingGouMiniprogram = false;
