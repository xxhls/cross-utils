import { isWeb } from "@test/cross-atom-env";

import h5Module from "./index.h5";
import taroModule from "./index.taro";

const cookie = {
  set: (name, value, daysToLive?) => {
    if (isWeb) {
      return h5Module.set(name, value, daysToLive);
    } else {
      return taroModule.set(name, value);
    }
  },
  get: (name) => {
    if (isWeb) {
      return h5Module.get(name);
    } else {
      return taroModule.get(name);
    }
  },
  del: (name) => {
    if (isWeb) {
      return h5Module.del(name);
    } else {
      return taroModule.del(name);
    }
  },
  getAll: () => {
    if (isWeb) {
      return h5Module.getAll();
    } else {
      return taroModule.getAll();
    }
  },
};

export default cookie;
