import { isWeb, isJdMiniProgram } from "@shared/multi-platform";

import h5Module from "./index.h5";
import jdModule from "./index.jd";
import taroModule from "./index.taro";

type TaishanModule = typeof h5Module | typeof jdModule | typeof taroModule;

let taishan: TaishanModule | undefined = undefined;

if (isWeb) {
  taishan = h5Module;
} else if (isJdMiniProgram) {
  taishan = jdModule;
} else {
  taishan = taroModule;
}

export default taishan;
