import { isH5 } from "@shared/multi-platform";

import h5Cookie from "./index.h5";
import taroCookie from "./index.taro";

let cookie = undefined;

if (isH5) {
  cookie = h5Cookie;
} else {
  cookie = taroCookie;
}

export default cookie;
