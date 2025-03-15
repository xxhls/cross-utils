/**
 * 价格组件格式化来源
 */
export enum PriceFormat {
  /** 格式化 */
  FORMAT = "format",
  /** 优惠券 */
  DEFATULT = "defatult",
}

// 价格小数点格式化
/**
 *
 * @param price 价格
 * @param form 数据来源
 * @returns 格式化价格组件
 */
const getPrice = (price, form?: PriceFormat | undefined) => {
  try {
    if (!price) return null;
    // 如果不是数字或者字符串 return掉
    if (!["string", "number"].includes(typeof price)) return null;
    if (price < 0) return null;
    const priceArr = price.toString().split(".");
    return {
      int: priceArr[0],
      float: form === PriceFormat.FORMAT || priceArr[1] ? priceArr[1] : "00",
    };
  } catch (error) {
    // console.error(error, '喔唷，价格计算出错了');
    return null;
  }
};
export default getPrice;
