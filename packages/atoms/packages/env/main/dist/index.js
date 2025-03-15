import { getEnv, ENV_TYPE } from '@tarojs/taro';

const env = getEnv();
// 微信小程序
const isWeapp = env === ENV_TYPE.WEAPP;
// H5
const isWeb = env === ENV_TYPE.WEB;
// RN环境
const isRN = env === ENV_TYPE.RN;
// 支付宝小程序
const isAlipay = env === ENV_TYPE.ALIPAY;
// 抖音小程序
const isTT = env === ENV_TYPE.TT;
// QQ小程序
const isQQ = env === ENV_TYPE.QQ;
// 京东小程序
const isJD = env === ENV_TYPE.JD;
// 鸿蒙混合环境
const isHarmony = env === ENV_TYPE.HARMONYHYBRID;
// Taro环境
const isTaro = true;

export { isAlipay, isHarmony, isJD, isQQ, isRN, isTT, isTaro, isWeapp, isWeb };
