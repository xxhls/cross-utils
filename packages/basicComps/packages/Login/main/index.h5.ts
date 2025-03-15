
import Taro from '@tarojs/taro';
import cookie from '../Cookie/index.h5';
import { hasUrlParameter, addUrlParameter } from '../../utils/getQueryParam/index.h5';
import { isJingGouMiniprogram } from '../Platform';
// import { goToLogin } from '@dj-lib/dj-base-lib/build/login/index.h5';

//唤起app的登录窗口
export const goToLogin = (opts) => {
    // 京东购物小程序
    return new Promise((resolve, reject)=>{
        const returnurl = opts?.returnurl;
        const paramsappId = opts?.appId;
        const appId = paramsappId || 121;
        const url = returnurl || window.location.href
        if(isJingGouMiniprogram){
            
            if (!hasUrlParameter(url, 'hasLogin')) {
                window.location.href = `https://wq.jd.com/pinbind/pintokenredirect?biz=jdms&url=${encodeURIComponent(addUrlParameter(url, 'hasLogin', '1'))}`
            }
            resolve(true)
        }else{
         // 京东登录
            const passport = 'https://plogin.m.jd.com/user/login.action?appid='+appId+'&returnurl=';
            const returnval = passport + encodeURIComponent(url);
            window.location.href = returnval;
            resolve(true)
        }
    })
    
};


// const getUsePin = () => {
//     return new Promise ((resolve, reject)=>{ 
//         try {
//             resolve(true)
//         } catch (error) {
//             reject(false)
//         }
//     }) 
// };

export const isLogin = () =>{
    return new Promise ((resolve, reject)=>{ 
        if(isJingGouMiniprogram){
            const pt_pin = cookie.get('wq_skey') &&  cookie.get('wq_uin') && cookie.get("wq_auth_token") ;
            if(pt_pin){
                return resolve(true);
            }
            return resolve(false);
        }

        // // 定义回调函数
        // const myJsonpCallback = (data) => {
        //     const hasLogin = data?.islogin == '1';
            
        //     resolve(hasLogin);
        //     setTimeout(()=>{
        //         reject(false)
        //     },5000)
        // }
        // window.myJsonpCallback = myJsonpCallback;
        // // 动态创建script标签
        // var script = document.createElement('script');
        // script.src = 'https://plogin.m.jd.com/cgi-bin/ml/islogin?callback=myJsonpCallback';
        // // 将script标签添加到页面中，开始加载脚本
        // document.head.appendChild(script);

        try {
            Taro.request({
                url: "https://plogin.m.jd.com/cgi-bin/ml/islogin?callback=cb",
                jsonp: true,
                mode: "cors",
                credentials: "include",
                success(res) {
                    // 是否已登录
                    const isLogin = res?.data?.islogin == 1;
                    if (!isLogin) {
                        return resolve(false);
                    }
                    return resolve(true); 
                },
                fail() {
                    return resolve(false);
                }
            });
            setTimeout(()=>{
                reject(false)
            },5000)
        } catch (error) {
            reject(false)
        }
    }) 
    
}

export const hasLogin = () => {
    return new Promise((resolve, reject)=>{
        isLogin().then((result) => {
            resolve(result)
        }).catch(()=>{
            // 登录code 23 是24 小时限频了
            reject(false)
        })
    })
    
}

const login = {
    hasLogin,
    isLogin,
    doLogin: goToLogin,
};

export default login;
