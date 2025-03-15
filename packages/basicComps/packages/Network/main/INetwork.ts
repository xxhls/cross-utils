
export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | undefined;

export type TFetchParams = {
    functionId: string,
    method?: HTTPMethod | string,
    body?: {
        [key: string]: any
    } | null,
    timeout?: number | string,
    lat?:any,
    lng?:any,
    cityId?:any
    client?: string | number,
    clientVersion?: string | number,
    appVersion?: string | number,
    uuid?: string | number,
    osVersion?: string | number,
    model?: string | number,
    eid?: string | number,
    hybirdDevRequestId?:string,
    hybirdRequestId?:string,
    hybridDevIdNum?: string ,
    hybridIdNum?:string 
}

export interface INetwork {
    fetch(params: TFetchParams): Promise<any>
}