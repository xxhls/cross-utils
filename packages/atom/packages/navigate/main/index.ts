import {
  isAliMiniProgram,
  isWeb,
  isWeChatMiniProgram,
  isJdMiniProgram,
  isRN,
} from "@test/cross-atom-env";

import * as h5 from "./index.h5";
import * as alipay from "./index.alipay";
import * as jd from "./index.jd";
import * as weapp from "./index.weapp";
import * as rn from "./index.rn";

let module: any;
if (isWeb) {
  module = h5.default;
} else if (isAliMiniProgram) {
  module = alipay.default;
} else if (isWeChatMiniProgram) {
  module = weapp.default;
} else if (isJdMiniProgram) {
  module = jd.default;
} else if (isRN) {
  module = rn.default;
} else {
  throw new Error("Qin API：暂不支持");
}

export const { navigateTo, redirectTo, switchTab, navigateBack } = module;

export default module;
