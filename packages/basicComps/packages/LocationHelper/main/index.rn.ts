import System from "../system";
import { JDJumping, JDAddress, JDNativeSystem } from '@jdreact/jdreact-core-lib';
import { formatAddress } from "./utils";
import compareVersions from "../system/compareVersions";

const JDLBS = require('@jdreact/jdreact-core-lib/Libraries/JDLBS');

// http://lbsyun.jd.com/ 申请businessId
const businessId = '3880d7aa5234212e8639d2c187a5ea3c';
const sceneId = 'locService';//属于同城业务，直接写死就行
const IOS_SUPPORT_REMOTE_JSON_VERSION = '13.8.6' //用于控制rn环境中缓存地址使用的版本号
const SUPPORT_REMOTE_JSON_VERSION = '13.0.0' //用于控制rn环境中打开地址列表的版本号

const isSupportLBSVersion = new Promise<boolean>((resolve) => {

    JDNativeSystem.getClientVersion().then((version: string) => {
        resolve(
            compareVersions(IOS_SUPPORT_REMOTE_JSON_VERSION,version)!=-1
        )
    }).catch(() => {
        resolve(false)
    })
})

const isLowVersionList = new Promise<boolean>((resolve) => {

    JDNativeSystem.getClientVersion().then((version: string) => {
        resolve(
            compareVersions(SUPPORT_REMOTE_JSON_VERSION,version)!=-1
        )
    }).catch(() => {
        resolve(false)
    })
})

export enum E_AddressError {
    /**
     * '全站缓存地址为空'
     */
    EmptyCache,
    /**
     * '获取全栈缓存失败，代码异常'
     */
    FailGetCache,
}

class LocationHelper {



    /**
     * 权限申请
     */
    async requestLocationPermission(): Promise<{ success: boolean; error?: any }> {
        // const canUseJDLBS = (System.isAndroid && await needHighVersion('11.6.5')) || (System.isIOS && await needHighVersion('11.8.1'));
        // if (canUseJDLBS) {
            // click_log({}, '进入LBS');
            // 这里可能存在卡住不往下走的情况，但是又不好使用延迟进行兜底，用户很有手机相应慢，弹窗授权响应慢等等情况，所以不兜底了。
        try {
            // click_log({}, '判断是否有权限');
            // 判断是否有权限
            await JDLBS.hasLocationPermissionWithScene({ businessId, sceneId });
            return { success: true }
        } catch (error) {
            try {
                await JDLBS.requestLocationPermissionWithScene({ businessId, sceneId });
                // 申请成功
                return { success: true }
            } catch (err) {
                // 0 跳转权限设置 -1 拒绝 -2 取消弹窗 -3 忽略（已多次拒绝） 
                // -4 场景授权拒绝 -5 未弹窗（已有权限 or 未传sceneId or 距离上次申请不满48小时）
                return { success: false, error: err }
            }
        }
            //调用之前 先有业务权限申请，然后是定位权限申请，都是true 才能调用
        // }
        // return { success: true }
    }

    /**
     * 获取经纬度+地址（需有场景权限，否则返回错误码）
     */
    async getAddressInfo(): Promise<{ data?: any, error?: any }> {
        const { success, error } = await this.requestLocationPermission()
        if (!success) {
            return { error }
        }
        return new Promise((resolve) => {
            JDLBS.getAddress({ businessId, isNeedDetail: '1', sceneId }, (data) => {
                //返回 {lati,longi}
                resolve({ data })
            }, (error) => {
                resolve(error)
            });
        })
    }

    /**
     * 获取缓存位置,支持lbs地址和全站缓存地址
     * @param svcType 只有是lbs缓存地址时，才需要传入lbs ，否则默认全站缓存地址
     * @param source 来源，用于传给router
     */
    async getCacheAddress(params?): Promise<{ data?: any, error?: any }> {
        const {svcType,source} = params || {};

        return isSupportLBSVersion
        .then((support) => (
            support && svcType 
                ? this.getLBSCacheAddress(source).then(res => ({ ...res, svcType }))
                : this.getB2CCacheAddress().then(res => ({ ...res, svcType: '' }))
        ))
    }

    /**
     * 获取经纬度(耗时)（需有场景权限，否则返回错误码）
     */
    async getLatLng(): Promise<{ data?: any, error?: any }> {
        const { success, error } = await this.requestLocationPermission()
        if (!success) {
            return { error }
        }
        //申请成功，走实时定位。
        try {
            const location = await this._getLatLng();
            if (location.data) {
                return { data: location.data };
            } else {
                return { data: location };
            }
        } catch (error) {
            return { error }
        }
    }

    private _getLatLng() {
        return new Promise<{ success: boolean, data?: any, error?: any }>((resolve) => {

            const t = setTimeout(() => {
                resolve({ "success": false, "error": { "timeout": true } });
            }, 1500);

            // getLatLng 方法ios侧不支持写缓存，第一次进入到家，切地址，再次进入时，没有获取到实时定位的地址。因此这里需要做平台判断，调用getAddress方法来支持。
            const getTimePosition = System.isIOS ? JDLBS.getAddress : JDLBS.getLatLng;

            getTimePosition({
                businessId,
                sceneId
            }, (data) => {
                clearTimeout(t);
                resolve({ "success": true, data });
            }, (error) => {
                clearTimeout(t);
                resolve({ "success": false, error });
            }, null);
        });
    }

