/**
 * 跳转静态信息配置
 * id 代表跳转链接； 京东App内，有router和openApp协议；京购小程序内，路径path；H5内，是https链接
 * version 代表跳转链接限制版本
 */

import { isHarmonyOS, isJDApp } from "../../Platform";

const configSetting = {
  newAddress: {
    jd: {
      url: "router://JDBWebAddressModule/pushWebView",
      version: "",
    },
    weapp: {
      url: "",
    },
    h5: {
      url: "router://JDBWebAddressModule/pushWebView",
    },
  },

  // 20240319 切换H5路由，未来全量稳定时，可删除showAddressSelectPage配置；
  showAddressSelectPageNew: {
    jd: {
      url: "router://JDBWebAddressModule/showAddressView",
      version: "",
    },
    HarmonyOS: {
      url: "router://JDBizHybridModule/openURL",
    },
    weapp: {
      url: "",
    },
    h5: {},
  },
  // router://JDAddressModule/getCacheAddress
  getCacheAddress: {
    jd: {
      url: "router://JDAddressCacheModule/getAddressCache",
      version: "",
    },
    HarmonyOS: {
      url: "router://JDAddressCacheModule/getAddressCache",
    },
    weapp: {
      url: "",
    },
    h5: {},
  },
  getLocationAddress: {
    jd: {
      url: "router://JDAddressModule/getLocationAddress",
      version: "",
    },
    HarmonyOS: {
      url: "",
    },
    weapp: {
      url: "",
    },
    h5: {},
  },
  openAddressListPage: {
    jd: {
      url: "router://JDBWebAddressModule/pushWebView",
      version: "",
    },
    weapp: {
      url: "",
    },
    h5: {},
  },
};

/**
 * @description: 获取跳转配置信息
 * @param {*} name 跳转页面key
 * @return {*}
 */

const getConfigSetting = (name: string) => {
  if (name) {
    const item = configSetting[name];
    if (isJDApp) {
      return item ? item.jd : undefined;
    }
    if (isHarmonyOS) {
      return item ? item.HarmonyOS : undefined;
    }
    if (process.env.TARO_ENV === "weapp") {
      return item ? item.weapp : undefined;
    }
    return item ? item.h5 : undefined;
  }
  return undefined;
};

export { getConfigSetting };
