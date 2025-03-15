import { isWeb, isRN, isWeChatMiniProgram } from "@test/cross-atom-env";

import * as h5Module from "./index.h5";
import rnModule from "./index.rn";
import taroModule from "./index.taro";
import weappModule from "./index.weapp";

export const goToLogin = (opts) => {
  if (isWeb) {
    return h5Module.goToLogin(opts);
  } else if (isRN) {
    return rnModule.doLogin();
  } else if (isWeChatMiniProgram) {
    return weappModule.doLogin();
  } else {
    return taroModule.doLogin();
  }
};