    /**
	 * 获取lbs缓存地址
	 * @param params 
	 * @returns 
	 */
	getLBSCacheAddress = async (source?) =>  {
        const params = {
            "url": `router://JDLBSLocationModule/getLBSLocation?source=${source||'CouponSale_LBS'}`
        }
        let res = await JDJumping.jumpJDRouterWithCallback(params) 

        if (typeof res === 'string') {
            try {
                res = JSON.parse(res)
            } catch (error) {
                // console.log('缓存地址_序列化失败,加监控', res, error)
            }
        }

        const { code, msg, address, lbsType, showAddressName, showCityName, showAddressKey } = (res ?? {}) as LBSLocationResult;

        if (code != '0') {
            return { type: E_AddressError.FailGetCache, msg: `获取 LBS 地址失败，${msg || code}` }
        }
        if (!address.latitude || !address.longitude) {
            return { type: E_AddressError.EmptyCache, msg: '没拿到 LBS 地址' }
        }

        return formatAddress(address) as unknown as AddressResponse
    //pick(res, ['lbsType', 'address', 'showAddressName', 'showCityName', 'showAddressKey'])

	}

	/**
	 * 获取b2c缓存地址
	 * @param params 
	 * @returns 
	 */
	getB2CCacheAddress = async () =>  {
        try {
            const info = await JDAddress.getAddress(sceneId)
            // 如果拿到缓存地址
            info.addressId = info.addressID || info.addressId;
            info.latitude = info.lati || info.latitude;
            info.longitude = info.longi || info.longitude;
            info.provinceId = info.provinceId || info.provinceCode
            info.cityId = info.cityId || info.cityCode
            info.countyId = info.countyId || info.districtCode
            info.townId = info.townId || info.townCode
    
            info.provinceName = info.provinceName || info.province
            info.cityName = info.cityName || info.city
            info.areaName = info.areaName || info.district
            info.townName = info.townName || info.town
    
            let { fullAddress = '', provinceName = '', cityName = '', areaName = '', countyName = '', townName = '', addressDetail = '', areaId = 0, countyId = 0, provinceId = 0, cityId = 0, townId = 0 } = info;
            info.areaName = areaName || countyName;
            info.areaId = areaId || countyId;
            info.fourAddress = fullAddress || `${provinceName}${cityName}${info.areaName}${townName}${addressDetail}`
            // info.area = `${provinceId}_${cityId}_${info.areaId}_${townId}`;
            info.addressDetail = info?.showAddressName || info.shortAddressName || info.addressTitle || info.detailAddress || info.addressDetail || info.fullAddress || info?.cityName || info?.provinceName;
    
    
            // info.addrType = 2; // 全站缓存
            info.addressType = 2;
            // info.addressLocationType = info.addressLocationType || ''
    
            //获取经纬度 && 进行返回
            if (info.latitude && info.longitude) {
                return info
            } else {
                // console.log('没拿到全站缓存地址,_getCacheAddress1经纬度为空')
                return { type: E_AddressError.EmptyCache, msg: '全站缓存地址为空' }
            }
        } catch (error) {
            // console.log('没拿到缓存地址_getCacheAddress1', error)
            return { type: E_AddressError.FailGetCache, msg: '获取全栈缓存失败，代码异常', error }
        }
	}

    /**
     * 打开地址列表页
     */
    openAddressListPage = async (params?)=>{
        //版本号低于13.0.0版本 走 router://JDBusinessAddressModule/pushAddressSelectViewController
        const isHighVersion = await isLowVersionList;
        const isLBSVersion = await isSupportLBSVersion;
        return new Promise((resolve)=>{
            const {token,from,svcType} = params || {};
            // const allUrl = `router://JDBWebAddressModule/pushWebView`; //打开新页面 addressPageStyle = all


            const allUrl =  isHighVersion ? 'router://JDBWebAddressModule/pushWebView' :'router://JDBusinessAddressModule/pushAddressSelectViewController'
            const Params = encodeURIComponent(JSON.stringify({
                sceneId:'locService',
                token: token || '2sn/KVr9NjWgcDsmcwBYBQ==',
                from: from || 'tuangou',
                svcType: isLBSVersion ? svcType || undefined : undefined
            }))
        
            try{
                JDJumping.jumpJDRouterWithCallback({
                    "url": `${allUrl}?directParseUrl=1&type=location&params=${Params}`,
                }).then((data) => {

                    //安卓端返回的data是字符串类型
                    if (typeof data === 'string') {
                        try {
                            data = JSON.parse(data)
                        } catch (error) {
                        }
                    }
                    resolve(formatAddress(data))
                }).catch((err) => {
                    // console.error(err)
                    resolve({})
                })
            }catch(e){
                resolve({})
            }
        })
    }

    /**
     * 打开地址半弹窗
     * @param params 
     * @returns 
     */
    showAddressListFloat = (params?)=>{
        return new Promise((resolve)=>{
            const {token,from,svcType} = params || {};
            const halfUrl = "router://JDAddressModule/showAddressSelectPage"; //当前页面的半弹窗 addressPageStyle = half
            const Params = encodeURIComponent(JSON.stringify({
                sceneId:'locService',
                token: token || '2sn/KVr9NjWgcDsmcwBYBQ==',
                from: from || 'tuangou',
                svcType: svcType || undefined
            }))
        
            try{
                JDJumping.jumpJDRouterWithCallback({
                    "url": `${halfUrl}?directParseUrl=1&type=location&params=${Params}`,
                }).then((data) => {
                    resolve(formatAddress(data))
                }).catch((err) => {
                    // console.log(err)
                    resolve({})
                })
            }catch(e){
                resolve({})
            }
        })
    }

}

export default new LocationHelper();