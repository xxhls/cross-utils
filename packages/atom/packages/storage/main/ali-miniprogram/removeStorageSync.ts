import { isDingdingMiniapp } from '@atom-shared/miniappEnvApp';
import { aliIn } from '@atom-shared/styleOptions';
import { CONTAINER_NAME } from '@atom-shared/constant';

const removeStorageSync = (args) => (isDingdingMiniapp ? dd.removeStorageSync(aliIn(args, CONTAINER_NAME.ALIPAY)) : my.removeStorageSync(aliIn(args, CONTAINER_NAME.ALIPAY)));

export default removeStorageSync;
