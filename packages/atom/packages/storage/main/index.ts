import {
  isAliMiniProgram,
  isWeb,
  isWeChatMiniProgram,
  isJdMiniProgram,
  isRN,
} from "@test/cross-atom-env";
import webModule from "./web/index";
import aliMiniAppModule from "./ali-miniprogram/index";
import weChatModule from "./wechat-miniprogram/index";
import jdModule from "./jd-miniprogram/index";
import rnModule from "./rn";

import {
  GetOrRemoveOptionStruct,
  SetOptionStruct,
  GetStorageRes,
  GetStorageSyncRes,
} from "./types";

export const getStorage = (args: GetOrRemoveOptionStruct): GetStorageRes => {
  if (isWeb) {
    return webModule.getStorage(args);
  } else if (isWeChatMiniProgram) {
    return weChatModule.getStorage(args);
  } else if (isAliMiniProgram) {
    return aliMiniAppModule.getStorage(args);
  } else if (isJdMiniProgram) {
    return jdModule.getStorage(args);
  } else if (isRN) {
    return rnModule.getStorage(args);
  } else {
    throw new Error("Qin API：getStorage暂不支持");
  }
};

export const getStorageSync = (args: string): GetStorageSyncRes => {
  if (isWeb) {
    return webModule.getStorageSync(args);
  } else if (isWeChatMiniProgram) {
    return weChatModule.getStorageSync(args);
  } else if (isAliMiniProgram) {
    return aliMiniAppModule.getStorageSync(args);
  } else if (isJdMiniProgram) {
    return jdModule.getStorageSync(args);
  } else if (isRN) {
    return rnModule.getStorageSync(args);
  } else {
    throw new Error("Qin API：getStorageSync暂不支持");
  }
};

export const setStorage = (args: SetOptionStruct) => {
  if (isWeb) {
    return webModule.setStorage(args);
  } else if (isWeChatMiniProgram) {
    return weChatModule.setStorage(args);
  } else if (isAliMiniProgram) {
    return aliMiniAppModule.setStorage(args);
  } else if (isJdMiniProgram) {
    return jdModule.setStorage(args);
  } else if (isRN) {
    return rnModule.setStorage(args);
  } else {
    throw new Error("Qin API：setStorage暂不支持");
  }
};

export const setStorageSync = (key: string, data: any) => {
  if (isWeb) {
    return webModule.setStorageSync(key, data);
  } else if (isWeChatMiniProgram) {
    return weChatModule.setStorageSync(key, data);
  } else if (isAliMiniProgram) {
    return aliMiniAppModule.setStorageSync(key, data);
  } else if (isJdMiniProgram) {
    return jdModule.setStorageSync(key, data);
  } else if (isRN) {
    return rnModule.setStorageSync(key);
  } else {
    throw new Error("Qin API：setStorageSync暂不支持");
  }
};

export const removeStorage = (args: GetOrRemoveOptionStruct) => {
  if (isWeb) {
    return webModule.removeStorage(args);
  } else if (isWeChatMiniProgram) {
    return weChatModule.removeStorage(args);
  } else if (isAliMiniProgram) {
    return aliMiniAppModule.removeStorage(args);
  } else if (isJdMiniProgram) {
    return jdModule.removeStorage(args);
  } else if (isRN) {
    return rnModule.removeStorage(args);
  } else {
    throw new Error("Qin API：removeStorage暂不支持");
  }
};

export const removeStorageSync = (args: string) => {
  if (isWeb) {
    return webModule.removeStorageSync(args);
  } else if (isWeChatMiniProgram) {
    return weChatModule.removeStorageSync(args);
  } else if (isAliMiniProgram) {
    return aliMiniAppModule.removeStorageSync(args);
  } else if (isJdMiniProgram) {
    return jdModule.removeStorageSync(args);
  } else if (isRN) {
    return rnModule.removeStorageSync(args);
  } else {
    throw new Error("Qin API：removeStorageSync暂不支持");
  }
};

export default {
  getStorage,
  getStorageSync,
  setStorage,
  setStorageSync,
  removeStorage,
  removeStorageSync,
};
