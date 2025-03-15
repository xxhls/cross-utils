import ParamsSign from "@legos/js-security-v3/dist";
import { SHA256 } from "crypto-js";

export const createSign = async (businessId, colorParams) => {
    try {
      const ps = new ParamsSign({
        appId: businessId,
        preRequest: false,
        debug: false,
      });
      const paramsSign = {
        appid: colorParams.appid,
        functionId: colorParams.functionId,
        clientVersion: colorParams.clientVersion,
        client: colorParams.client,
        t: colorParams.t,
        body: SHA256(colorParams.body).toString(),
      };
      const signParams = await ps.sign(paramsSign);
      colorParams.h5st = encodeURI(signParams.h5st);
      return colorParams;
    } catch (error) {
      return colorParams;
    }
};