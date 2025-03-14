declare global {
  interface JDLoginResponse {
    status?: number;
  }

  interface JDWebCookieResponse {
    pt_pin?: string;
    ticket?: string;
  }

  interface JDLoginCallbacks {
    success?: () => void;
    fail?: () => void;
    complete?: () => void;
  }

  interface JDWebCookieOptions {
    needpin: number;
    success?: (res: JDWebCookieResponse) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface JDHasUserLoginedOptions {
    success: (res: JDLoginResponse) => void;
    fail: () => void;
    complete: () => void;
  }

  interface JD {
    login: (options: JDLoginCallbacks) => void;
    requestWebCookie: (options: JDWebCookieOptions) => void;
    hasUserLogined: (options: JDHasUserLoginedOptions) => void;
    __sgm__: {
      trace: {
        PFINDER: {
          preTrace: (spanId: string) => {
            header: { "X-MLAAS-AT": string };
            id: string;
          };
          postTrace: (
            preReturn: any,
            response: {
              getResponseHeader: (key: string) => string | undefined;
            },
          ) => {
            name: string;
            id: string | undefined;
          };
        };
      };
    };
  }

  const jd: JD;
}

export {};
