// 默认地址：朝阳公园
export async function getDefaultAddress() {
  // ("shortAddressName": null"where": "北
  // 11
  // 京朝阳区麦子店街道朝阳公
  // 12
  //         园""addresslD":0"cityName"："朝
  // 13
  //         阳区""addressDetail"："朝阳公
  // 14
  //         园"cityld": 72, "areald": 55674, "townNa
  // 15
  //         me":""townld": 0, "lati": "39.944093""p
  // 16
  //         rovinceld":1"provinceName":"北京""l
  // 17
  //         ongi""116.482276""areaName""麦子
  // 18
  // 店街道
  const area = [1, 72, 55674, 0].map((item) => item || "0").join("_");
  return {
    latitude: 39.944093,
    longitude: 116.482276,
    addressDetail: "朝阳公园",
    areaName: "麦子店街道",
    fullAddress: "北京朝阳区麦子店街道朝阳公园",
    cityName: "朝阳区",
    provinceName: "北京",
    provinceId: 1,
    cityId: 72,
    countyId: 55674,
    townId: 0,
    area,
  };
}
