import {
  isWeb,
  isRN,
  isAliMiniProgram,
  isWeChatMiniProgram,
  isJdMiniProgram,
} from "@test/cross-atom-env";
import { RequestOptions } from "./types";
import h5Module from "./index.h5";
import jdModule from "./index.jd";
import weappModule from "./index.weapp";
import alipayModule from "./index.alipay";
import rnModule from "./index.rn";
export default (options: RequestOptions) => {
  if (isWeb) {
    return h5Module(options);
  } else if (isRN) {
    return rnModule(options);
  } else if (isAliMiniProgram) {
    return alipayModule(options);
  } else if (isWeChatMiniProgram) {
    return weappModule(options);
  } else if (isJdMiniProgram) {
    return jdModule(options);
  } else {
    throw new Error("Uni API：request暂不支持");
  }
};
