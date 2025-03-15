/** @format */
import { callRouter, isHarmony } from "@jmfe/jd-jssdk";
import { isIOS, isJDApp, isJingGouMiniprogram } from "../Platform";
import { openJDAPP } from "../openJDApp";
import stringify from "../../utils/stringify";

/**
 * 扩展参数类型
 * isMthod: Boolean true: 执行的router协议为方法调用而非页面；用于通过router协议调用方法时，可以提高Android端的调用性能，对iOS无效
 * isSync: string 'yes'或者'', ios特有，router有同步回调无异步回调时开启
 * success: 收到开发者服务成功返回的回调函数
 * fail: 接口调用失败的回调函数
 * complete: 接口调用结束的回调函数（调用成功、失败都会执行）
 */
export interface jumpOption {
	isMethod?: boolean;
	isSync?: string;
	success?: Function;
	fail?: Function;
	complete?: Function;
}
/**
 * @description: 跳转Router协议
 * @param {string} url router协议
 * @param {*} params 协议参数
 * @param {*} opt 扩展参数
 * opt: {
 * isMthod: Boolean true: 执行的router协议为方法调用而非页面；用于通过router协议调用方法时，可以提高Android端的调用性能，对iOS无效
 * isSync: string 'yes'或者'', ios特有，router有同步回调无异步回调时开启
 * success: 收到开发者服务成功返回的回调函数
 * fail: 接口调用失败的回调函数
 * complete: 接口调用结束的回调函数（调用成功、失败都会执行）
 * }
 *
 *
 * @return {*}
 */
const jumpToRouter = (url: string, params, opt: jumpOption): any => {
	// 如果是京东内部
	const {success,fail} = opt || {};
    window.successNew = (data) => {
        success(data);
    }
    const _callBackName = isIOS ? "window.successNew" : "successNew";
    const _RouterJson = JSON.stringify({
        "jdRouter":"1", //必传1，不能缺，不能改
        "routerURL": url,  //router://全类名【注意不要遗漏包名】/方法名称，required,必选参数，格式严格校验，scheme必须是router
        "routerParam": params, //调用方法的参数 optional,可选参数
        "callBackName": _callBackName,  //h5自定义的函数名称，optional,可选参数
    })
    if(isIOS){
        window?.webkit?.messageHandlers?.JDAppUnite?.postMessage(
            {
                "method": "callRouterModuleWithParams",
                "params" : _RouterJson 
            })
    }else if(!!isHarmony?.()){
        callRouter({
            routerURL: url,
            routerParam: params,
        },url).then(result => {
            if (result.status === '0') {
                success?.({data:result.data});
            }
        }).catch((e) => {
            fail?.(e)
        })
    }else{
        window?.JDAppUnite && window?.JDAppUnite.callRouterModuleWithParams(_RouterJson)
    }
};
/**
 * @description: 跳转OpenApp协议
 * @param {string} openAppUrl openApp协议（完整）链接
 * @param {*} otherParams 额外参数（暂未实现）
 * @param {*} opt 扩展参数
 * @return {*}
 */
 const jumpToOpenApp = (url: string, params = {}, opt: jumpOption = {}) => {
	if (url) {
		//支持直接下发协议并跳转
		if (url.indexOf('openapp') != -1) {
			window.location.href = url;
		} else {
			const param = {
				category: 'jump',
				des: url,
				...params,
			};
	
			const encodeParam = encodeURI(JSON.stringify(param));
			const dataParam = `openapp.jdmobile://virtual?params=${encodeParam}`;
			window.location.href = dataParam;
		}
	}
};
//通过OpenApp协议打开某个页面（或模块）,只有模块名称，没有完整的openapp协议
//opaDes: 目标页面（模块）
const jumpByOpenApp = (opaDes: string, extraParams = {}, opt: jumpOption = {}) => {
	if (!opaDes || opaDes.length <= 0) {
		return;
	}
	jumpToOpenApp(opaDes,extraParams,opt)
};
/**
 * @description: 通过OpenApp协议跳转webview容器，加载H5界面
 * @param {string} url H5落地页链接
 * @param {*} params 页面参数
 * @param {*} opt 扩展参数
 * @return {*}
 */
