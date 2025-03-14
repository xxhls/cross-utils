import type { ILogin, TUserInfo } from "./ILogin";

const { JDLogin } = require('@jdreact/jdreact-core-lib');


// export const goToLogin = () => {
//     // 京东购物小程序
//     JDLogin.doLogin();
// };

// export const isLogin = (): Promise<any> => {
//     return JDLogin.isLogin();
// }

// export const hasLogin = (successCallBack, failCallBack) => {
//     isLogin().then((result) => {
//         if (result) {
//             successCallBack  && successCallBack();
//         } else {
//             goToLogin();
//         }
//     }).catch((error)=>{
//         // 登录code 23 是24 小时限频了
//         if(error.code == 23){ // 24小时登录限频
//             failCallBack && failCallBack(error);
//         } else {
//             goToLogin()
//         }
//     })
// }

// export const getUsePin = (): Promise<any> => {
//     return JDLogin.getUserInfo();
// }
class Login implements ILogin {
    hasLogin():Promise<any> {
        return JDLogin.isLogin();
    }
    isLogin(): Promise<any> {
        return JDLogin.isLogin();
    }

    doLogin(): Promise<any> {
        return  JDLogin.doLogin();
    }
}

const login = new Login();

export default login;
