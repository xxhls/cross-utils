
export type TClickParams = {
    eventId: string,
    pageId: string,
    jsonParam?: {
        [key: string]: any
    },
    ext?:object,
    eventLevel?:string
}

export type TPVParams = {
    pageId: string,
    pageParam?:{
        [key: string]: any
    }
    [key: string]: any,
    ext?:object
}

export type TEPParams = {
    eventId: string,
    pageId: string,
    jsonParam?: {
        [key: string]: any
    },
    ext?:object
}

export type STDParams = {
    [key: string]: string,
}


export interface IMta {
    /**
     * 点击埋点
     * @param param0 
     * @returns 
     */
    click(params: TClickParams): void

    /**
     * PV埋点
     * @param params 
     */
    pv(params: TPVParams): void

    /**
     * 曝光埋点
     * @param params 
     */
    ep(params: TEPParams): void

    /**
     * 站点参数设置
     * @param params 
     */
    setStdParam(params: STDParams): void

    /**
     * 设置染色tag
     * @param params 
     */
    addTag(pageId: string, source:string,sourceValue:string): void
    
}

// class Mta implements IMta {
//     click(params: TClickParams): void {
//         throw new Error("Method not implemented.")
//     }
//     pv(params: TPVParams): void {
//         throw new Error("Method not implemented.")
//     }
//     ep(params: TPVParams): void {
//         throw new Error("Method not implemented.")
//     }
// }
// new Mta().click({ clickId: '1', params: { abc: 1 } })