const jumpToWeb = (url: string, params = {}, opt: jumpOption = {}) => {
	if (url && url.indexOf('http') > -1) {
		let jumpUrl = url;
		//TODO: 验证参数拼接格式
		if (url.indexOf('?') > -1) {
			jumpUrl = url + stringify.stringify(params, { encode: true });
		} else {
			jumpUrl = `${url}?${stringify.stringify(params, { encode: true })}`;
		}
		const param = {
			category: 'jump',
			des: 'm',
			url: jumpUrl,
			param: {},
		};
		const encodeParam = encodeURI(JSON.stringify(param));
		const dataParam = `openapp.jdmobile://virtual?params=${encodeParam}`;
		window.location.href = dataParam;
		/*
			自继基础库版本1.10.1 以后， dataParam接收对象类型的参数， 对象类型参数不需要手动编码，API内部会对参数进行编码。
			---- https://cf.jd.com/pages/viewpage.action?pageId=339129861
			> 1.10.1 版本在小程序刚开始的几个版本中，找到的最早稳定点的版本是：js版本号：1.10.10 京东APP：920 日期：2020-10-15
		*/
	}
};
/**
 * @description: 跳转方法
 * @param {string} url 目标链接
 * @param {*} params 参数
 * @param {*} opt 扩展参数
 * @return {*}
 */
const jumpToNative = (url: string, params = {}, opt: jumpOption = {}) => {
	if (url && url.length > 0) {
		if (url.search(/^router:\/\//i) == 0) {
			jumpToRouter(url, params, opt);
		} else if (url.search(/^http/i) == 0) {
			jumpToWeb(url, params, opt);
		} else if (url.search(/^openapp/i) == 0) {
			//完整openApp链接形式
			jumpToOpenApp(url, params, opt);
		} else {
			//只有openApp的des（url实际上是des）的方式
			jumpByOpenApp(url, params, opt);
		}
	}
};
//通用跳转方法
const jump = (url: string, params = {}, opt: jumpOption = {}) => {
	if (!url || url.length <= 0) {
		return;
	}
	// 如果非京东，进入京东
	if(!isJDApp && !isJingGouMiniprogram){
		const args =  {
			category: "jump",
			des: "m",
			url: window.location.href
		 };
		openJDAPP(args,'open');
		return ;
	 }
	 //如果是京购小程序，则进入小程序跳转
     if(isJingGouMiniprogram){
		if(url.search(/^http/i) == 0){
			return window.wx.miniProgram.navigateTo({url: `/pages/h5_wv/events/index?encode_url=${encodeURIComponent(url)}`})
		}
        return window.wx.miniProgram.navigateTo({url: url});
	}
	// 如果是京东router，走router跳转
	if (url.search(/^router:\/\//i) == 0) {
		//'router://'开头 （忽略大小写）
		jumpToRouter(url, params, opt);
	} else if (url.search(/^http/i) == 0) {
		//'http'开头  （忽略大小写）
		jumpToWeb(url, params, opt);
	} else if (url.search(/^openapp/i) == 0) {
		//'openApp'或 'openapp' 开头 （忽略大小写）
		jumpToOpenApp(url, params, opt);
	} else if (url.search(/^\//i) == 0 && isJDApp) {
		// '/'开头，一般为小程序内部页面，内部router跳转
		//eg: '/pages/mergeOrder/mergeOrder?promotionId=211234690034'
		// Taro.navigateTo({ url });
		const _url = url.split('?')[0];
		const _paramsStr = url.split('?').length > 1 ? url.split('?')[1] : '';
		const _params = {};
		_paramsStr.split('&').forEach((item) => {
			if (item.indexOf("=") === -1) return
			const _item = item.split('=');
			_params[_item[0]] = _item[1];
		});
		jumpToJDXCX(_url, _params);
	} else {
		//其他->走openApp协议打开(url参数作为des)
		jumpByOpenApp(url, params, opt);
	}
};
const jumpToJDXCX = (url: string, params = {}, opt: jumpOption = {}) => {
	if (url) {
		//支持直接下发协议并跳转
		if (url.indexOf('openapp') != -1) {
			window.location.href = url;
		} else {
			const param = {
				category: 'jump',
				des: 'jdmp',
				appId:'B594E1702946F919D4B3B9C0DA5B4985',
				scene:'',
				vapptype:'1',
				path:url+'.html',
				param:params
			};
	
			const encodeParam = encodeURI(JSON.stringify(param));
			const dataParam = `openapp.jdmobile://virtual?params=${encodeParam}`;
			window.location.href = dataParam;
		}
	}
};
const jumpAPI = {
	jumpToNative, //废弃，请使用jump方法替代，目前没删除，是为了保留微信域中的跳转，保证别报错
	jumpToWeb, //废弃，请使用jump方法替代，目前没删除，是为了保留微信域中的跳转，保证别报错
	jump,
};

export default jumpAPI;