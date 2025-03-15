/**
 * 扩展参数类型
 * success: 收到开发者服务成功返回的回调函数
 * fail: 接口调用失败的回调函数
 * complete: 接口调用结束的回调函数（调用成功、失败都会执行）
 */
export interface jumpOption {
  success?: Function;
  fail?: Function;
  complete?: Function;
}

/**
 * 京购小程序内，使用navigate的goto方法跳转
 */

const navigator = require("navigator");

/**
 * @deprecated 废弃，请使用jump方法替代
 * @description: 跳转京购小程序内原生界面
 * @param {string} url 落地页路径
 * @param {*} params 落地页参数
 * @param {jumpOption} opt 扩展参数
 * @return {*}
 */
const jumpToNative = (url: string, params = {}, opt: jumpOption = {}) => {
  if (url && navigator) {
    const {
      success = (res) => {
        // console.log('~~~~~~jumpToWeb-success~~~~~~~~~~~~', res);
      },
      fail = (res) => {
        // console.log('~~~~~~jumpToWeb-fail~~~~~~~~~~~~', res);
      },
      complete = (res) => {
        // console.log('~~~~~~jumpToWeb-complete~~~~~~~~~~~~', res);
      },
    } = opt;
    navigator.goto(url, params, { success, fail, complete });
  }
};

/**
 * @description: 跳转京购小程序内Webview界面
 * @param {string} url 落地页H5路径
 * @param {*} params 落地页参数
 * @param {*} opt 扩展参数
 * @return {*}
 */
const jumpToWeb = (url: string, params = {}, opt: jumpOption = {}) => {
  const param = { ...params, url: url };
  if (url && navigator) {
    const {
      success = (res) => {
        // console.log('~~~~~~jumpToWeb-success~~~~~~~~~~~~', res);
      },
      fail = (res) => {
        // console.log('~~~~~~jumpToWeb-fail~~~~~~~~~~~~', res);
      },
      complete = (res) => {
        // console.log('~~~~~~jumpToWeb-complete~~~~~~~~~~~~', res);
      },
    } = opt;
    navigator.goto("/pages/h5/index", param, { success, fail, complete });
  }
};

const jump = (url: string, params = {}, opt: jumpOption = {}) => {
  // console.log(`+++ jump to path: ${url}`);

  if (url && navigator) {
    const {
      success = (res) => {
        // console.log('~~~~~~jumpToWeb-success~~~~~~~~~~~~', res);
      },
      fail = (res) => {
        // console.log('~~~~~~jumpToWeb-fail~~~~~~~~~~~~', res);
      },
      complete = (res) => {
        // console.log('~~~~~~jumpToWeb-complete~~~~~~~~~~~~', res);
      },
    } = opt;

    if (url.search(/^http/i) == 0) {
      const paramForWeb = { ...params, url: url };
      navigator.goto("/pages/h5/index", paramForWeb, {
        success,
        fail,
        complete,
      });
    } else if (url.search(/^router:\/\//i) == 0) {
      //
      // console.log("微信小程序内不支持'router:'协议");
    } else if (url.search(/^openapp/i) == 0) {
      //
      // console.log("微信小程序内不支持'openapp:'协议");
    } else {
      //其他，默认走goto方法
      navigator.goto(url, params, { success, fail, complete });
    }
  }
};

const jumpAPI = {
  jumpToNative, //废弃，请使用jump方法替代
  jumpToWeb, //废弃，请使用jump方法替代
  jump,
};

export default jumpAPI;
