import { isAliMiniProgram, isWeb, isWeChatMiniProgram, isJdMiniProgram ,isRN} from '@test/cross-atom-env';
import * as web from './index.h5'
import * as ali from './index.alipay'
import * as jd from './index.jd'
import * as wx from './index.weapp'
import * as rn from './index.rn'

let module: any;
if (isWeb) {
    module = web
} else if (isWeChatMiniProgram) {
    module = wx
} else if (isAliMiniProgram) {
    module = ali
} else if (isJdMiniProgram) {
    module = jd
} else if (isRN) {
    module = rn
} else {
    throw new Error('Qin API：暂不支持');
}

export default module