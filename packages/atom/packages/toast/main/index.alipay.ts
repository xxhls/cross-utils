import { normalize } from './utils';
import { HideToastOption,ShowToastOption } from './types';

export const hideToast = normalize((options?: HideToastOption): void => {
  return my.hideToast(options);
});
export const showToast = normalize((options: ShowToastOption): void => {
    const { icon, title, duration, success, fail, complete } = options;
    return my.showToast({
        type: icon,
        content: title,
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
    showToast
};