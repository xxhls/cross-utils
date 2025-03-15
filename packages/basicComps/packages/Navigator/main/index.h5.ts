

import { isJDApp } from "../Platform";
import { Navigator as TaroNavigator } from "./index.taro";


class Navigator extends TaroNavigator {
    exit(): void {
        const win = window as any;
        win.AlipayJSBridge && win.AlipayJSBridge.call('exitWebview');
        win.WeixinJSBridge && win.WeixinJSBridge.invoke('closeWindow');
        if(isJDApp) {
            window.location.href = 'closeJDApp://webview?refresh=false';
        }
    }
}

const navigator = new Navigator();

export default navigator;