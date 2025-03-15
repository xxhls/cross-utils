import { IMta } from "./IMta";
import { ClickParam, ExposureParam, pvParam } from "./Report";


const mta = (() => {
    if (process.env.TARO_ENV == 'weapp') {

        // 这里需要引入京东微信小程序提供的sdk
        // eslint-disable-next-line global-require
        const log = require('./weixinAppReport')

        return log
    }
    if (process.env.TARO_ENV == 'jd') {
        return {
            click: (params: ClickParam) => {
                jd?.sendClickData?.(params);
            },
            pv: (params: pvParam) => {
                jd?.sendPvData?.(params);
            },
            exposure: (params: ExposureParam) => {
                jd?.sendExposureData?.(params);
            }
        }
    }
    return null
})()

export default mta as IMta