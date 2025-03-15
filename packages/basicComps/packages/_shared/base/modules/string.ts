import { stringUtils, dataConvert } from "../../dataUtils";

export { stringUtils };

// 导出常用方法
export const { replaceAll, deepEqual } = stringUtils;

// 导出字符串相关的数据转换方法
export const { stringify, base64 } = dataConvert;
