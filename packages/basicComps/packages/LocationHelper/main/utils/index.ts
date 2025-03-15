import { isType } from "../../../utils/dataUtils";


/**
	 * 判断经纬度是否合法
	 * @param lat lng 传入的经纬度信息 true 代表合法，false 不合法
	 */
export const isValidAddress = (lat,lng)=>{
    if(isType.isEmpty(lat) || isType.isEmpty(lng)) return false;
    try{
        const changedLat = Number(lat);
        const changedLng = Number(lng);
        if(changedLat>0 && changedLng>0){
            return true;
        }
        return false;
    }catch(e){
        return false;
    }
}
/**
 * 格式化地址信息，从地址router返回转换成全站地址规范
 * @param addressInfo
 */
export const formatAddress = (addressInfo) => {
	const {
		detailAddress,
		fourAddress = '',
		lng,
		lat,
		provinceId = 0,
		cityId = 0,
		countyId = 0,
		townId = 0,
		addressId,
		fullAddress,
		shortAddressName,
		latitude,
		longitude,
		shortAddress,
		addressDetail,
		longitudeString,
		latitudeString
	} = addressInfo || {};

	const defaultText = '您的收货地址不在配送范围内，请重新选择';

	const locationId = `${provinceId}-${cityId}-${countyId}-${townId}`;
	const area = `${provinceId}_${cityId}_${countyId}_${townId}`;

	//这里会存在只有fullAddress的情况
	const addressTxts =   fullAddress || addressDetail || detailAddress || fourAddress || defaultText || shortAddressName || shortAddress;
	const shortAddressText =  shortAddressName || shortAddress || addressDetail || detailAddress || fourAddress || fullAddress || defaultText;
	return {
		provinceId: provinceId,
		cityId: cityId,
		countyId: countyId,
		townId: townId,
		lng: Number(lng || longitude || longitudeString||'0'),
		lat: Number(lat || latitude || latitudeString || '0'),
		longitude: Number(lng || longitude || longitudeString ||'0'),
		latitude: Number(lat || latitude || latitudeString ||'0'),
		locationId: locationId,
		addressText: addressTxts,
		addressId: addressId,
		shortAddressName: shortAddressText,
		area:area,
		addressDetail:shortAddressText
	};
};
