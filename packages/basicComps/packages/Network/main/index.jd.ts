
import { TFetchParams, INetwork } from './INetwork'

// import colorRequest from '@dj-lib/colorapi/build/index.rn';

class Network implements INetwork {
    fetch(params: TFetchParams): Promise<any> {
        const { functionId, body: args, method } = params;
        return new Promise((resolve, reject) => {

            let host!: string
            let host_beta!: string
            // if (Platform.OS === 'android') {
            //     host = 'api.m.jd.com'
            //     // host_beta = 'api.m.jd.care' // debug 预发一
            //     host_beta = 'api.m.jd.care'
            // } else if (Platform.OS === 'ios') {
            //     host = 'http://api.m.jd.com/client.action?functionId='
            //     // host = 'http://beta-api.m.jd.com/client.action?functionId=' // debug
            //     host_beta = 'http://beta-api.m.jd.com/client.action?functionId='
            //     // host_beta = 'http://api.m.jd.care/client.action?functionId='  
            // }

            jd?.mpJdCommonRequest?.({
				method:"POST", 
				functionId:functionId , //调用的方法名称
				data: body, 
				header:{
					source:params?.options?.env || ''
				},
				success(data){
					resolve(data);
				},
				fail(e){
					reject(e)
				},
				compolete(e){
					// console.error('请求完成：',e);
				}
			})

        })
    }

}

const network = new Network();
export default network;

