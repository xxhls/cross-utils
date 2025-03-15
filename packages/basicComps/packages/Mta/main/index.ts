import { isWeb, isRN } from "@test/cross-atom-env"
import h5Module from "./index.h5";
import rnModule from "./index.rn";
import taroModule from "./index.taro";

const mta = isWeb ? h5Module : isRN ? rnModule : taroModule || {};
export default mta;
