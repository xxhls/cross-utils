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

class TaishanReport {
  // Private static variable to store the singleton instance
  private static instance: TaishanReport | null = null;
  private instanse: any;

  // Private constructor to prevent direct instantiation
  private constructor() {
    try {
      // Initialize the SgmMpSDK instance
      this.instanse = window.__sgm__;
    } catch (error) {
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
      return this.instanse.custom({ type, code, msg: { msg } }, pid);
    } catch (error) {
      // console.error('Error in TaishanReport.custom:', error);
      // throw error;
    }
  }

  error(error: Error, pid?: string) {
    try {
      return this.instanse.error(error, pid);
    } catch (error) {
      // console.error('Error in TaishanReport.error:', error);
      // throw error;
    }
  }

  api(
    { url, status, code, msg, time, requestLength, requestType },
    pid?: string,
  ) {
    try {
      this.instanse.api(
        { url, status, code, msg, time, requestLength, requestType },
        pid,
      );
    } catch (error) {
      // console.error('Error in TaishanReport.api:', error);
      // throw error;
    }
  }
  userInfo({ uid }) {
    try {
      // console.error('获取实例-userInfo', uid);
      // this.instanse.setUserInfo({
      // 	uid: uid, //
      // });
    } catch (error) {
      // console.error('Error in TaishanReport.userInfo:', error);
      // throw error;
    }
  }
}

// Export the singleton instance
export default TaishanReport.getInstance();
