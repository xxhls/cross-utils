import { AsyncStorage } from 'react-native';


/**
 * 获取本地存储
 * @param params 
 */

export const getStorage = (params) => {

    /**
    * 
    * key 
    * success
    * fail
    * complete
    * 
    */

    const { key, success, fail, complete } = params;

    AsyncStorage.getItem(key, (err, result) => {
        if (err) {
            fail(err);
            complete(err);
            return;
        }
        success(getJsonObjectOrRawValue(result));
        complete(getJsonObjectOrRawValue(result));
    });
}

/**
 * 设置本地存储
 * @param params 
 */

export const setStorage = (params) => {
    const { key, data, success = () => { }, fail = () => { }, complete = () => { } } = params;
    /**
     * 
     * key 
     * data
     * success
     * fail
     * complete
     * 
     */

    const value = stringifyValue(data);

    AsyncStorage.setItem(key, value, (error) => {
        if (error) {
            fail(error);
            complete(error);
            return;
        }
        success();
        complete(error);
    });

}


/**
 * 删除本地存储
 * @param params 
 */

export const removeStorage = (params) => {

    const { key, success = () => { }, fail = () => { }, complete = () => { } } = params;

    /**
     * 
     * key 
     * success
     * fail
     * complete
     * 
     */

    AsyncStorage.removeItem(key, (err) => {

        if (err) {
            fail(err);
            complete(err);
            return;
        }
        success();
        complete();
    })
}



// 以下为RN不支持方法,但是为了和其他端保持一直，需要对外暴露方法。

export const getStorageSync = (key) => {
    throw new Error("API: getStorageSync暂不支持");
}

export const setStorageSync = (key) => {
    throw new Error("API: setStorageSync暂不支持");
}

export const removeStorageSync = (key) => {
    throw new Error("API: removeStorageSync暂不支持");
}



// 以下方法不对外暴露
function getJsonObjectOrRawValue(str) {
    try {
        const val = JSON.parse(str);
        if (typeof val === "object") {
            return val;
        }
        // 兼容下上一版本问题
        const v = JSON.parse(val);
        if (typeof v === "object") {
            return v;
        }
        return str;
    } catch (e) {
        return str;
    }
}

function stringifyValue(obj) {
    if (typeof obj === 'string') {
        return obj;
    }
    try {
        // 如果是object类型，优先序列化，避免走catch逻辑
        if (typeof obj === 'object') {
            return JSON.stringify(obj);
        }
        // 不排除传入的出了 object、string类型之外的值，使用catch兜底
        return JSON.stringify(obj);
    } catch (error) {
        console.error('stringifyValue', error);
        return obj;
    }
}


export default {
    getStorage,
    getStorageSync,
    setStorage,
    setStorageSync,
    removeStorage,
    removeStorageSync,
};
