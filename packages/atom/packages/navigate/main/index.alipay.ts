import {
  IPushOptions,
  IReplaceOptions,
  ISwitchTabOptions,
  IGoOptions,
} from "./types";
import { normalize } from "./common";
import { CONTAINER_NAME } from "@atom-shared/constant";

export const navigateTo = normalize.push((options: IPushOptions) => {
  const { url, events, success, fail, complete } = options;
  my.navigateTo({
    url,
    events,
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
}, CONTAINER_NAME.ALIPAY);

export const redirectTo = normalize.replace((options?: IReplaceOptions) => {
  const { url, success, fail, complete } = options || {};
  my.redirectTo({
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
}, CONTAINER_NAME.ALIPAY);

export const switchTab = normalize.switchTab((options: ISwitchTabOptions) => {
  my.switchTab(options);
}, CONTAINER_NAME.ALIPAY);

const navigateBack = normalize.back((options?: IGoOptions) => {
  const { data, success, fail, complete } = options || {};
  my.navigateBack({
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
}, CONTAINER_NAME.ALIPAY);

export default {
  navigateTo,
  redirectTo,
  switchTab,
  navigateBack,
};
