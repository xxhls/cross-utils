import { isWeb, isRN } from "@test/cross-atom-env";

import * as h5Module from "./index.h5";
import * as rnModule from "./index.rn";
import * as taroModule from "./index.taro";

export const isH5 = isWeb
  ? h5Module.isH5
  : isRN
    ? rnModule.isH5
    : taroModule.isH5 || false;

export const isHourPRO = isWeb
  ? h5Module.isHourPRO
  : isRN
    ? rnModule.isHourPRO
    : taroModule.isHourPRO || false;

export const isDevelopment = isWeb
  ? h5Module.isDevelopment
  : isRN
    ? rnModule.isDevelopment
    : taroModule.isDevelopment || false;

export const isIOS = isWeb
  ? h5Module.isIOS
  : isRN
    ? rnModule.isIOS
    : taroModule.isIOS || false;

export const isAndroid = isWeb
  ? h5Module.isAndroid
  : isRN
    ? rnModule.isAndroid
    : taroModule.isAndroid || false;

export const isHarmonyOS = isRN
  ? rnModule.isHarmonyOS
  : taroModule.isHarmonyOS || false;

export const isJDReactNativeWebView = isRN
  ? rnModule.isJDReactNativeWebView
  : taroModule.isJDReactNativeWebView || false;

export const isMiniprogram = isWeb
  ? h5Module.isMiniprogram
  : isRN
    ? rnModule.isMiniprogram
    : taroModule.isMiniprogram || false;

export const isWeixin = isWeb
  ? h5Module.isWeixin
  : isRN
    ? rnModule.isWeixin
    : taroModule.isWeixin || false;

export const isJDApp = isWeb
  ? h5Module.isJDApp
  : isRN
    ? rnModule.isJDApp
    : taroModule.isJDApp || false;

export const isJDMiniApp = isWeb
  ? h5Module.isJDMiniApp
  : isRN
    ? rnModule.isJDMiniApp
    : taroModule.isJDMiniApp || false;

export const isJDLtApp = isWeb
  ? h5Module.isJDLtApp
  : isRN
    ? rnModule.isJDLtApp
    : taroModule.isJDLtApp || false;

export const isjdjrApp = isWeb
  ? h5Module.isjdjrApp
  : isRN
    ? rnModule.isjdjrApp
    : taroModule.isjdjrApp || false;

export const jdAppVersion = isWeb
  ? h5Module.jdAppVersion
  : isRN
    ? rnModule.jdAppVersion
    : taroModule.jdAppVersion || "";

export const isLocalhost = isWeb
  ? h5Module.isLocalhost
  : isRN
    ? rnModule.isLocalhost
    : taroModule.isLocalhost || false;

export const isJinliMiniprogram = isWeb
  ? h5Module.isJinliMiniprogram
  : isRN
    ? rnModule.isJinliMiniprogram
    : taroModule.isJinliMiniprogram || false;

export const isJingGouMiniprogram = isWeb
  ? h5Module.isJingGouMiniprogram
  : isRN
    ? rnModule.isJingGouMiniprogram
    : taroModule.isJingGouMiniprogram || false;
