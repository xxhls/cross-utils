import {
  isWeb,
  isRN,
  isAliMiniProgram,
  isWeChatMiniProgram,
  isJdMiniProgram,
} from "@test/cross-atom-env";
import h5Module from "./index.h5";
import jdModule from "./index.jd";
import weappModule from "./index.weapp";
import alipayModule from "./index.alipay";
import rnModule from "./index.rn";
export const hideToast = (option) => {
  if (isWeb) {
    return h5Module.hideToast(option);
  } else if (isRN) {
    return rnModule.hideToast(option);
  } else if (isAliMiniProgram) {
    return alipayModule.hideToast(option);
  } else if (isWeChatMiniProgram) {
    return weappModule.hideToast(option);
  } else if (isJdMiniProgram) {
    return jdModule.hideToast(option);
  } else {
    throw new Error("Qin API：hideToast暂不支持");
  }
};

export const showToast = (option) => {
  if (isWeb) {
    return h5Module.showToast(option);
  } else if (isRN) {
    return rnModule.showToast(option);
  } else if (isAliMiniProgram) {
    return alipayModule.showToast(option);
  } else if (isWeChatMiniProgram) {
    return weappModule.showToast(option);
  } else if (isJdMiniProgram) {
    return jdModule.showToast(option);
  } else {
    throw new Error("Qin API：showToast暂不支持");
  }
};

export default {
  showToast,
  hideToast,
};
