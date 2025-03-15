// const showToast = (options)=>{
//     return wx.showToast(options)
// }
// const hideToast = (options)=>{
//     return wx.hideToast(options)
// }
// export default {
//     showToast,
//     hideToast
// }

import { normalize } from "./utils";
import { HideToastOption, ShowToastOption } from "./types";

export const hideToast = normalize((options?: HideToastOption): void => {
  jd.hideToast(options);
});
export const showToast = normalize((options: ShowToastOption): void => {
  const { icon, title, duration, success, fail, complete } = options;
  const iconMap = {
    success: "success",
    fail: "error",
    none: "none",
    loading: "loading",
  };
  jd.showToast({
    icon: iconMap[icon] || "",
    title,
    duration,
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
});
export default {
  hideToast,
  showToast,
};
