import { isEmpty } from "./isType";

/**
 * 文本分割和样式处理工具
 * 将文本按指定分隔符分割，并为每个部分添加样式
 * 
 * @param data 配置对象，包含以下属性：
 * @param {string} data.text 需要处理的原始文本
 * @param {string} data.splitText 分隔符
 * @param {string} data.color 主文本颜色（可选）
 * @param {string} data.splitColor 分隔符颜色（可选，默认使用主文本颜色）
 * @param fontFamily 字体族（可选参数，暂未使用）
 * @returns 返回处理后的HTML字符串
 * 
 * @description
 * 处理流程：
 * 1. 验证输入数据有效性
 * 2. 设置默认颜色
 * 3. 按分隔符分割文本
 * 4. 为每个部分添加样式包装
 * 
 * @example
 * const result = replaceWordWithLabel({
 *   text: "Hello,World",
 *   splitText: ",",
 *   color: "#333",
 *   splitColor: "#999"
 * });
 * // 返回:
 * // '<span style="color:#333;font-family:'PingFang SC';">Hello</span>
 * // <span style="color:#999;font-family:'PingFang SC';">,</span>
 * // <span style="color:#333;font-family:'PingFang SC';">World</span>'
 */
const replaceWordWithLabel = (data: { [key: string]: string }, fontFamily?) => {
    // 输入验证：检查data对象和text属性是否为空
    if (isEmpty(data) || isEmpty(data.text)) return '';
  
    // 设置默认颜色，如果未指定则使用'unset'
    const defaultColor = data.color || 'unset';
    const word = data.text;
    const _split = data.splitText;
    // 按分隔符分割文本
    const wordList = word.split(_split);
    // 获取分隔符颜色，如果未指定则使用默认颜色
    const _splitColor = data.splitColor || defaultColor;

    // 处理每个文本片段
    return wordList.map((part, i) => {
        // 处理最后一个片段（不需要添加分隔符）
        if (i == wordList.length - 1) {
            return `<span style="color:${defaultColor};font-family:'PingFang SC';">${part}</span>`;
        } else {
            // 处理非最后片段（需要添加分隔符）
            return `<span style="color:${defaultColor};font-family:'PingFang SC';">${part}</span>` +
                   `<span style="color:${_splitColor};font-family:'PingFang SC';">${_split}</span>`;
        }
    }).join('');
};
  
export default replaceWordWithLabel;