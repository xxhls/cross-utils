import { normalize } from '../common';
import { CONTAINER_NAME } from '@atom-shared/constant';

const getStorage = normalize.getStorage((args) => wx.getStorage(args), CONTAINER_NAME.WECHAT);

export default getStorage;
