import compareVersions from "./compareVersions";
import { default as RNSystem } from "./index.rn";
import { default as TaroSystem } from "./index.taro";
import { isRN } from "@shared/multi-platform";

// @ts-ignore
let System: typeof TaroSystem = {} as any;

if (isRN) {
  // @ts-ignore
  System = RNSystem;
} else {
  System = TaroSystem;
}

// rn,yong
export async function needHighVersion(version) {
  let appVersion = await System.hostVersionName();
  // console.log('appVersion -----', appVersion);
  if (appVersion == "") {
    return false;
  }
  let flag = compareVersions(version); //true表示大于等于商城版本
  setTimeout(() => {
    // @ts-ignore
    needHighVersion = () => flag;
  }, 0);
  return flag;
}

export default System;
