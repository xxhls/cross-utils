import compareVersions from "./compareVersions";
import { default as RNSystem } from "./index.rn";
import { default as TaroSystem } from "./index.taro";

const System: typeof TaroSystem = {} as any & typeof RNSystem;
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
