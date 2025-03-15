import {
  IPushOptions,
  IReplaceOptions,
  ISwitchTabOptions,
  IGoOptions,
} from "./types";
import { normalize } from "./common";
import { CONTAINER_NAME } from "@atom-shared/constant";

export const navigateTo = normalize.push((options: IPushOptions) => {
  const { url, success, fail, complete } = options;
  wx.navigateTo({
    url,
    success() {
      success && success();
    },
    fail(res) {
      fail && fail(res);
    },
    complete(res) {
      complete && complete(res);
    },
  });
}, CONTAINER_NAME.WECHAT);

export const redirectTo = normalize.replace((options?: IReplaceOptions) => {
  const { url, success, fail, complete } = options || {};
  wx.redirectTo({
    url,
    success() {
      success && success();
    },
    fail(res) {
      fail && fail(res);
    },
    complete(res) {
      complete && complete(res);
    },
  });
}, CONTAINER_NAME.WECHAT);

export const switchTab = normalize.switchTab((options: ISwitchTabOptions) => {
  wx.switchTab(options);
}, CONTAINER_NAME.WECHAT);

const navigateBack = normalize.back((options?: IGoOptions) => {
  const { data, success, fail, complete } = options || {};
  wx.navigateBack({
    delta: data,
    success() {
      success && success();
    },
    fail(res) {
      fail && fail(res);
    },
    complete(res) {
      complete && complete(res);
    },
  });
}, CONTAINER_NAME.WECHAT);

export default {
  navigateTo,
  redirectTo,
  switchTab,
  navigateBack,
};
