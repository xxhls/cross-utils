import { isRN } from "@test/cross-atom-env";

import taroModule from "./index.taro";
import rnModule from "./index.rn";

const native = {
  getCapsuleShow: () => {
    if (isRN) {
      return rnModule.getCapsuleShow();
    }
    return taroModule.getCapsuleShow();
  },
  getCapsuleHide: () => {
    if (isRN) {
      return rnModule.getCapsuleHide();
    }
    return taroModule.getCapsuleHide();
  },
};

export default native;
