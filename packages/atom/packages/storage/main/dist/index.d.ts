import { Qin } from '@types-def/atom-interface';

interface GetOrRemoveOptionStruct extends Qin.COptions {
    key: string;
    success?: (res: any) => any;
    fail?: (res: any) => any;
    complete?: (res: any) => any;
}
interface GetStorageSyncRes {
    data: any;
}
type GetStorageRes = Promise<GetStorageSyncRes> | any;
interface SetOptionStruct extends Qin.COptions {
    key: string;
    data: undefined | null | string | Record<string, any> | any[] | number | Date | boolean;
    success?: (res: any) => any;
    fail?: (res: any) => any;
    complete?: (res: any) => any;
}

declare const getStorage: (args: GetOrRemoveOptionStruct) => GetStorageRes;
declare const getStorageSync: (args: string) => GetStorageSyncRes;
declare const setStorage: (args: SetOptionStruct) => void | Promise<any>;
declare const setStorageSync: (key: string, data: any) => any;
declare const removeStorage: (args: GetOrRemoveOptionStruct) => void | Promise<any>;
declare const removeStorageSync: (args: string) => any;
declare const _default: {
    getStorage: (args: GetOrRemoveOptionStruct) => GetStorageRes;
    getStorageSync: (args: string) => GetStorageSyncRes;
    setStorage: (args: SetOptionStruct) => void | Promise<any>;
    setStorageSync: (key: string, data: any) => any;
    removeStorage: (args: GetOrRemoveOptionStruct) => void | Promise<any>;
    removeStorageSync: (args: string) => any;
};

export { _default as default, getStorage, getStorageSync, removeStorage, removeStorageSync, setStorage, setStorageSync };
