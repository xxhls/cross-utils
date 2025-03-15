// const showLoading = (options)=>{
//     return wx.showLoading(options)
// }
// const hideLoading = (options)=>{
//     return wx.hideLoading(options)
// }
// export default {
//     showLoading,
//     hideLoading
// }

import { normalizeHide, normalizeShow } from "./components/common";
import { CONTAINER_NAME } from "@atom-shared/constant";

export const hideLoading = normalizeHide(
  (args) => wx.hideLoading(args),
  CONTAINER_NAME.WECHAT,
);
export const showLoading = normalizeShow(
  (args) => wx.showLoading(args),
  CONTAINER_NAME.WECHAT,
);
export default {
  showLoading,
  hideLoading,
};
