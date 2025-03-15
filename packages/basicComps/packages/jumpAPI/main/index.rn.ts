import { JDJumping } from "@jdreact/jdreact-core-lib";
import _ from "lodash";
const Utils = {
  debounce: (func: Function) => {
    if (_.isFunction(func)) {
      func();
    }
  },
  validateString: (value: string) => {
    if (_.isString(value) && value.length > 0) {
      return true;
    } else {
      return false;
    }
  },
};

const jumpRN = (jumpLink) => {
  // console.log("跳转协议11：", jumpLink);
  if (!Utils.validateString(jumpLink)) {
    return;
  }
  if (jumpLink.startsWith("http")) {
    JDJumping.jumpToWeb(jumpLink);
  }
  // 微信小程序
  else if (jumpLink.startsWith("/pages/")) {
    JDJumping.jumpToWxMp(jumpLink);
  } else {
    // console.log("进跳转跳转协议：", jumpLink);
    JDJumping.jumpToOpenapp(jumpLink);
  }
};

const jumpAPI = {
  jumpToNative: jumpRN, //废弃，请使用jump方法替代，目前没删除，是为了保留微信域中的跳转，保证别报错
  jumpToWeb: jumpRN, //废弃，请使用jump方法替代，目前没删除，是为了保留微信域中的跳转，保证别报错
  jump: jumpRN,
};

export default jumpAPI;
