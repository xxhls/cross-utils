import { CONTAINER_NAME } from '@atom-shared/constant';
import { normalize } from './utils';

const confirm = (args) => {
  const params = {
    ...args,
    confirmButtonText: args.confirmText,
    cancelButtonText: args.cancelText,
  };
  // 兼容  showCancel场景，是否显示取消按钮：默认是true的时候是显示取消的。如果false  则调用my.alert({})
  if(Object.prototype.hasOwnProperty.call(args, 'showCancel') && (args.showCancel).toString() === 'false'){
    const { confirmText } = args;
    const paramsAlert = {
      ...args,
      buttonText: confirmText
    }
    my.alert(paramsAlert);
  }
  my.confirm(params);
};
const showModal = normalize(confirm, CONTAINER_NAME.ALIPAY);

export {
  showModal
};
export default {
  showModal
};