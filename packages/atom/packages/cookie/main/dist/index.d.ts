import { CookieAttributes } from 'js-cookie';

declare const setCookie: (key: string, val: string | object, option: CookieAttributes) => string;
declare const getCookie: (key: string) => string;
declare const removeCookie: (key: string, option: CookieAttributes) => void;
declare const getAllCookie: () => string;
declare const _default: {
    setCookie: (key: string, val: string | object, option: CookieAttributes) => string;
    getCookie: (key: string) => string;
    removeCookie: (key: string, option: CookieAttributes) => void;
    getAllCookie: () => string;
};

export { _default as default, getAllCookie, getCookie, removeCookie, setCookie };
