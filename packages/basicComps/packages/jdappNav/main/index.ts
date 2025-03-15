/**
 * /*
 *
 * @format
 * @Author: xiangwenjun xiangwenjun1@jd.com
 * @Date: 2022-06-08 16:08:41
 * @LastEditors: xiangwenjun xiangwenjun1@jd.com
 * @LastEditTime: 2022-06-16 15:17:35
 * @FilePath: /omni_channel_store/src/utils/jumpAPI/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


import { isJDApp, isIOS } from "./Platform";

export interface Option {
}

/**
 * @description: 通过OpenApp协议跳转webview容器，加载H5界面
 * @param {string} url H5落地页链接
 * @param {*} params 页面参数
 * @param {*} opt 扩展参数
 * @return {*}
 */

const navTitleParams = (params,type?) =>{
    // 非沉浸式，自定义导航颜色 + 北京
    if(type == 'Tran'){
        // 沉浸式
        return {
            "canPull":"0",
            "supportTran":"1",
            "tranParams":{
                "hideNavi":"1", //注意是字符串"1"
                "naviMenuType": 'wb',
            }
        }
    } else {
        const {backImg,backColor,navcolor} = params || {};
        return {
            "canPull":"0",
            "supportTran":"0",
            "tranParams":{
                "hideNavi":"0", //注意是字符串"1"
                "backgroundColor" :backColor || "",
                "naviMenuType": navcolor || 'ww', //bb,wb,bw,ww
                "pic" : backImg || "", //非沉浸式使用。支持非沉浸式下设置背景颜色，其中icon颜色取naviMenuTyp的第一位，默认为b(黑色)，backgroundColor为此时图片加载不成功时候的兜底颜色，默认为白色。此时，设置标题图片，当naviMenuType为w的时候，使用whiteImg，为b的时候，使用blackImg。},
            }
        }
    }
}

const setJdNavi = ( params?,type?) => {
    if(!isJDApp){
        return ;
    }
    const navNav = navTitleParams(params,type) || {};
    const json ={
        ...navNav ,
        "callBackName":"androidConfigNaviCB" //设置状态栏的结果回调
    }
    window.androidConfigNaviCB = ()=>{
        // console.log('设置导航成功')
    }
    if(isIOS){
        window?.webkit?.messageHandlers?.MobileNavi.postMessage({
            "method":"configNavigationBar",
            "params":JSON.stringify(json)
        });
    }else{
        window?.MobileNavi && window.MobileNavi.configNavigationBar(JSON.stringify(json))
    }
};

const hideTitleBar = ()=>{
    setJdNavi({},'Tran');
}

const setNavMore = (haveShare) => {
    if(!isJDApp){
        return ;
    }
    let Json ;
    if(haveShare){
        if(isIOS){
            const json = {
                    "search": {
                        "jump": "",
                        "display": "hide",
                        "icon": "",
                        "type": "search",
                        "position": "inside",
                        "title": "搜索"
                    },
                    "follow": {
                        "jump": "",
                        "display": "hide",
                        "icon": "",
                        "type": "follow",
                        "position": "inside",
                        "title": "关注"
                    },
                    "custom": [
                        {
                            "jump": "",
                            "display": "show",
                            "icon": "https://img13.360buyimg.com/imagetools/jfs/t1/111384/31/32335/577/63ecb6e7F5316dbf3/1cc2098acd1c1550.png",
                            "type": "custom",
                            "position": "outside",
                            "title": ""
                        }
                    ],
                    "cart": {
                        "jump": "",
                        "display": "hide",
                        "icon": "",
                        "type": "cart",
                        "position": "inside",
                        "title": "购物车"
                    },
                    "feedback": {
                        "jump": "1",
                        "display": "show",
                        "icon": "",
                        "type": "feedback",
                        "position": "inside",
                        "title": "反馈"
                    },
                    "message": {
                        "jump": "",
                        "display": "hide",
                        "icon": "",
                        "type": "message",
                        "position": "inside",
                        "title": "消息"
                    },
                    "calendar": {
                        "jump": "",
                        "display": "hide",
                        "icon": "",
                        "type": "calendar",
                        "position": "inside",
                        "title": "日历"
                    },
                    "share": {
                        "type": "share",
                        "display": "show",
                        "position": "inside"
                    },
                    "homepage": {
                        "jump": "",
                        "display": "hide",
                        "icon": "",
                        "type": "homepage",
                        "position": "inside",
                        "title": "首页"
                    }
                } 
            Json = json
        }else{
            const json = {
                'share': {
                    'type': 'share',
                    'display': 'show', //show, hide
                    'position': 'outside', //outside, inside
                    },
                'hidemore':{
                    'type': 'hidemore',
                        'display': 'hide'
                }
            }
            Json = json
        }
    }else{
        Json = {
            'hidemore': {
                'type': 'hidemore',
                'display': 'hide'
            }
        }
    }
    if (isIOS) {
        window?.webkit?.messageHandlers?.MobileNavi.postMessage({
            "method":"configBtnSince610",
            "params": JSON.stringify(Json)
        });
    } else {
        window?.MobileNavi && window.MobileNavi.configBtnSince610(JSON.stringify(Json))
    }
}
const NavAPI = {
	setJdNavi,
    setNavMore,
    hideTitleBar
};


export default NavAPI;
