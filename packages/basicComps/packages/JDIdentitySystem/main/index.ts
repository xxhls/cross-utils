import { isWeb, isJdMiniProgram, isRN, isWeChatMiniProgram } from "@test/cross-atom-env";

import * as h5Module from "./index.h5";
import * as jdModule from "./index.jd";
import * as weappModule from "./index.weapp";
import * as rnModule from "./index.rn";
import * as taroModule from "./index.taro";

export const getEid = () => {
  if (isWeb) {
    return h5Module.getEid();
  } else if (isRN) {
    return rnModule.getEid();
  } else if (isWeChatMiniProgram) {
    return weappModule.getEid();
  } else if (isJdMiniProgram) {
    return jdModule.getEid();
  } else {
    return taroModule.getEid();
  }
};

export const getUUID = () => {
  if (isWeb) {
    return h5Module.getUUID();
  } else if (isRN) {
    return rnModule.getUUID();
  } else if (isWeChatMiniProgram) {
    return weappModule.getUUID();
  } else if (isJdMiniProgram) {
    return jdModule.getUUID();
  } else {
    return taroModule.getUUID();
  }
};