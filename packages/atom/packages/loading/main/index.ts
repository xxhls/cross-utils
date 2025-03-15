import { isWeb, isRN, isAliMiniProgram, isWeChatMiniProgram, isJdMiniProgram } from '@test/cross-atom-env'
import h5Module from "./index.h5";
import jdModule from "./index.jd";
import weappModule from "./index.weapp";
import alipayModule from "./index.alipay";
import rnModule from './index.rn'
export const hideLoading = (option) => {
  if (isWeb) {
    return h5Module.hideLoading(option);
  } else if (isRN) {
    return rnModule.hideLoading(option);
  } else if (isAliMiniProgram) {
    return alipayModule.hideLoading(option);
  } else if (isWeChatMiniProgram) {
    return weappModule.hideLoading(option);
  } else if (isJdMiniProgram) {
    return jdModule.hideLoading(option);
  } else {
    throw new Error("Qin API：hideLoading暂不支持");
  }
};

export const showLoading = (option) => {
  if (isWeb) {
    return h5Module.showLoading( option);
  } else if (isRN) {
    return rnModule.showLoading(option);
  } else if (isAliMiniProgram) {
    return alipayModule.showLoading(option);
  } else if (isWeChatMiniProgram) {
    return weappModule.showLoading(option);
  } else if (isJdMiniProgram) {
    return jdModule.showLoading(option);
  } else {
    throw new Error("Qin API：showLoading暂不支持");
  }
};

export default {
  showLoading,
  hideLoading
};
