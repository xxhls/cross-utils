import { isWeb } from "@shared/multi-platform";
import * as h5Module from "./index.h5";
import * as taroModule from "./index.taro";

type QueryModule = typeof h5Module | typeof taroModule;

let query: QueryModule | undefined = undefined;

query = isWeb ? h5Module : taroModule;

export default query;
export type { QueryModule };
