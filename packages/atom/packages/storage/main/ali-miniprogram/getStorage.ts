import { isDingdingMiniapp } from '@atom-shared/miniappEnvApp';
import { CONTAINER_NAME } from '@atom-shared/constant';
import { normalize } from '../common';

const getStorage = normalize.getStorage((args) => (isDingdingMiniapp ? dd.getStorage(args) : my.getStorage(args)), CONTAINER_NAME.ALIPAY);

export default getStorage;
