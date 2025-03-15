import ParamsSign from "@legos/js-security-jdxcx";
import { SHA256 } from "crypto-js";

// 接口加固
export interface Bridge {
  libs?: {
    ParamsSign?: (data: { appId: string; debug: boolean }) => {
      sign: (data: {
        functionId: string;
        appid: string;
        client: string;
        clientVersion: string;
        t: string;
        body: string;
      }) => void;
    };
  };
}
// export const createSign = async (businessId, colorParams) => {
//   try {
//     const ps = new ParamsSign({
//       appId: businessId,
//       preRequest: true,
//       debug: true,
//     });
//     const paramsSign = {
//       appid: "hourly-m",
//       functionId: colorParams.functionId,
//       clientVersion: colorParams.clientVersion,
//       client: colorParams.client,
//       t: colorParams.t,
//       body: SHA256(colorParams.body).toString(),
//     };
//     const signParams = await ps.sign(paramsSign);
//     return encodeURI(signParams.h5st);
//   } catch (error) {
//     return null;
//   }
// };

const bridge: Bridge = {};

export const createSign = async (businessId, data) => {
  //区分接口的渠道。https://joyspace.jd.com/pages/RpJtTC4L87KKXYukAUUq  加固文档

  const Fasten = ParamsSign;

  if (!Fasten) {
    return data;
  }

  try {
    const { h5st } = await new ParamsSign({
      timeout: 0.5,
      businessId,
      debug: false, // 测试时开启调试，切记：上线后设置为false。
      preRequest: false,
    }).sign({
      functionId: data.functionId,
      appid: data.appid,
      client: data.client,
      clientVersion: data.clientVersion,
      t: data.t,
      body: data.body && SHA256(JSON.stringify(data.body)),
    });
    data.h5st = h5st;
  } catch (e) {
    // console.error("请求：", e);
  }
  return data;
};
