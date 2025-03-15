import { GetOrRemoveSyncOptionStruct } from '../types';
import { aliIn } from '@atom-shared/styleOptions';
import { CONTAINER_NAME } from '@atom-shared/constant';
  
const removeStorageSync = (args: string) => {
  const argsIn = aliIn(args, CONTAINER_NAME.JD);
  return jd.removeStorageSync(argsIn);
};

export default removeStorageSync;
