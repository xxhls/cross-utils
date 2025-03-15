import { GetOrRemoveSyncOptionStruct } from '../types';
import { aliIn, styleIn } from '@atom-shared/styleOptions';
import { CONTAINER_NAME } from '@atom-shared/constant';

const removeStorageSync = (args: string) => {
  if (Object.prototype.toString.call(args) !== '[object Object]') {
    throw new Error('the Function need a param of Object type');
  }
  const argsIn = aliIn(args, CONTAINER_NAME.WEB) as string;
  if (!argsIn) {
    throw new Error('the first param of this Function must contain a property named "key"');
  }
  window.localStorage.removeItem(argsIn);
};

export default removeStorageSync;
