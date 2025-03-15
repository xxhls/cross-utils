// const showLoading = (options)=>{
//     return my.showLoading(options)
// }
// const hideLoading = (options)=>{
//     return my.hideLoading(options)
// }
// export default {
//     showLoading,
//     hideLoading
// }

import { normalizeHide,normalizeShow } from './components/common';
import { CONTAINER_NAME } from '@atom-shared/constant';

export const hideLoading = normalizeHide((args) => ( my.hideLoading(args)), CONTAINER_NAME.ALIPAY);

export const showLoading = normalizeShow((args) => ( my.showLoading(args)), CONTAINER_NAME.ALIPAY);
export default {
    showLoading,
    hideLoading
}