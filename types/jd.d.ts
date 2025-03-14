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
    }

    const jd: JD;
}

export {};