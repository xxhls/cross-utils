/**
 * 操作cookie相关方法
 * @supported h5
 */
import cookie from "js-cookie";

export default {
  setCookie: cookie.set,
  getCookie: cookie.get,
  removeCookie: cookie.remove,
  getAllCookie: () => document.cookie,
};
