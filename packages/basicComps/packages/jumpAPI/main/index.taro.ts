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

export interface jumpOption {
  isSync?: string;
  success?: Function;
  fail?: Function;
  complete?: Function;
}

/**
 * @deprecated 废弃，请使用jump方法替代
 * @description: 跳转方法
 * @param {string} url 目标链接
 * @param {*} params 参数
 * @param {*} opt 扩展参数
 * @return {*}
 */
const jumpToNative = (url: string, params = {}, opt: jumpOption = {}) => {};

/**
 * @description: 通过OpenApp协议跳转webview容器，加载H5界面
 * @param {string} url H5落地页链接
 * @param {*} params 页面参数
 * @param {*} opt 扩展参数
 * @return {*}
 */
const jumpToWeb = (url: string, params = {}, opt: jumpOption = {}) => {};

const jump = (url: string, params = {}, opt: jumpOption = {}) => {};
const jumpRouter = (url: string, params = {}, opt: jumpOption = {}) => {};
const jumpToMini = (url: string, params = {}, opt: jumpOption = {}) => {};
const jumpAPI = {
  jumpToWeb, //@deprecated 废弃，请使用jump方法替代
  jump,
  jumpRouter,
  jumpToMini,
};

export default jumpAPI;
