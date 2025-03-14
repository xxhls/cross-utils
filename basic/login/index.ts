import { isWeb, isReactNative, isWxMiniProgram } from "@shared/multi-platform";
import h5Module from "./index.h5";
import rnModule from "./index.rn";
import wxModule from "./index.weapp";
import taroModule from "./index.taro";

type LoginModule =
  | typeof h5Module
  | typeof rnModule
  | typeof wxModule
  | typeof taroModule;

let login: LoginModule | undefined = undefined;

if (isWeb) {
  login = h5Module;
} else if (isReactNative) {
  login = rnModule;
} else if (isWxMiniProgram) {
  login = wxModule;
} else {
  login = taroModule;
}

export default login;
