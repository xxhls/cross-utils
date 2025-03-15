/** @format */

import { getConfigSetting } from "./utils/jumppath";
import { getH5Location, getLocation_H5 } from "./utils/addressLBS.h5";
import jumpAPI from "../jumpAPI";
import { isObject } from "../../utils/base";
import { formatAddress } from "./utils";
import { isHarmonyOS, isJDApp, isJingGouMiniprogram } from "../Platform";
import { getDefaultAddress } from "./utils/default";
import jdaddr from "@jd/lbs-ace-addr";

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
  addressId?: number;
  shortAddressName?: string;
}

/**
 * @description: 地址相关API类
 */
class LocationHelper {
  platform: string = "none";
  constructor() {}

  defaultAddress = getDefaultAddress();

  getLBSLocation = (source) => {
    const params: any = {
      routerURL: `router://JDLBSLocationModule/getLBSLocation?source=${source}`,
    };

    // if (isAndroid) {
    // 	params.jdRouter = '1'
    // }

    // return new Promise((resolve, reject) => {
    // 	callRouter(params).then(({ status, data, msg }) => {
    // 		if (status === '0') {
    // 			resolve(data)
    // 		} else {
    // 			reject({ status, data, msg })
    // 		}
    // 	})
    // })
  };

  /**
   * @description: 新老路由回传值 - 值包装
   * @param {*} res
   * @return {*}
   */
  dealNewResultValue = (res = {}) => {
    // 参照319方案文档
    const {
      longitudeString,
      latitudeString,
      gangAoTai,
      defaultAddress,
      addressDetail,
      shortAddress,
    } = res;
    // console.warn('dealNewResultValue',res)
    // console.warn('dealNewResultValue',longitudeString,latitudeString,gangAoTai,defaultAddress,addressDetail,shortAddress)
    const _addressData = {
      lng: longitudeString,
      lat: latitudeString,
      isGangAoTai: gangAoTai,
      isDefault: defaultAddress,
      detailAddress: addressDetail,
      shortAddressName: shortAddress,
    };
    return Object.assign(res, _addressData);
  };
  /**
   * @description: 处理返回数据
   * @param {*} res
   * @return {*}
   */
  dealBackResult = (res) => {
    const _res = isObject(res) ? res : JSON.parse(res);
    const addressData = _res.data || {};
    const addressDataV = this.dealNewResultValue(addressData);
    return addressDataV;
  };
  /**
   * @description: 创建一个Promise，处理跳转
   * @param {string} url 目标URL
   * @param {*} params 参数
   * @param {boolean}  是否为方法
   * @param {string} errMsg 失败log日志
   * @return {*}
   */
  createPromise = (url: string, params = {}): Promise<unknown> | undefined => {
    return new Promise((resolve, reject) => {
      if (url) {
        try {
          const opt = {
            success: (res = {}) => {
              const result = this.dealBackResult(res);
              const address = formatAddress(result);
              if (isObject(result)) {
                resolve(address);
              } else {
                reject(result);
              }
            },
            fail: (res) => {
              reject(res);
            },
          };
          jumpAPI.jump(url, params, opt);
        } catch (e) {
          resolve(this.defaultAddress);
        }
      } else {
        resolve(this.defaultAddress);
      }
    });
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
    const routerInfo = "newAddress";
    const _Params = {
      sceneId: "locService",
      channelsource: "3",
      type: "add",
      ruleType: "overhangCheck",
      distanceCheckMode: "bicycling",
      ...params,
    };
    const param = {
      params: _Params,
      type: params.pageType || "edit",
      splitParamSelfRefreh: params.splitParamSelfRefreh || "1",
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
    const config = getConfigSetting("getLocationAddress");
    const param = {
      sceneId: "locService",
      sceneIds:
        "basicShoppingProcess|locService|marketingActivities|receiveAddress",
    };
    return this.createPromise(config.url, param);
  };
  /**
   * @description: 获取缓存地址
   * @param {*}
   * @return {*}
   */

  getCacheAddress = (): Promise<unknown> | undefined => {
    if (isJingGouMiniprogram) {
      return new Promise(async (resolve, reject) => {
        jdaddr.getAddressGlobal({
          appid: "3880d7aa5234212e8639d2c187a5ea3c",
          sceneId: "locService", //新增，必传。场景id
          success(info) {
            if (info.status === "0") {
              info.data.latitude = info?.data?.latitude || info?.data?.lat;
              info.data.longitude = info?.data?.longitude || info?.data?.lng;
              const {
                showAddressName,
                shortAddressName,
                addrDtl,
                fullAddress,
                cityName,
                provinceName,
                provinceId,
                cityId,
                countyId,
                townId,
              } = info.data || {};
              const { provinceCode, cityCode, districtCode, townCode } =
                info.data || {};

              const addressDetail =
                showAddressName ||
                shortAddressName ||
                addrDtl ||
                fullAddress ||
                cityName ||
                provinceName ||
                "";

              let area = "0_0_0_0";
              if (provinceId || cityId || countyId || townId) {
                area = [provinceId, cityId, countyId, townId]
                  .map((item) => item || "0")
                  .join("_");
              } else {
                area = [provinceCode, cityCode, districtCode, townCode]
                  .map((item) => item || "0")
                  .join("_");
              }

              // addressInfo.latitude = addressInfo.lat
              // addressInfo.longitude = addressInfo.lng
              // addressInfo.addressDetail = addressInfo.fullAddress
              // addressInfo.area = addressInfo.area

              resolve({
                address: info.data,
                addressDetail,
                area,
                latitude: info.data.latitude,
                longitude: info.data.longitude,
              });
            } else {
              reject({ msg: "全站缓存地址为空" });
            }
          },
          async fail(error) {
            let err = error;
            // console.log('进入到了LBS中的_getAddress的的的的fail', error)
            try {
              if (error.status == "-301") {
                const res = (await getH5Location()) as any;
                res.latitude = res.latitude || res.lat;
                res.longitude = res.longitude || res.lng;
                global.console.log(
                  "进入到了LBS中的_getAddress的的的的fail",
                  res,
                );
                // H5中获取缓存地址失败，先用缓存地址
                if (!!res.latitude && !!res.longitude) {
                  res.address = res;
                  res.addressDetail = res.fullAddress;
                  resolve(res);
                } else {
                  reject({ msg: "获取全栈缓存失败，代码异常", error: err });
                }

                return;
              }
            } catch (error) {
              err = error;
              // console.log('进入到了LBS中的_getAddress的的的的fail', error)
            }
            reject({ msg: "获取全栈缓存失败，代码异常", error: err });
          },
        });
      });
    } else {
      const config = getConfigSetting("getCacheAddress");
      return this.createPromise(config.url, {});
    }
  };
  /**
   * @description: 获取地址，先缓存地址，后定位地址
   * @param {*}
   * @return {*}
   */
  getAddressInfo = () => {
    return new Promise(async (resolve, reject) => {
      if (isJDApp) {
        try {
          // console.error('京东请求地址');
          const config = getConfigSetting("getCacheAddress");
          await this.createPromise(config.url, {})
            .then((res) => {
              // console.error('京东请求地址-成功',res);
              resolve(res);
            })
            .catch(() => {
              reject({});
            });
        } catch (error) {
          // console.error('京东报错',error);
          reject({});
        }
      } else {
        getH5Location()
          .then((res) => {
            // console.error('京东请求地址-成功 h5',res);
            resolve(res);
          })
          .catch((error) => {
            reject({});
          });
      }
    });
  };
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
    const routerInfo = "showAddressSelectPageNew";
    let param = {};
    if (!!isHarmonyOS) {
      param = {
        params: {
          sceneId: "locService",
          channelsource: "3",
          token: params.token,
          from: params.from,
        },
        option: "address",
        translucent: true,
        hideTitle: true,
        dismissOnBackgroundTouch: true,
        contentArea: {
          x: 0,
          y: 0.2,
          width: 1,
          height: 0.8,
        },
        type: "delivery",
      };
    } else {
      const _Params = {
        sceneIds:
          "basicShoppingProcess|locService|marketingActivities|receiveAddress",
        sceneId: "locService",
        channelsource: 3,
        halfSwitchFull: true,
        addressBalanceAppVoList: encodeURIComponent(
          JSON.stringify([
            {
              type: "5",
              attribute: {
                edit: false,
                readonly: false,
                selected: false,
                delete: false,
              },
            },
          ]),
        ),
        token: params.token,
        from: params.from,
      };
      param = {
        params: _Params,
        type: "delivery",
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
    const routerInfo = "openAddressListPage";
    const _Params = {
      sceneId: "locService",
      token: params.token || "kTs1MKoTUQSTjWrIZYzGsAiuPK1ks7KVcSq6o1DILNM=",
      from: params.from || "omni_channel_store",
      channelsource: 3,
    };
    let param = {};
    if (!!isHarmonyOS) {
      param = {
        params: _Params,
        option: "address",
        translucent: true,
        hideTitle: true,
        dismissOnBackgroundTouch: true,
        contentArea: {
          x: 0,
          y: 0.2,
          width: 1,
          height: 0.8,
        },
        type: "location",
      };
    } else if (!!isJingGouMiniprogram) {
      const token = encodeURIComponent("Dw9vxp7O7olGCyS9EnX6fA==");
      const sceneId = encodeURIComponent("locService");
      const from = encodeURIComponent("tgpdxcx");
      const rurl = encodeURIComponent(`${location.href}&currentAddress=true`);

      // global.console.log('rurl===>', `/pages/address/pages/location/index?token=${token}&sceneId=${sceneId}&from=${from}&rurl=${rurl}`)

      return wx.miniProgram.navigateTo({
        url: `/pages/address/pages/location/index?token=${token}&sceneId=${sceneId}&from=${from}&rurl=${rurl}`,
      });
    } else {
      param = {
        params: _Params,
        type: "location",
      };
    }
    const config = getConfigSetting(routerInfo);
    return this.createPromise(config.url, param);
  };
}

export default new LocationHelper();
