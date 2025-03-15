// 添加更完整的类型声明
declare global {
  interface Window {
    $?: {
      downloadAppLayerConfigData: (options: EvokeOptionsType) => void;
      immediateOpenApp: (options: AppOptions) => void;
    };
    downLoadAppPlugin?: boolean;
    webkit?: {
      messageHandlers?: {
        MobileNavi: {
          postMessage: (message: any) => void;
        };
      };
    };
    MobileNavi?: {
      configNavigationBar: (json: string) => void;
      configBtnSince610: (json: string) => void;
    };
    androidConfigNaviCB?: () => void;
  }
}

interface AppOptions {
  NoJumpDownLoadPage: boolean;
  downAppURl: string;
  downAppIos: string;
  downWeixin: string;
  downIpad: string;
  inteneUrl: string;
  inteneUrlParams: Record<string, any>;
}

interface EvokeOptionsType {
  tipId: string;
  downloadAppPlugIn: AppOptions;
}

interface ArgsType {
  category?: string;
  des?: string;
  url?: string;
  [key: string]: any;
}

import { loadjs } from "../utils/base/modules/load";
import { isH5, isJDApp, isLocalhost } from "./Platform";

export const openJDAPP = (args?: ArgsType, typeHandle?: "layer" | string) => {
  if (!isH5 && (isJDApp || isLocalhost)) {
    return false;
  }
  let args_v: ArgsType = {
    category: "jump",
    des: "m",
    url: window.location.href,
  };
  if (args) {
    args_v = {
      ...args_v,
      ...args,
    };
  }

  const handle = (typeHandle?: "layer" | string) => {
    const downLink =
      "https://wqs.jd.com/downloadApp/download.html?channel=jd-m-xsg-sqzt";
    const opt: AppOptions = {
      NoJumpDownLoadPage: true,
      downAppURl: downLink,
      downAppIos: downLink,
      downWeixin: downLink,
      downIpad: downLink,
      inteneUrl: "openApp.jdMobile://virtual?",
      inteneUrlParams: { ...args_v },
    };
    const EvokeOptions = {
      tipId: "m_common_tip",
      downloadAppPlugIn: opt,
    };
    if (typeHandle == "layer") {
      window.$?.downloadAppLayerConfigData(EvokeOptions);
    } else {
      window.$?.immediateOpenApp(opt);
    }
  };
  if (window.downLoadAppPlugin) {
    handle(typeHandle);
    return;
  } else {
    try {
      loadjs(
        "//wq.360buyimg.com/js/common/dest/wq.imk.downloadAppPlugin.min.js",
        { crossorigin: "anonymous" },
      ).then(() => {
        window.downLoadAppPlugin = true;
        handle(typeHandle);
      });
    } catch (error) {
      // console.error('唤起app失效');
    }
  }
};
