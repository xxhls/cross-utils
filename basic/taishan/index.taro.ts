/** @format ai create by treesea */

interface CustomParams {
  type: Taishan_Type;
  code: string | number;
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
  uid: string | number;
}

class TaishanReport {
  // Private static variable to store the singleton instance
  private static instance: TaishanReport | null = null;
  private instanse: any;

  // Private constructor to prevent direct instantiation
  private constructor() {
    // Initialize the SgmMpSDK instance
    this.instanse = globalThis.__sgm__;
  }

  // Static method to get the singleton instance
  static getInstance(): TaishanReport {
    // If the instance is not yet created, create it
    if (TaishanReport.instance === null) {
      TaishanReport.instance = new TaishanReport();
    }
    // Return the instance
    return TaishanReport.instance;
  }

  // Instance methods to call SgmMpSDK methods
  custom(params: CustomParams, pid?: string | number) {
    return this.instanse.custom(params, pid);
  }

  error(error: Error, pid: string | number) {
    return this.instanse.error(error, pid);
  }

  api(params: ApiParams) {
    this.instanse.api(params);
  }

  userInfo(params: UserInfoParams) {
    try {
      // console.error('设置用户信息~~', uid);
      this.instanse.userInfo(params);
    } catch {
      // console.error('Error in TaishanReport.userInfo:', error);
    }
  }
}

// Export the singleton instance
export default TaishanReport.getInstance();

export enum Taishan_Type {
  ERROR = 1,
  WARN = 2,
  INFO = 3,
}
