import { IGotoParams, INavigator } from './INavigator'
import qs from 'qs';
import PubSub from 'pubsub-js'
import Taro from '@tarojs/taro'
import mta from '../Mta/index';
import jumpAPI from '../jumpAPI';
import { isH5 } from '../Platform';
import { isType } from '@/utils/base';

const routers = require('../../../src/router/router.taro.ts').routers;

export class Navigator implements INavigator {
    goto(params: IGotoParams): void | Function {

        const router = routers.find(x => x.key === params.to)

        const prevStamp = params.props?.args?.$taroTimestamp
        const newArgs = Object.assign({}, params.args, { prevStamp })
        // mta.pv({
        //     pageId: router?.pageId,
        //     pageParam: params?.args,
        //     ext: { ext: JSON.stringify({ businessTag: 'cityCountry' }) }
        // });
        if (isType.isEmpty(params)) {
            return;
        }
        if(params?.to=='jump'){
            jumpAPI.jump(params.args?.url);
            return;
        }
        // if (params.args?.url?.startsWith?.('http')) {
        //     // toast.show('正在跳转中~', { duration: 1000 });
        //     return window.location.href = 
        // }
        // if (params.args?.url?.startsWith?.('openapp')) {
        //     // toast.show('正在跳转中~', { duration: 1000 });
        //     return window.location.href = params.args?.url
        // }

        if (!router?.position) {
            return;
        }

        Taro.navigateTo({
            url: `/${router.position}?` + qs.stringify(newArgs),
            // events: {
            //     // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
            //     acceptDataFromOpenedPage: function (data) {
            //         console.log('data---', data)
            //     },
            //     //   someEvent: function(data) {
            //     //     console.log(data)
            //     //   }
            // },
            // success: function (res) {
            //     // 通过eventChannel向被打开页面传送数据
            //     //   res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
            // }
        })

        if (params.listen) {
            const token = PubSub.subscribe(prevStamp, (_eventName, val) => {
                params.listen?.(val)
            });
            return () => PubSub.unsubscribe(token);
        }
    }
    goback(len?: number): void {
        if(isH5){
            window.history.back();
            return;
        }
        Taro.navigateBack({
            delta: typeof len === 'number' ? Math.abs(len) : 1
        })
        // Taro.navigateBack({
        //     delta: typeof len === 'number' ? Math.abs(len) : 1
        // })
    }

    exit(): void {
        Taro.exitMiniProgram();
    }

    sendMsgToPrev(props: any, msg: any) {
        // console.log('sendMsgToPrev props', props)
        const prevStamp = props?.args?.prevStamp;
        PubSub.publish(prevStamp, msg)
    }
}

const navigator = new Navigator();

export default navigator;
