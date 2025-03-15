
/**
 * 
 * H5获取地址模块
 * 
 */

import cookie from "../../Cookie";
import jdlbs from '@jd/lbs-sdk';
import { isJDApp, isJingGouMiniprogram } from "../../Platform";
const appid = '3880d7aa5234212e8639d2c187a5ea3c';
const sceneId = 'locService';//属于同城业务，直接写死就行

function hasLocationPermissionWithScene () {
    return new Promise((resolve) => {
        jdlbs.hasLocationPermissionWithScene({
            appid, // 必传。业务id
            sceneId, //新增，必传。场景id
            success ({ status, param, data, msg }) {
                resolve(data);
            },
            fail () { // { status, param, data, msg }
                // todo
                resolve(false);
            }
        });
    });
}

let singlePromiseIntrance = null;
function requestLocationPermissionWithScene () {
    let flag = false;
    if (!singlePromiseIntrance) {
        singlePromiseIntrance = new Promise((resolve) => {
            jdlbs.requestLocationPermissionWithScene({
                appid, // 必传。业务id
                sceneId, //新增，必传。场景id
                // sceneContent: '', //新增，必传。场景描述
                success ({ status, param, data, msg }) {
                    resolve(data);
                },
                fail () { // { status, param, data, msg }
                    resolve(false);
                }
            });

            setTimeout(() => {
                flag = true;
                resolve(false);
            }, 5000);
        });
    }

    return singlePromiseIntrance;

}
/**
 * 格式化地址信息，从地址router返回转换成全站地址规范
 * @param addressInfo
 */
export const formatAddress_H5 = (addressInfo) => {
	const {
		detailAddress,
		srclng,
        lng,
		srclat,
        lat,
		provinceid = 0,
		cityid = 0,
		countyid = 0,
		townid = 0,
		fullAddress,
        detailaddr,
        poi
	} = addressInfo || {};

	const defaultText = '您的收货地址不在配送范围内，请重新选择';

	const locationId = `${provinceid}-${cityid}-${countyid}-${townid ||0}`;
	const area = `${provinceid}_${cityid}_${countyid}_${townid || 0}`;

	//这里会存在只有fullAddress的情况
	const addressTxts =   detailaddr || detailAddress || fullAddress || defaultText || poi;
	return {
		cityId:cityid,
		lng: Number(lng || srclng ||'0'),
		lat: Number(lat || srclat ||'0'),
		locationId: locationId,
		addressText: addressTxts,
		shortAddressName: poi || fullAddress ||addressTxts,
		area:area
	};
};

// H5 lbs 获取地址模块 文档：https://npm.m.jd.com/package/@jd/lbs-sdk

export const requestLocationPermission = async(): Promise<{ success: boolean; error?: any }> => {
    // throw new Error("Method not implemented.");
    // const canUseJDLBS = (System.isAndroid && await needHighVersion('11.6.5')) || (System.isIOS && await needHighVersion('11.8.1'));

    // LBS定位支持 京东商城安卓 11.6.5版本 京东商城11.8.1版本
    if (isJDApp) {
        // 
        try {
            // 判断是否有权限，没有权限执行以下逻辑
            const hasPerm:any = await hasLocationPermissionWithScene();
            if (!!hasPerm?.result) {
                return {success: true};
            }
        } catch (error) {
            try {
                // 没权限，进行授权弹窗
                const perm = await requestLocationPermissionWithScene();
                
                if (perm?.result) {
                    return {success: true};
                }
                return {success: false}

            } catch (error) {
                return {success: false, error}
            }
        }
    }
    return {success: false};
}

