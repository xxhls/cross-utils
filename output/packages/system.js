import { Platform, StatusBar, Dimensions } from 'react-native';
import { JDNativeSystem } from '@jdreact/jdreact-core-lib';
import Taro, { getEnv, ENV_TYPE } from '@tarojs/taro';

/** @format */
/**
 * 【当前客户端版本和目标版本对比，jdapp专用】
 * @param {string} targetVersion 目标版本号 example：'1.2.3'
 * @returns { returnType }
 * -1：当前客户端版本小于目标版本；0：当前客户端版本等于目标版本；1：当前客户端版本大于目标版本；
 */
const compareVersions = (targetVersion, hostVersion) => {
    if (!targetVersion) {
        throw new Error('compareVersions: Expected 1 arguments, but got 0.');
    }
    // 切成数组
    try {
        hostVersion = hostVersion || System$1.hostVersionName();
    }
    catch (e) {
        // hostVersion = hostVersion;
    }
    const _hostVersionArr = hostVersion?.split('.');
    const hostVersionArr = _hostVersionArr;
    const targetVersionArr = targetVersion.split('.');
    let length = Math.max(hostVersionArr.length, targetVersionArr.length);
    while (length > 0) {
        let v1;
        let v2;
        try {
            v1 = Number(hostVersionArr.shift());
            v2 = Number(targetVersionArr.shift());
        }
        catch (e) {
            v1 = 0;
            v2 = 0;
        }
        if (v1 > v2) {
            return 1;
        }
        if (v1 < v2) {
            return -1;
        }
        length -= 1;
    }
    return 0;
};

// import { Rpx, scaleByScreen } from "../rn/JDUtils";
let statusBarHeight = 0;
if (Platform.OS == 'ios') {
    // alert(JDNativeSystem.statusBarHeight)
    statusBarHeight = JDNativeSystem.statusBarHeight;
}
else if (Platform.OS == 'android') {
    statusBarHeight = StatusBar.currentHeight || 0;
}
function getRandomId() {
    return `RN-${Platform.OS}--${new Date().getTime()}-${Math.random()}`;
}
const System$3 = {
    isAndroid: Platform.OS === 'android',
    isIOS: Platform.OS === 'ios',
    updateStatusBar: (style) => {
        if (style === 'light') {
            // console.log(`System updateStatusBar light-content`);
            if (Platform.OS == 'ios') {
                StatusBar.setBarStyle('light-content');
            }
            else if (Platform.OS == 'android') {
                JDNativeSystem.setBarMode(false);
            }
        }
        else if (style === 'dark') {
            // console.log(`System updateStatusBar dark-content`);
            if (Platform.OS == 'ios') {
                StatusBar.setBarStyle('dark-content');
            }
            else if (Platform.OS == 'android') {
                JDNativeSystem.setBarMode(true);
            }
        }
    },
    iphoneSafeAreaInsets: JDNativeSystem.iphoneSafeAreaInsets,
    iphoneSafeAreaBottom: JDNativeSystem.iphoneSafeAreaInsets?.bottom || JDNativeSystem.iphoneSafeAreaBottom || 0,
    NavHeight: JDNativeSystem.statusBarHeight + (44),
    topSafeArea: JDNativeSystem.iphoneSafeAreaInsets?.top || JDNativeSystem.iphoneSafeAreaTop || 0,
    bottomSafeArea: JDNativeSystem.iphoneSafeAreaInsets?.bottom || JDNativeSystem.iphoneSafeAreaBottom || 0,
    isDebug: process.env.NODE_ENV === "development",
    // rpx: Rpx,
    hostVersionName: async () => {
        const errorVersion = '0.0.0';
        try {
            const version = await JDNativeSystem.getClientVersion();
            const rightVersion = typeof version === 'string' ? version : errorVersion;
            System$3.hostVersionName = async () => rightVersion;
            return rightVersion;
        }
        catch (error) {
            System$3.hostVersionName = async () => errorVersion;
            return errorVersion;
        }
    },
    _deviceId: '',
    getDeviceId: (force) => {
        if (!force && !!System$3._deviceId) {
            return Promise.resolve(System$3._deviceId);
        }
        const JDNativeSystem = require('@jdreact/jdreact-core-lib/Libraries/JDNativeSystem');
        return new Promise(async (resolve) => {
            const st = setTimeout(() => {
                !!System$3._deviceId && (System$3._deviceId = getRandomId());
                resolve(System$3._deviceId);
            }, 1000);
            if (JDNativeSystem && typeof JDNativeSystem.getDeviceID === 'function') {
                const _deviceId = await JDNativeSystem.getDeviceID();
                System$3._deviceId = typeof _deviceId === 'string' && _deviceId.length > 2 ? _deviceId : getRandomId();
            }
            else {
                System$3._deviceId = getRandomId();
            }
            clearTimeout(st);
            resolve(System$3._deviceId);
        });
    },
    statusBarHeight: statusBarHeight,
    windowWidth: Dimensions.get('window').width,
    windowHeight: Dimensions.get('window').height,
    language: null,
    screenWidth: Dimensions.get('screen').width,
    screenHeight: Dimensions.get('screen').height,
    deviceOrientation: null,
};

