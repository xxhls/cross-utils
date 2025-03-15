import { isType } from "../base";

/**
 * 生产日期格式化函数
 * 将日期转换为带"生产"后缀的中文格式
 * 
 * @param text 日期字符串，期望格式为 "YYYY-MM-DD"（如："2022-02-02"）
 * @returns 格式化后的生产日期字符串
 * 
 * 规则：
 * 1. 如果是本年生产，只显示"月日"（如：2月2日生产）
 * 2. 如果不是本年生产，显示完整"年月日"（如：2022年2月2日生产）
 * 3. 如果传入的不是标准日期格式（不包含"-"），直接返回原文本
 * 
 * @example
 * // 假设当前是2024年
 * getProductionDate("2024-03-15")  // 返回："3月15日生产"
 * getProductionDate("2023-03-15")  // 返回："2023年3月15日生产"
 * getProductionDate("无生产日期")   // 返回："无生产日期"
 */
const getProductionDate = (text) => {
    // 如果文本不存在或不包含"-"，直接返回原文本
    if(!!text && !text?.includes("-")){
        return text;
    }

    const currentDate = new Date();
    const date = new Date(text);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月份从0开始，需要加1
    const day = date.getDate();
    let result;

    // 判断年份是否与当前年份相同
    if (year === currentDate.getFullYear()) {
        // 年份相同，只显示月日
        result = `${month}月${day}日生产`;
    } else {
        // 年份不同，显示完整年月日
        result = `${year}年${month}月${day}日生产`;
    }

    return result;
};

export default getProductionDate;