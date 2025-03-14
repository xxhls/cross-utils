import { isWeb } from "@shared/multi-platform";
import h5Module from "./index.h5";
import taroModule from "./index.taro";

type CookieModule = typeof h5Module | typeof taroModule;

let cookie: CookieModule | undefined = undefined;

cookie = isWeb ? h5Module : taroModule;

export default cookie;
export type { CookieModule };
