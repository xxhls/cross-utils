/** @format */

import Taro from '@tarojs/taro';
import { getConfigSetting } from './utils/jumppath';
import { getH5Location } from './utils/addressLBS.h5';
import jumpAPI from '../jumpAPI';
import { isValidAddress } from './utils';
import { isHarmonyOS, isJDApp } from '../Platform';


/**
 * @description: 地址对象
 */
export interface addressInfoT {
	detailAddress?: string;
	fourAddress?: string;
	lng?: number;
	lat?: number;
	provinceId?: number;
	cityId?: number;
	countyId?: number;
	townId?: number;
	addressId?:number,
	shortAddressName?:string
}

/**
 * @description: 地址相关API类
 */
class LocationHelper {
	platform: string = 'none';
	constructor() {
		this.platform = Taro.getSystemInfoSync().platform;
	}
	/**
	 * @description: 新老路由回传值 - 值包装
	 * @param {*} res
	 * @return {*}
	 */
	dealNewResultValue = (res={} ) => {
		// 参照319方案文档
		const {longitudeString, latitudeString, gangAoTai, defaultAddress, addressDetail, shortAddress } = res;
		// console.warn('dealNewResultValue',res)
		// console.warn('dealNewResultValue',longitudeString,latitudeString,gangAoTai,defaultAddress,addressDetail,shortAddress)
		const _addressData = {
			lng:longitudeString,
			lat:latitudeString,
			isGangAoTai:gangAoTai,
			isDefault:defaultAddress,
			detailAddress:addressDetail,
			shortAddressName:shortAddress
		};
		return Object.assign(res,_addressData);
	}
	/**
	 * @description: 处理返回数据
	 * @param {*} res
	 * @return {*}
	 */
	dealBackResult = (res) => {
		if (this.platform === 'ios') {
			// 只针对H5的router回值做了处理。
			if (res.address) {
				let addressData = res.address;
				if(typeof addressData === 'string'){
					try {
						addressData = JSON.parse(addressData);
					} catch (error) {
						return {};
					}	
				}
				// 这个是H5回值映射方法
				return this.dealNewResultValue(addressData);
			}
			return res;
		}
		if (this.platform === 'android' && res.result) {
			let _result = res.result || {};
			if (typeof _result === 'string') {
				try {
					_result = JSON.parse(_result);
				} catch (error) {
					return {};
				}
			}
			// 只针对H5的router回值做了处理。
			if (_result.address) {
				let addressData = _result.address;
				if(typeof addressData === 'string'){
					try {
						addressData = JSON.parse(addressData);
					} catch (error) {
						return {};
					}
				}
				// 这个是H5回值映射方法
				return this.dealNewResultValue(addressData);
			}
			return _result;
		}
		if (this.platform === 'HarmonyOS' && res.result) {
			let _result = res.result || {};
			if (typeof _result === 'string') {
				try {
					_result = JSON.parse(_result);
				} catch (error) {
					return {};
				}
			}
			// 只针对H5的router回值做了处理。
			if (_result.address) {
				let addressData = _result.address;
				if(typeof addressData === 'string'){
					try {
						addressData = JSON.parse(addressData);
					} catch (error) {
						return {};
					}
				}
				// console.warn('addressData----dealBackResult',addressData)
				// 这个是H5回值映射方法
				return this.dealNewResultValue(addressData);
			}
			return _result;
		}
		return {};
	};
    /**
	 * @description: 创建一个Promise，处理跳转
	 * @param {string} url 目标URL
	 * @param {*} params 参数
	 * @param {boolean}  是否为方法
	 * @param {string} errMsg 失败log日志
	 * @return {*}
	 */
    createPromise = (
		url: string,
		params = {},
		isMethod: boolean = false,
		errMsg: string = ''
	): Promise<unknown> | undefined => {
		if (url) {
			try {
				return new Promise((resolve, reject) => {
					const opt = {
						isMethod: isMethod,
						success: (res={}) => {
							let result = this.dealBackResult(res);
							const {lat,lng,latitude,longitude} = result || {};
							if(!lat && latitude){
								result.lat = latitude;
								result.lng = longitude;
							}
							if(isValidAddress(lat,lng) || isValidAddress(latitude,longitude)){
								resolve(result);
							}else{
								// 经纬度不存在的时候上报10001
								// 如果是 打开地址弹层，此次调用h5 遇到了降级，ios和android会走成功回调，但业务需要重新调用原生空间。此处通过属性告诉业务。
								result._openAddress = true;
								reject(result);
								// console.error('success:地址router失败回调',url,result);
							}
							
						},
						fail: (res) => {
							reject(res);
							// console.error('fail:地址router失败回调', url, res, errMsg);
						},
					};
					jumpAPI.jump(url, params, opt);
				});
			} catch (error) {
				// console.log('~~~~~~~~~~~~~~~~~', error);
				return undefined;
			}
		}
		return undefined;
	};

