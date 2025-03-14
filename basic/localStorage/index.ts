import { isWeb, isReactNative } from "@shared/multi-platform";

import h5Module from "./index.h5";
import rnModule from "./index.rn";

type LocalStorageModule = typeof h5Module | typeof rnModule;

let localStorage: LocalStorageModule | undefined = undefined;

if (isWeb) {
  localStorage = h5Module;
} else if (isReactNative) {
  localStorage = rnModule;
}

export default localStorage;
