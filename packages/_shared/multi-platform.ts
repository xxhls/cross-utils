/**
 * @name multi-platform
 * @description 多端判断工具
 * @author heyongqi10 <heyongqi10@jd.com>
 */

import { getEnv, ENV_TYPE } from "@tarojs/taro";

const _env = getEnv();

// 微信小程序环境
export const isWxMiniProgram = _env === ENV_TYPE.WEAPP;
export const isWEAPP = isWxMiniProgram;

// 百度小程序环境
export const isBdMiniProgram = _env === ENV_TYPE.SWAN;
export const isSWAN = isBdMiniProgram;

// 支付宝小程序环境
export const isAliMinProgram = _env === ENV_TYPE.ALIPAY;
export const isALIPAY = isAliMinProgram;

// 抖音小程序环境
export const isTtMiniProgram = _env === ENV_TYPE.TT;
export const isTT = isTtMiniProgram;

// QQ小程序环境
export const isQQMiniProgram = _env === ENV_TYPE.QQ;
export const isQQ = isQQMiniProgram;

// 京东小程序环境
export const isJdMiniProgram = _env === ENV_TYPE.JD;
export const isJD = isJdMiniProgram;

// 鸿蒙混合环境
export const isHarmonyHybrid = _env === ENV_TYPE.HARMONYHYBRID;
export const isHARMONYHYBRID = isHarmonyHybrid;

// RN环境
export const isReactNative = _env === ENV_TYPE.RN;
export const isRN = isReactNative;

// Web环境
export const isWeb = _env === ENV_TYPE.WEB;
export const isH5 = isWeb;
