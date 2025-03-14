import { isReactNative } from "@shared/multi-platform";
import rnModule from "./index.rn";
import taroModule from "./index.taro";

type SystemModule = typeof rnModule | typeof taroModule;

let system: SystemModule | undefined = undefined;

system = isReactNative ? rnModule : taroModule;

export default system;
export type { SystemModule };
