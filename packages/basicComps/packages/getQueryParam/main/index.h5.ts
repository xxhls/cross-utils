
// H5获取链接参数
export const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
 

export function updateQueryParam(param, newValue) {
    // 获取当前URL
    let url = new URL(window.location.href);
 
    // 修改指定的查询参数
    url.searchParams.set(param, newValue);
 
    // 使用pushState更新浏览器历史记录，不会导致页面刷新
    window.history.pushState({ path: url.href }, '', url.href);
 
}


export const appendQeury = (queryOption={}, url?)=>{
    const originUrl = url || window.location.href;
    let queryArr = [];
    if(queryOption){
        for(let value in queryOption){ // {skuid:skuId, storeid: storeId}=>[ skuid=skuid,storeId=storeId]
            const temp = value + "="+ queryOption[value];
            queryArr.push(temp)
        }
        queryArr.join("&")  
    }
    let split = "?";
    const splitArr = originUrl.split("?") || [];
    // 存在？search,
    // 原来链接上是否有？
    const has = originUrl.indexOf("?") != -1;
    if(has || !!splitArr[1]){
        split = "&"
    }
    return originUrl + split + queryArr.join("&")
}
/**
 * 检查 URL 中是否包含指定的参数
 *
 * @param {string} url - 需要检查的 URL
 * @param {string} paramName - 参数的名称
 * @return {boolean} - 如果包含返回 true，否则返回 false
 */
export const hasUrlParameter = (url, paramName) => {
    // 使用正则表达式检查 URL 中是否包含该参数
    let regex = new RegExp('[?&]' + encodeURIComponent(paramName) + '(=|&|$)');
    return regex.test(url);
}

/**
 * 给 URL 增加一个参数
 *
 * @param {string} url - 需要增加参数的 URL
 * @param {string} paramName - 参数的名称
 * @param {string} paramValue - 参数的值
 * @return {string} - 带有新参数的 URL
 */
export const addUrlParameter = (url, paramName, paramValue) => {
    if (hasUrlParameter(url, paramName)) {
        // 如果参数已经存在，直接返回原始URL
        return url;
    }
    if (url.indexOf('?') === -1) {
        return url + '?' + encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    } else {
        return url + '&' + encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }
}