let systemInfo = Taro.getSystemInfoSync();
// https://taro.jd.com/docs/api/base/systemInfo/getSystemInfoSync/ --文档
const System$2 = {
    ...systemInfo,
    px2px: n => n * (systemInfo.pixelRatio || 1) / 72,
    // 获取屏幕宽度
    winWidth: systemInfo.windowWidth,
    rpx(value) {
        return Math.floor(value * System$2.winWidth / 750);
    },
    scaleByScreen(value) {
        return Math.floor((value * 2) * System$2.winWidth / 750);
    },
    isAndroid: systemInfo.platform === 'android',
    isIOS: systemInfo.platform === 'ios',
    isHarmonyOS: systemInfo.platform === 'HarmonyOS',
    hostVersionName: () => {
        const errorVersion = '0.0.0';
        try {
            const version = systemInfo.version;
            return version;
        }
        catch (error) { }
        return errorVersion;
    },
    isDebug: systemInfo.system === 'development',
    bottomSafeArea: (systemInfo.screenHeight || systemInfo.windowHeight) - (systemInfo.safeArea?.bottom || 0), //屏幕底部安全距离
    topSafeArea: systemInfo.safeArea?.top, //屏幕顶部安全距离
    windowWidth: systemInfo.windowWidth,
    windowHeight: systemInfo.windowHeight,
    statusBarHeight: systemInfo.statusBarHeight,
    language: systemInfo.language,
    screenWidth: systemInfo.screenWidth,
    screenHeight: systemInfo.screenHeight,
    deviceOrientation: systemInfo.deviceOrientation
};

/**
 * @name multi-platform
 * @description 多端判断工具
 * @author heyongqi10 <heyongqi10@jd.com>
 */
const _env = getEnv();
// 微信小程序环境
_env === ENV_TYPE.WEAPP;
// 百度小程序环境
_env === ENV_TYPE.SWAN;
// 支付宝小程序环境
_env === ENV_TYPE.ALIPAY;
// 抖音小程序环境
_env === ENV_TYPE.TT;
// QQ小程序环境
_env === ENV_TYPE.QQ;
// 京东小程序环境
_env === ENV_TYPE.JD;
// 鸿蒙混合环境
_env === ENV_TYPE.HARMONYHYBRID;
// RN环境
const isReactNative = _env === ENV_TYPE.RN;
const isRN = isReactNative;
// Web环境
_env === ENV_TYPE.WEB;

// @ts-ignore
let System = {};
if (isRN) {
    // @ts-ignore
    System = System$3;
}
else {
    System = System$2;
}
// rn,yong
async function needHighVersion(version) {
    let appVersion = await System.hostVersionName();
    // console.log('appVersion -----', appVersion);
    if (appVersion == '') {
        return false;
    }
    let flag = compareVersions(version); //true表示大于等于商城版本
    setTimeout(() => {
        // @ts-ignore
        needHighVersion = () => flag;
    }, 0);
    return flag;
}
var System$1 = System;

export { System$1 as default, needHighVersion };
