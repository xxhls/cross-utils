import { Platform, StatusBar, Dimensions } from "react-native";
import { JDNativeSystem } from "@jdreact/jdreact-core-lib";
// import { Rpx, scaleByScreen } from "../rn/JDUtils";

let statusBarHeight = 0;
if (Platform.OS == "ios") {
  // alert(JDNativeSystem.statusBarHeight)
  statusBarHeight = JDNativeSystem.statusBarHeight;
} else if (Platform.OS == "android") {
  statusBarHeight = StatusBar.currentHeight || 0;
}

function getRandomId() {
  return `RN-${Platform.OS}--${Date.now()}-${Math.random()}`;
}

const System = {
  isAndroid: Platform.OS === "android",
  isIOS: Platform.OS === "ios",

  updateStatusBar: (style: "light" | "dark") => {
    if (style === "light") {
      // console.log(`System updateStatusBar light-content`);
      if (Platform.OS == "ios") {
        StatusBar.setBarStyle("light-content");
      } else if (Platform.OS == "android") {
        JDNativeSystem.setBarMode(false);
      }
    } else if (style === "dark") {
      // console.log(`System updateStatusBar dark-content`);
      if (Platform.OS == "ios") {
        StatusBar.setBarStyle("dark-content");
      } else if (Platform.OS == "android") {
        JDNativeSystem.setBarMode(true);
      }
    }
  },
  iphoneSafeAreaInsets: JDNativeSystem.iphoneSafeAreaInsets,
  iphoneSafeAreaBottom:
    JDNativeSystem.iphoneSafeAreaInsets?.bottom ||
    JDNativeSystem.iphoneSafeAreaBottom ||
    0,
  NavHeight: JDNativeSystem.statusBarHeight + 44,
  topSafeArea:
    JDNativeSystem.iphoneSafeAreaInsets?.top ||
    JDNativeSystem.iphoneSafeAreaTop ||
    0,
  bottomSafeArea:
    JDNativeSystem.iphoneSafeAreaInsets?.bottom ||
    JDNativeSystem.iphoneSafeAreaBottom ||
    0,
  isDebug: process.env.NODE_ENV === "development",
  // rpx: Rpx,
  hostVersionName: async () => {
    const errorVersion = "0.0.0";
    try {
      const version = await JDNativeSystem.getClientVersion();
      const rightVersion = typeof version === "string" ? version : errorVersion;
      System.hostVersionName = async () => rightVersion;
      return rightVersion;
    } catch {
      System.hostVersionName = async () => errorVersion;
      return errorVersion;
    }
  },
  _deviceId: "",
  getDeviceId: (force?: boolean): Promise<string> => {
    if (!force && !!System._deviceId) {
      return Promise.resolve(System._deviceId);
    }
    const JDNativeSystem = require("@jdreact/jdreact-core-lib/Libraries/JDNativeSystem");
    return new Promise(async (resolve) => {
      const st = setTimeout(() => {
        !!System._deviceId && (System._deviceId = getRandomId());
        resolve(System._deviceId);
      }, 1000);
      if (JDNativeSystem && typeof JDNativeSystem.getDeviceID === "function") {
        const _deviceId = await JDNativeSystem.getDeviceID();
        System._deviceId =
          typeof _deviceId === "string" && _deviceId.length > 2
            ? _deviceId
            : getRandomId();
      } else {
        System._deviceId = getRandomId();
      }
      clearTimeout(st);
      resolve(System._deviceId);
    });
  },
  statusBarHeight: statusBarHeight,
  windowWidth: Dimensions.get("window").width,
  windowHeight: Dimensions.get("window").height,
  language: null,
  screenWidth: Dimensions.get("screen").width,
  screenHeight: Dimensions.get("screen").height,
  deviceOrientation: null,
};

export default System;
