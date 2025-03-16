import { isWeb, isJdMiniProgram } from "@test/cross-atom-env";
import h5Module from "./index.h5";
import taroModule from "./index.taro";
import jdModule from "./index.jd";

const taishan = {
  custom: (opt, pid) => {
    if (isWeb) {
      return h5Module.custom(opt, pid);
    }
    if (isJdMiniProgram) {
      return jdModule.custom(opt, pid);
    }
    return taroModule.custom(opt, pid);
  },
  error: (error, pid) => {
    if (isWeb) {
      return h5Module.error(error, pid);
    }
    if (isJdMiniProgram) {
      return jdModule.error(error, pid);
    }
    return taroModule.error(error, pid);
  },
  api: (opt, pid) => {
    if (isWeb) {
      return h5Module.api(opt, pid);
    }
    if (isJdMiniProgram) {
      return jdModule.api(opt, pid);
    }
    return taroModule.api(opt);
  },
  userInfo: (opt) => {
    if (isWeb) {
      return h5Module.userInfo(opt);
    }
    if (isJdMiniProgram) {
      return jdModule.userInfo(opt);
    }
    return taroModule.userInfo(opt);
  },
};

export default taishan;
