/** @format */

import SgmMpSDK from "@jd/sgm-mp";
import Taro from "@tarojs/taro";

import {
  ErrortType,
  AddressInfoError,
  RequestError,
  BuriedPointException,
  DataParsingError,
  InteractionError,
  PageException,
  ResourceError,
  ResponseError,
  ThirdPartyError,
} from "./errorCode";

interface CustomOptionsI {
  code: ErrortType;
  type:
    | AddressInfoError
    | RequestError
    | ResponseError
    | PageException
    | ThirdPartyError
    | DataParsingError
    | BuriedPointException
    | ResourceError
    | InteractionError;
  msg: string;
}

interface ApiParams {
  url: string;
  status: number;
  code: string | number;
  msg: string;
  time: number;
  requestLength: number;
  requestType: string;
}

interface UserInfoParams {
  uid: string;
}

class TaishanReport {
  // Private static variable to store the singleton instance
  private static instance: TaishanReport | null = null;
  private instanse: any;

  // Private constructor to prevent direct instantiation
  private constructor() {
    try {
      // Initialize the SgmMpSDK instance
      this.instanse = new SgmMpSDK({
        sid: "df076d05bfd840f7ae84bdbb0ec7073c",
        pid: "9HwAEg@KfjKYllLgD34PzrR",
        options: {
          devPlatform: Taro, // If using a development framework, specify the framework object (Taro, uni)
        },
        openTrace: "PFINDER",
      });
      jd.__sgm__.trace = {
        PFINDER: {
          preTrace(spanId) {
            return {
              header: { "X-MLAAS-AT": `wl=0&id=${spanId}&src=sgm-web` },
              id: spanId,
            };
          },
          postTrace(
            preReturn: any,
            response: {
              getResponseHeader: (key: string) => string | undefined;
            },
          ): { name: string; id: string | undefined } {
            const key = "x-mlaas-at";
            const val = response.getResponseHeader(key);
            if (!val) {
              return {
                name: `${key}:`,
                id: undefined,
              };
            }
            let id: string | undefined;
            val.split("&").some((x) => {
              const bool = !x.indexOf("id=");
              if (bool) {
                id = x;
              }
              return bool;
            });
            return {
              name: `${key}:${val}`,
              id: id ? id.slice(3) : undefined,
            };
          },
        },
      };
    } catch {
      // console.error('Error initializing SgmMpSDK:', error);
      // throw error;
    }
  }

  // Static method to get the singleton instance
  static getInstance(): TaishanReport {
    // If the instance is not yet created, create it
    if (TaishanReport.instance === null) {
      try {
        TaishanReport.instance = new TaishanReport();
      } catch (error) {
        // console.error('Error creating TaishanReport instance:', error);
        throw error;
        // return { custom: () => {} };
      }
    }
    // Return the instance
    return TaishanReport.instance;
  }

  // Instance methods to call SgmMpSDK methods with try-catch
  custom({ type, code, msg }: CustomOptionsI, pid?: string) {
    try {
      // return this.instanse.custom({ type, code, msg }, pid);
      return this.instanse.custom({ type, code, msg: msg }, pid);
    } catch {
      // console.error('Error in TaishanReport.custom:', error);
      // throw error;
    }
  }

  error(error: Error, pid?: string) {
    try {
      return this.instanse.error(error, pid);
    } catch {
      // console.error('Error in TaishanReport.error:', error);
      // throw error;
    }
  }

  api(params: ApiParams, pid?: string) {
    try {
      const { url, status, code, msg, time, requestLength, requestType } =
        params;
      this.instanse.api(
        { url, status, code, msg, time, requestLength, requestType },
        pid,
      );
    } catch {
      // console.error('Error in TaishanReport.api:', error);
      // throw error;
    }
  }

  userInfo(params: UserInfoParams) {
    try {
      this.instanse.setUserInfo({
        uid: params.uid,
      });
    } catch {
      // console.error('Error in TaishanReport.userInfo:', error);
      // throw error;
    }
  }
}

// Export the singleton instance
export default TaishanReport.getInstance();
