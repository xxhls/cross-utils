export const goToLogin = () => {
  return new Promise((resolve, reject) => {
    jd.login({
      success: () => {
        // 解决触发风控时，登录态返回成功，jd.login 返回成功，但是没有pin 会死循环调接口问题
        // 这里 取不到userInfo.info.pt_pin
        resolve(true);
      },
      fail: () => {
        //no
        reject(false);
      },
    });
  });
};

const getUsePin = ({
  success,
  fail,
}: {
  success: (info: Record<string, string>) => void;
  fail: (error: any) => void;
}) => {
  return new Promise((resolve, reject) => {
    try {
      //通过cookie获取缓存有限制
      jd.requestWebCookie({
        needpin: 1,
        success(res: any) {
          try {
            let { pt_pin = "" } = res;
            const tkt = res && res.ticket ? res.ticket : "";
            pt_pin = encodeURI(pt_pin);
            const info = { pt_pin: pt_pin, ticket: tkt };
            // 拿到值，存到cookie中
            success && success(info);
            resolve(info);
          } catch {
            fail && fail("操作太过频繁，请稍后在试！");
            // console.log('getUsePin success catch: ', e);
            reject({});
          }
        },
        fail(res: any) {
          // console.log('getUsePin fail: ', res);
          fail && fail(res);
          reject({});
        },
        complete(res: any = {}) {
          // console.log('getUsePin complete: ', res);
          reject({});
        },
      });
    } catch (error: any) {
      // console.log('getUsePin catch: ', error);
      fail && fail(error?.errMsg || "操作太过频繁，请稍后在试！");
      reject({});
    }
  });
};

export const isLogin = () => {
  return new Promise((resolve, reject) => {
    if (jd && jd.hasUserLogined && typeof jd.hasUserLogined == "function") {
      jd.hasUserLogined({
        success(res) {
          if (res && res.status == 1) {
            //实时判断，如果已有pin，则不存储，没有就存一下
            getUsePin({
              success: () => {
                return resolve(true);
              },
              fail: (err) => {
                // code = 23 代表登录24小时限频，不能再触发登录了
                if (err.code == 23) {
                  return reject(err);
                }
                return resolve(false);
              },
            });
          } else {
            return resolve(false);
          }
        },

        fail() {
          return resolve(false);
        },

        complete() {},
      });
    } else {
      return resolve(false);
    }
  });
};

export const hasLogin = () => {
  return new Promise((resolve, reject) => {
    isLogin()
      .then((result) => {
        if (result) {
          resolve(result);
        } else {
          reject(false);
        }
      })
      .catch(() => {
        // 登录code 23 是24 小时限频了
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
