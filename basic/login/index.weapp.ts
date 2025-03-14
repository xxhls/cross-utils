const wxLogin = require("wxLogin");

//唤起app的登录窗口
export const goToLogin = () => {
  return new Promise((resolve, reject) => {
    wxLogin
      ?.doLogin?.({ mode: "silent" })
      .then(() => {
        // 登录成功重新请求接口
        resolve(true);
      })
      .catch(() => {
        reject(false);
      });
  });
  // 京东购物小程序
};

export const getUsePin = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(true);
    } catch {
      reject(false);
    }
  });
};
export const isLogin = () => {
  return new Promise((resolve, reject) => {
    try {
      const cookie = wxLogin?.hasLoginCookie();
      resolve(cookie ? cookie : false);
    } catch {
      reject(false);
    }
  });
};
export const hasLogin = () => {
  return new Promise((resolve, reject) => {
    isLogin()
      .then((result) => {
        resolve(result);
      })
      .catch(() => {
        reject(false);
      });
  });
};
const login = {
  hasLogin,
  isLogin,
  doLogin: goToLogin,
};

export default login;
