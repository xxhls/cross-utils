import cookie from "../Cookie";
import { isJDApp, isJingGouMiniprogram } from "../Platform";

/**
 * 获取设备指纹信息
 * @returns
 */
export const getEid = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (window.EidToken) {
      resolve(window.EidToken);
    } else {
      reject("");
    }
  });
};
export const getUUID = () => {
  return new Promise((resolve, reject) => {
    if (isJDApp) {
      if (window.uuid) {
        resolve(window.uuid);
      } else {
        window.getJDPhoneInfoByDJ = (result) => {
          window.uuid = JSON.parse(result).data.uuid;
          resolve(window.uuid);
        };
        const jsonString = ["uuid", "appVersion"]; //需要获取什么内容可进行自定义，名称见后面的参数名称，与上述参数名称保持一致
        window.XWebView &&
          window.XWebView.callNative(
            "AppUnitePlugin",
            "getAppInfo",
            JSON.stringify(jsonString),
            "getJDPhoneInfoByDJ",
            "1",
          ); //后两个参数可选
      }
      return;
    } else if (isJingGouMiniprogram) {
      let cookieKey = cookie.get("wxapp_openid");
      if (!cookieKey) {
        let url = window.location.href;
        url = decodeURIComponent(url);
        const url_arr = url.split("?");
        if (url_arr.length < 2) {
          resolve(cookieKey);
          return;
        }
        const str = url.split("?")[1];
        const arr = str.split("&");
        for (let i = 0; i < arr.length; i++) {
          const item = arr[i].split("=");
          if (item.length < 2) {
            continue;
          }
          if (item[0] === "cookie") {
            const cookieObj = JSON.parse(item[1]);
            cookieKey = cookieObj?.wxapp_openid;
            if (cookieKey) {
              cookie.set("wxapp_openid", cookieKey);
            }
          }
        }
        // const urlArr = url.split('&');
        // urlArr.forEach(element => {
        //     // 获取链接上的uuid
        //     if (element.includes('wxappSeries')){
        //         const wxappSeries = element.replace("wxappSeries=", "");
        //         const  wxappSeriesText = JSON.parse(decodeURIComponent(wxappSeries)) || {};
        //         if(wxappSeriesText.uuid){
        //             cookieKey = wxappSeriesText.uuid;
        //         }
        //     }
        // });
      }
      resolve(cookieKey);
      return;
    } else {
      const openuuid =
        cookie.get("openid") || cookie.get("__jda")?.split(".")[1] || "";
      resolve(openuuid);
      return;
    }
  });
};
