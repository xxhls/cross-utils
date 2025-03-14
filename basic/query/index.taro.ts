import { getCurrentPages } from "@tarojs/plugin-platform-h5/dist/taroApis";
// 小程序获取链接参数
export const getQueryParam = (param: string) => {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const url = currentPage?.route;
    const options = currentPage?.options;

    return options?.[param] || '';
}

