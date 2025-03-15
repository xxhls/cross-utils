import { getEnv, ENV_TYPE } from "@tarojs/taro";

const env = getEnv();

// 微信小程序
export const isWeapp = env === ENV_TYPE.WEAPP;
// H5
export const isWeb = env === ENV_TYPE.WEB;
// RN环境
export const isRN = env === ENV_TYPE.RN;
// 支付宝小程序
export const isAlipay = env === ENV_TYPE.ALIPAY;
// 抖音小程序
export const isTT = env === ENV_TYPE.TT;
// QQ小程序
export const isQQ = env === ENV_TYPE.QQ;
// 京东小程序
export const isJD = env === ENV_TYPE.JD;
// 鸿蒙混合环境
export const isHarmony = env === ENV_TYPE.HARMONYHYBRID;
// Taro环境
export const isTaro = true;
