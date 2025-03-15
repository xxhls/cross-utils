import { Platform } from 'react-native'
import { TFetchParams, INetwork } from './INetwork'
import { JDNetwork } from '@jdreact/jdreact-core-lib'
import { dataConvert } from '../../utils/dataUtils';

// import colorRequest from '@dj-lib/colorapi/build/index.rn';

class Network implements INetwork {
    fetch(params: TFetchParams): Promise<any> {
        const { functionId, body: args, method } = params;
        return new Promise((resolve, reject) => {

            let host!: string
            let host_beta!: string
            if (Platform.OS === 'android') {
                host = 'api.m.jd.com'
                // host_beta = 'api.m.jd.care' // debug 预发一
                host_beta = 'api.m.jd.care'
            } else if (Platform.OS === 'ios') {
                host = 'http://api.m.jd.com/client.action?functionId='
                // host = 'http://beta-api.m.jd.com/client.action?functionId=' // debug
                host_beta = 'http://beta-api.m.jd.com/client.action?functionId='
                // host_beta = 'http://api.m.jd.care/client.action?functionId='  
            }

            JDNetwork.fetch(functionId, host, host_beta, JSON.stringify(args), method?.toLowerCase?.() || 'get', true, {
                usehttpError: true
            })
                .then((resolve))
                .catch((error) => {
                    error = dataConvert.parseJson(error);
                    if (error?.domain && error.code?.startsWith?.('E')) {
                        const len = 1 + error.domain.length;
                        error.code = error.code.slice(len);
                        error.message = error?.userInfo?.ServerErrorDescriptionKey;
                    }
                    if (error == 4 || error.code === '-1005') {
                        const message = '网络超时，请重试~'
                        // 代表网络超时,
                        return reject({
                            code: 4,
                            message,
                            msg: message
                        })
                    }
                    if (typeof error !== 'object') {
                        const message = '系统繁忙，请稍后再试[100000]~'
                        return reject({
                            code: error,
                            message,
                            msg: message
                        })
                    }
                    reject(error);
                })

        })
    }

}

const network = new Network();
export default network;

