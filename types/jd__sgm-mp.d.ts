declare module "@jd/sgm-mp" {
  interface SgmMpSDKOptions {
    sid: string;
    pid: string;
    options: {
      devPlatform: any;
    };
    openTrace?: string;
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

  interface CustomParams {
    type: string;
    code: string | number;
    msg: string;
  }

  class SgmMpSDK {
    constructor(options: SgmMpSDKOptions);
    custom(params: CustomParams, pid?: string): void;
    error(error: Error, pid?: string): void;
    api(params: ApiParams, pid?: string): void;
    setUserInfo(params: { uid: string }): void;
  }

  export default SgmMpSDK;
}