	/**
	 * @description: 新建地址页面
	 * @params : 参数应该在 businessInterface 层定义好，每个业务参数所需要的sceneId、token、from 不一致
	 * 必传参数：{
	 * 		from: params.from ,
			token: params.token,
		}	
		如{
			token : 'sWM//cW3nJ5cQFEVazE4G//zMYFs73VvDULi7lCEcczbQkcJoZOU1U0cqjAG1Kfa5Ux7BWamrY8LbP/VTTMCmw==',
			bizCode : 'hourlyNearby',
			sceneCode: 'updateOrder',
			from: 'hourlyOrderApp',  
		}
	 * @return {*}
	 */
	openNewAddressPage = (params): Promise<unknown> | undefined => {
		const routerInfo = 'newAddress';
		const _Params =  encodeURIComponent(JSON.stringify({
			sceneId: 'locService',
			channelsource: '3',
			type: 'add',
			ruleType: 'overhangCheck',
			distanceCheckMode: 'bicycling',
			...params
		}))
		const param = {
			params: _Params,
			type: params.pageType || 'edit',
			splitParamSelfRefreh: params.splitParamSelfRefreh || '1'
		};
		const config = getConfigSetting(routerInfo);
		return this.createPromise(config.url, param);
	};
	/**
	 * @description: 获取当前定位地址
	 * @param {*} Promise
	 * @return {*}
	 */
	getLocationAddress = (): Promise<unknown> | undefined => {
		const config = getConfigSetting('getLocationAddress');
		const param = {
			sceneId: 'locService',
			sceneIds:'basicShoppingProcess|locService|marketingActivities|receiveAddress'
		}
		return this.createPromise(config.url, param);
	};
	/**
	 * @description: 获取缓存地址
	 * @param {*}
	 * @return {*}
	 */
	
	getCacheAddress = (): Promise<unknown> | undefined =>  {
        return new Promise(()=>{
			const config = getConfigSetting('getCacheAddress');
			return this.createPromise(config.url, {});       
    
        })
		
	};
	/**
	 * @description: 获取地址，先缓存地址，后定位地址
	 * @param {*}
	 * @return {*}
	 */
	getAddressInfo =  () =>{
		// return new Promise(async (resolve, reject)=>{
			if(isJDApp){
				// try {
				// 	
				// 	await this.createPromise(config.url, {}).then((res)=>{
				// 		resolve(res)
				// 	}).catch(()=>{
				// 		reject({})
				// 	});      
				// } catch (error) {
				// 	console.error('京东报错',error);
				// 	reject({})
				// }
				const config = getConfigSetting('getCacheAddress');
				return this.createPromise(config.url, {})
			}else{
				return getH5Location();
			}
		// })
	}	
	/**
	 * @description: 显示地址选择控件 —— 半弹层形式
	 * @params encodeURIComponent()
	 * @return {*}
	 * {
			token: 'qxMhjEUHQRNBNdnzkW8Aq/TQJ19zuBoYhq62Y4clMDXic6pxvoi1yw1cwVVqYAegPTKPAPtxrjxS2ymfNcF1pA==',
			from: 'storeDetailApp',
		};
	 */
	showAddressListFloat = (params?): Promise<unknown> | undefined => {
		const routerInfo = 'showAddressSelectPageNew';
		let param = {};
        if(!!isHarmonyOS){
            param = {
                params: encodeURIComponent(
					JSON.stringify({
						sceneId: 'locService',
						channelsource:'3',
						token: params.token,
						from: params.from,
						...params
					})),
                option: 'address',
                translucent: true,
                hideTitle: true,
                dismissOnBackgroundTouch: true,
                contentArea: {
                    x: 0,
                    y: 0.2,
                    width: 1,
                    height: 0.8,
                },
                type: 'delivery'
            };
        }else{
            const _Params = encodeURIComponent(JSON.stringify({
                sceneIds: 'basicShoppingProcess|locService|marketingActivities|receiveAddress',
                sceneId:'locService',
                channelsource:3,
                halfSwitchFull: true,
                addressBalanceAppVoList:encodeURIComponent(JSON.stringify([{"type":"5","attribute":{"edit":false,"readonly":false,"selected":false,"delete":false}}])),
				token: params.token,
                from: params.from,
				...params
            }))
           	param = {
                params: _Params,
                type: 'delivery'
            };
        }
		const config = getConfigSetting(routerInfo);
		return this.createPromise(config.url, param);
	};
	/**
	 * @description: 显示地址列表页
	 * 参考文档https://joyspace.jd.com/pages/Uwb186C88Ld6LaReZnPk
	 * @return {*}
	 */
	openAddressListPage = (params): Promise<unknown> | undefined => {
		const routerInfo = 'openAddressListPage';
		const _Params = encodeURIComponent(JSON.stringify({
			sceneId: 'locService',
			token: params.token || 'kTs1MKoTUQSTjWrIZYzGsAiuPK1ks7KVcSq6o1DILNM=',
			from: params.from || 'omni_channel_store',
			channelsource:3
		}))
		const param = {
			params: _Params,
			type: 'location'
		};
		const config = getConfigSetting(routerInfo);
		return this.createPromise(config.url, param);
	};
}

export default new LocationHelper();
