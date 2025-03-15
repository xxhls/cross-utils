import { Uni } from '@atom-shared/interface';

/**
 *  Common
 */
type DATA_TYPE = 'json' | 'text';
interface AsObject {
    [key: string]: string | number;
}
interface RequestOptions extends Uni.COptions {
    url: string;
    headers?: AsObject;
    validateStatus?: (status: string | number) => boolean;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'JSONP';
    data?: AsObject;
    timeout?: number;
    dataType?: DATA_TYPE;
    jsonpCallback?: string;
    jsonpCallbackProp?: string;
    success?: (res: any) => any;
    fail?: (res: any) => any;
    complete?: (res: any) => any;
}

declare const _default: (options: RequestOptions) => any;

export { _default as default };
