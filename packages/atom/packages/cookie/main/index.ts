import { CookieAttributes } from "js-cookie";
import h5Module from "./index.h5";
import rnModule from "./index.rn";

import { isWeb, isRN } from "@test/cross-atom-env";

export const setCookie = (
  key: string,
  val: string | object,
  option: CookieAttributes
) => {
  if (isWeb) {
    return h5Module.setCookie(key, val, option);
  } else if (isRN) {
    return rnModule.setCookie(key, val, option);
  } else {
    throw new Error("Qin API：setCookie暂不支持");
  }
};

export const getCookie = (key: string) => {
  if (isWeb) {
    return h5Module.getCookie(key);
  } else if (isRN) {
    return rnModule.getCookie(key);
  } else {
    throw new Error("Qin API：getCookie暂不支持");
  }
};

export const removeCookie = (key: string, option: CookieAttributes) => {
  if (isWeb) {
    return h5Module.removeCookie(key, option);
  } else if (isRN) {
    return rnModule.removeCookie(key, option);
  } else {
    throw new Error("Qin API：removeCookie暂不支持");
  }
};

export const getAllCookie = () => {
  if (isWeb) {
    return h5Module.getAllCookie();
  } else if (isRN) {
    return rnModule.getAllCookie();
  } else {
    throw new Error("Qin API：getAllCookie暂不支持，仅支持h5、RN");
  }
};

export default {
  setCookie,
  getCookie,
  removeCookie,
  getAllCookie,
};
