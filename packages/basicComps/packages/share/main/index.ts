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

import { isJDApp } from "./Platform";



// import jdsdk from '@jmfe/jd-jssdk';
const jdsdk = require('@jmfe/jm-jdshare')

export interface shareOption {
}

/**
 * @description: 通过OpenApp协议跳转webview容器，加载H5界面
 * @param {string} url H5落地页链接
 * @param {*} params 页面参数
 * @param {*} opt 扩展参数
 * @return {*}
 */


const setShare = (param) => {
    if(isJDApp){
        try {
            jdsdk?.setShareInfo(param)
        } catch (e) {
            if (e.name === "JdShareException") {
                // console.error('分享失败',e.toString());
            } else {
                // console.error('分享失败',e.message)
            }
        }
    }else{
        // console.log('非京东场域，无分享能力')
    }
    
}
const shareAPI = {
    setShare
};


export default shareAPI;
