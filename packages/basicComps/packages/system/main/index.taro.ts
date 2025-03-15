import Taro from "@tarojs/taro";

let systemInfo = <Taro.getSystemInfo.Result>Taro.getSystemInfoSync();
// https://taro.jd.com/docs/api/base/systemInfo/getSystemInfoSync/ --文档
const System = {
  ...systemInfo,
  px2px: (n) => (n * (systemInfo.pixelRatio || 1)) / 72,
  // 获取屏幕宽度
  winWidth: systemInfo.windowWidth,
  rpx(value) {
    return Math.floor((value * System.winWidth) / 750);
  },
  scaleByScreen(value) {
    return Math.floor((value * 2 * System.winWidth) / 750);
  },
  isAndroid: systemInfo.platform === "android",
  isIOS: systemInfo.platform === "ios",
  isHarmonyOS: systemInfo.platform === "HarmonyOS",

  hostVersionName: () => {
    const errorVersion = "0.0.0";
    try {
      const version = systemInfo.version;
      return version;
    } catch (error) {}
    return errorVersion;
  },
  isDebug: systemInfo.system === "development",
  bottomSafeArea:
    (systemInfo.screenHeight || systemInfo.windowHeight) -
    (systemInfo.safeArea?.bottom || 0), //屏幕底部安全距离
  topSafeArea: systemInfo.safeArea?.top, //屏幕顶部安全距离
  windowWidth: systemInfo.windowWidth,
  windowHeight: systemInfo.windowHeight,
  statusBarHeight: systemInfo.statusBarHeight,
  language: systemInfo.language,
  screenWidth: systemInfo.screenWidth,
  screenHeight: systemInfo.screenHeight,
  deviceOrientation: systemInfo.deviceOrientation,
};

export default System;
