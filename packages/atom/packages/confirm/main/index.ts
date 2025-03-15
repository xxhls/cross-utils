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
export const showModal = (option) => {
  if (isWeb) {
    return h5Module.showModal(option);
  } else if (isRN) {
    return rnModule.showModal(option);
  } else if (isAliMiniProgram) {
    return alipayModule.showModal(option);
  } else if (isWeChatMiniProgram) {
    return weappModule.showModal(option);
  } else if (isJdMiniProgram) {
    return jdModule.showModal(option);
  } else {
    throw new Error("Qin API：hideLoading暂不支持");
  }
};

export default {
  showModal,
};
