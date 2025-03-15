import { isDingdingMiniapp } from '@atom-shared/miniappEnvApp';
import { styleIn } from '@atom-shared/styleOptions';
import { CONTAINER_NAME } from '@atom-shared/constant';


// 参数抹平
const result = (key: string, data: any) => {
    const args = {
        key,
        data
    }
    if (isDingdingMiniapp) {
        dd.setStorageSync(styleIn(args, CONTAINER_NAME.ALIPAY))
    } else {
        my.setStorageSync(styleIn(args, CONTAINER_NAME.ALIPAY))
    }
}

const setStorageSync = (key: string, data: any) => result(key, data);

export default setStorageSync;
