// const showLoading = (options)=>{
//     return jd.showLoading(options)
// }
// const hideLoading = (options)=>{
//     return jd.hideLoading(options)
// }
// export default {
//     showLoading,
//     hideLoading
// }

import { normalizeHide,normalizeShow } from './components/common';
import { CONTAINER_NAME } from '@atom-shared/constant';

export const hideLoading = normalizeHide((args) => jd.hideLoading(args), CONTAINER_NAME.JD);
export const showLoading = normalizeShow((args) => jd.showLoading(args), CONTAINER_NAME.JD);
export default {
    showLoading,
    hideLoading
}