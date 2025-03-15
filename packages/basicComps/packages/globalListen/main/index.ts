import { isRN } from "@test/cross-atom-env";

import * as rnModule from "./index.rn";
import * as taroModule from "./index.taro";

export const GLOBAL_APPSTATE_EVENT = isRN ? rnModule.GLOBAL_APPSTATE_EVENT : "";

export const subscribeAppState = (callback) => {
  if (isRN) {
    return rnModule.subscribeAppState(callback);
  } else {
    return taroModule.subscribeAppState(callback);
  }
};

export const registerGlobalAppState = (initProps) => {
  if (isRN) {
    return rnModule.registerGlobalAppState(initProps);
  } else {
    return {};
  }
};

export const unRegister = () => {
  if (isRN) {
    return rnModule.unRegister();
  } else {
    return {};
  }
};
