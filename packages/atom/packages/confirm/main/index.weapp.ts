import { normalize } from './utils';
import { CONTAINER_NAME } from '@atom-shared/constant';
const showModal = normalize((args) => wx.showModal(args), CONTAINER_NAME.WECHAT);
export {
    showModal
  };
  export default {
    showModal
  };
