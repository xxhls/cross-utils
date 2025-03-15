import { INetwork, TFetchParams } from "./INetwork.ts";
import api from "@dj-lib/hourapi/dist/es/index.h5";
import TaishanReport from "../../basicComps/taishan/index.ts";
import { ErrortType, ResponseError } from "../../basicComps/taishan/errorCode";
import { hybridMutiPreload } from "@jmfe/jd-jssdk";
import { NetReqErrorCode, ResponseCode } from "./RequestError.ts";
import {
  isHourPRO,
  isJDApp,
  isJingGouMiniprogram,
  jdAppVersion,
} from "../Platform";
import { getUUID } from "../JDIdentitySystem";

class Network implements INetwork {
  fetch(params: TFetchParams): Promise<any> {
    const uuid = "null";
    const delParas = {
      platform: isJingGouMiniprogram ? "jgxcx" : isJDApp ? "jdapp" : "h5",
      appid: "hourly-m",
      loginWQBiz: isJingGouMiniprogram ? "jdms" : "",
      loginType: !isJingGouMiniprogram ? "2" : "1",
      uuid: uuid,
      appVersion: jdAppVersion,
    };
    const newParmas = {
      ...delParas,
      signBusinessId: params?.signBusinessId || "c34b0", // 加固
      ...params,
    };
    const timeOut = params.timeout || 15 * 1000;
    const host = "http://api.m.jd.com/client.action?functionId=";
    const host_beta = "http://beta-api.m.jd.com/client.action?functionId=";

    const getRequestId = (res) => {
      const { headers } = res || {};
      const keys = Object.keys(headers || {});
      const requestApiKey = keys.find(
        (x) => x?.toLowerCase() === "x-api-request-id",
      );
      const requestId =
        headers[requestApiKey!] ||
        headers["x-api-request-id"] ||
        headers["X-Api-Request-Id"];
      return requestId;
    };
    const _catchCallBack = (err) => {
      const { headers } = err || {};
      const requestId = getRequestId(err);
      const customParam = `~~request-id: ${requestId};error:${JSON.stringify(err?.data)}~~`;
      TaishanReport.custom({
        type: ErrortType.Error,
        code: ResponseError.CODE_NOT_0,
        msg: {
          msg: `${"接口-非0"},functionId:${newParmas.functionId},errorData:${customParam}`,
        },
      });
    };
    const _sucCallBack = (res, resolve, reject) => {
      const requestId = getRequestId(res);
      const { status, data } = res;
      const { code, body, result } = data || {};

      // http响应的状态码不是200  --  请求返回的第一层拦截
      if (status !== 200) {
        TaishanReport.custom({
          type: ErrortType.Error,
          code: ResponseError.STATUSCODE_NOT_200,
          msg: { req: newParmas, res: res },
        });
        reject(data);
        return;
      }

      //当data返回不是object的时候，继续往下走会有问题 --- 不合法是第二层拦截
      if (typeof data != "object" || typeof res != "object") {
        TaishanReport.custom({
          type: ErrortType.Error,
          code: ResponseError.DATA_INVALID,
          msg: { req: newParmas, res: data },
        });
        reject({ code: -1, message: "系统异常" });
        return;
      }

      // data是对象的情况下，给data赋值requestId
      if (data) {
        data.requestId = requestId;
      }

      // 未登录先不处理
      // if (
      //     code == NetReqErrorCode.notLoginPin ||
      //     code == ResponseCode.UNLOGIN ||
      //     code == NetReqErrorCode.unlogin
      // ) {
      //     // 这里将reject存放在数组中，在login失败回调时遍历执行reject确保每次请求都reject掉
      //     // 如果不用数组进行存储，间隔很短的时间内多次调用接口，接口返回未登陆的时候login弹窗只弹一次，并且在关闭login弹窗回调fail时只会调用最后一次请求的rejcet

      // }

      if (code != NetReqErrorCode.success || !(body || result)) {
        //110 120 no
        TaishanReport.custom({
          type: ErrortType.Error,
          code: ResponseError.CODE_NOT_0,
          msg: { req: newParmas, res: { requestId, code, body } },
        });

        reject(data);
      } else {
        if (
          code == NetReqErrorCode.success &&
          body &&
          body.errorCode &&
          body.errorCode != NetReqErrorCode.success
        ) {
          //errorCode != 0 说明业务返回的数据是有异常的。
          TaishanReport.custom({
            type: ErrortType.Error, //错误级别
            code: ResponseError.BODY_CODE_ERROR,
            msg: {
              errorCode: body.errorCode,
              req: newParmas,
              res: res,
            },
          });
        }
        resolve(data);
      }
    };
    return new Promise((resolve, reject) => {
      const { goHybrid } = params?.body || {};
      const {
        hybridDevIdNum,
        hybridIdNum,
        hybirdRequestId,
        hybirdDevRequestId,
      } = params || {};
      ///获取过来判断是否有hybridId
      if (
        isJDApp &&
        !!goHybrid &&
        ((hybridDevIdNum && hybirdDevRequestId) ||
          (hybirdRequestId && hybridIdNum))
      ) {
        //获取过来Hybird上的requestId
        const hybird_requestId = isHourPRO
          ? hybirdRequestId
          : hybirdDevRequestId;
        const hybirdId = isHourPRO ? hybridIdNum : hybridDevIdNum;
        hybridMutiPreload(hybirdId, hybird_requestId, api, newParmas)
          .then((res) => {
            _sucCallBack(res, resolve, reject);
            // if(!!res.code){
            //     resolve(res);
            // }else{
            //     resolve(res.data);
            // }
          })
          .catch((err) => {
            _catchCallBack(err);
            reject(err?.data || err);
          });
      } else {
        if (isJDApp) {
          const paramsJson = {
            url: host,
            functionId: params?.functionId,
            body: params?.body,
            // "headerType": "1", //默认为“0”； "1": 使用H5的cookie和ua  "0":使用原生的cookie和ua
            params: {
              client: "wh5",
              isHybrid: "1",
            },
          };
          window.XWebView.callNative(
            "ColorQueryPlugin",
            "colorRequest",
            JSON.stringify(paramsJson),
            "callback",
            "1",
          ); //后两个参数可选
          window.callback = function (result) {
            _sucCallBack(result, resolve, reject);
          };
          return;
        }
        api(newParmas)
          .then((res) => {
            _sucCallBack(res, resolve, reject);
            // console.log('返回参数-成功', res)
          })
          .catch((err) => {
            _catchCallBack(err);
            reject(err?.data || err);
          });
      }
      setTimeout(() => {
        reject({
          coode: ResponseCode.TIME_OUT,
          message: "网络请求失败，请稍后再试[A-0-0-0-0]~",
        });
      }, timeOut);
    });
  }
}

const network = new Network();
export default network;
