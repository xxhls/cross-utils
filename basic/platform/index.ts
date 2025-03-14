import { isWeb, isReactNative } from "@shared/multi-platform";
import * as rnModule from "./index.rn";
import * as taroModule from "./index.taro";
import * as h5Module from "./index.h5";

type PlatformModule = typeof rnModule | typeof taroModule | typeof h5Module;

let platform: PlatformModule | undefined = undefined;

platform = isWeb ? h5Module : isReactNative ? rnModule : taroModule;

export default platform;
export type { PlatformModule };

