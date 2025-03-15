export type IGotoParams = {
    to: string,
    args?: {
        [key: string]: any
    },
    props?: {
        [key: string]: any
    },
    listen?: (val: any) => void
}

export interface INavigator {
    /**
     * 跳转
     */
    goto(params: IGotoParams): void

    /**
     * 返回
     */
    goback(len?: number, newProps?: any): void

    /**
     * 退出
     */
    exit(): void;

    sendMsgToPrev(props: any, msg?: any): void;
}