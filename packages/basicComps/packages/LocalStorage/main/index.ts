import { isWeb, isRN } from "@test/cross-atom-env";

import h5Module from "./index.h5";
import rnModule from "./index.rn";

export const getItem = (key: string) => {
  if (isWeb) {
    return h5Module.getItem(key);
  } else if (isRN) {
    return rnModule.getItem(key);
  } else {
    return Promise.resolve(null);
  }
};

export const setItem = (key: string, value: string) => {
  if (isWeb) {
    return h5Module.setItem(key, value);
  } else if (isRN) {
    return rnModule.setItem(key, value);
  } else {
    return Promise.resolve();
  }
};

export const removeItem = (key: string) => {
  if (isWeb) {
    return h5Module.removeItem(key);
  } else if (isRN) {
    return rnModule.removeItem(key);
  } else {
    return Promise.resolve();
  }
};