// 获取缓存的经纬度和地址经纬度(主站里是缓存在客户端的)
export const getLocation_H5 = async (): Promise<{ data?: any, error?: any }> => {

    return new Promise((resolve, reject) => {
        jdlbs.getLocation({
            appid,
            sceneId,
            success: async ({status, params, data, msg}) => {
                if (data?.srclat && data?.srclng) {
                    if(!data?.fullAddress && !data?.detailaddr){
                        await getAddress_H5({
                            lat:data.srclat,
                            lng:data.srclng
                        }).then((res)=>{
                            if(res?.data){
                                const resule_V = formatAddress_H5(res.data);
                                resolve({data: resule_V})
                            }else{
                                reject({error:{}});
                            }  
                        }).catch((error)=>{
                            reject({error});
                        });
                       
                        return ;
                    }
                    const resule_V = formatAddress_H5(data);
                    resolve({data: resule_V})
                }    
            },
            fail (error) {
                reject({error});
            }
        })
    })
    // throw new Error("Method not implemented.");
}
// 根据经纬度获取详细地址
export const getAddress_H5 = ({lat,lng})=>{
    return new Promise((resolve, reject) => {
        jdlbs.getAddress({
            appid,
            sceneId, //新增，必传。场景id
            ifip: false, // 可选
            ifdetail: true, // 可选
            lat: lat,// 可选
            lng: lng,// 可选
            ipaddr: '',// 可选
            success({status, param, data, msg}){
                resolve({status, param, data, msg})
            },
            fail ({status, param, data, msg}) {
                reject({status, param, data, msg})
            }
        });
    })
    

}
    // 获取实时经纬度
export const getLatLng_H5 = async(): Promise<{ data?: any, error?: any }> => {
    return new Promise((resolve, reject) => {
        jdlbs.getLatLng({
            appid,
            sceneId,
            success: ({status, params, data, msg}) => {
                if (data?.srclat && data?.srclng) {
                    const resule_V = formatAddress_H5(data);
                    resolve({data: resule_V})
                    // getAddress_H5({
                    //     lat: resule_V.lat,
                    //     lng:  resule_V.lng, 
                    //     sucCallBack:()=>{
                    //         resolve({data: resule_V})
                    //     }, 
                    //     failCallBack:()=>{

                    //     }
                    // })
                }    
            },
            fail (error) {
                reject(error);
            }
        })
    })
}

/**
 * 目的：微信场域js加载
 * 使用时机：H5项目初始化的时候进行；
 * 结果：在微信内，调用微信方法；
 */
export const formatAddress = (address) => {
    if (address && address.indexOf('_') !== -1) {
        return address.replace(/_/g, "-");
    }
    return address
  }
export const miniFormatAdd = (address) =>{
    const addressArr = address.split('|') || [];
    const area = addressArr[1];
    const itudes = (addressArr?.[4] || ',').split(',');
    const longitude = itudes[0]
    const latitude = itudes?.[1];
    const addressDetail =  addressArr?.[2] || '';
    const fullAddress = addressArr?.[3] || '';
    const addressTxt = {lng: longitude, lat : latitude,area, locationId:formatAddress(area),addressDetail,fullAddress};
    return addressTxt;
 }
export const getMiniprogramLocation = () =>{
    // 先从cookie中取，取不到，从链接上去。
    const addressTxt = cookie.get('wq_addr');
    if(!!addressTxt){
        const addressInfo = miniFormatAdd(unescape(addressTxt));
        return addressInfo
    }else{
        const url = window.location.href;
        const urlArr = url.split('&');
        let address = null;
        urlArr.forEach(element => {
            // 获取链接上的地址
            if (element.includes('sens')){
                const _addressSens = element.replace("sens=", "");
                const address_V = JSON.parse(decodeURIComponent(_addressSens))?.wq_addr || '';
                if(address_V){
                    const addressInfo = miniFormatAdd(address);
                    const addressInfo_V = formatAddress_H5(addressInfo);
                    address = addressInfo_V;
                }
            }
        });
        return address;
    }

}
export const getH5Location = () =>{
    const fn = (resolve,reject)=>{
        getLocation_H5().then((res)=>{
            const {data} = res || {};
            resolve(data)
        }).catch((error)=>{
            reject({})
        })
    }
    return new Promise((resolve,reject)=>{
        if(isJingGouMiniprogram){
            const address = getMiniprogramLocation();
            if(address){
                resolve(address);
            }else{
                fn(resolve,reject)
            }
        }else{
            fn(resolve,reject);
        }

    })
}