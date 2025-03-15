import { isWeb } from "@test/cross-atom-env";

import * as h5Module from "./index.h5";
import * as taroModule from "./index.taro";

export const getQueryParam = (param) => {
  if (isWeb) {
    return h5Module.getQueryParam(param);
  } else {
    return taroModule.getQueryParam(param);
  }
};

export const updateQueryParam = (param, newValue) => {
  if (isWeb) {
    return h5Module.updateQueryParam(param, newValue);
  } else {
    return {};
  }
};

export const appendQeury = (queryOption = {}, url?) => {
  if (isWeb) {
    return h5Module.appendQeury(queryOption, url);
  } else {
    return {};
  }
};

export const hasUrlParameter = (url, paramName) => {
  if (isWeb) {
    return h5Module.hasUrlParameter(url, paramName);
  } else {
    return {};
  }
};

export const addUrlParameter = (url, paramName, paramValue) => {
  if (isWeb) {
    return h5Module.addUrlParameter(url, paramName, paramValue);
  } else {
    return {};
  }
};
