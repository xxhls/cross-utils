
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
	}
	/**
	 * @description: 新老路由回传值 - 值包装
	 * @param {*} res
	 * @return {*}
	 */
	dealNewResultValue = (res={} ) => {
		// 参照319方案文档
		
	}
	/**
	 * @description: 处理返回数据
	 * @param {*} res
	 * @return {*}
	 */
	dealBackResult = (res) => {
	
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
        params = {}
    ) => {
       
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
	openNewAddressPage = (params) => {
		
	};
	/**
	 * @description: 获取当前定位地址
	 * @param {*} Promise
	 * @return {*}
	 */
	getLocationAddress = () => {
		
	};
	/**
	 * @description: 获取缓存地址
	 * @param {*}
	 * @return {*}
	 */
	
	getCacheAddress = () =>  {
        
		
	};
	/**
	 * @description: 获取地址，先缓存地址，后定位地址
	 * @param {*}
	 * @return {*}
	 */
	getAddressInfo =  () =>{
		
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
	showAddressListFloat = (params?) => {
		
	};
	/**
	 * @description: 显示地址列表页
	 * 参考文档https://joyspace.jd.com/pages/Uwb186C88Ld6LaReZnPk
	 * @return {*}
	 */
	openAddressListPage = (params) => {
		
	};
}

export default new LocationHelper();
