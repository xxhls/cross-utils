import { IGotoParams, INavigator } from "./INavigator";
// import isEmpty from 'lodash/isEmpty'
import { isType } from "@/utils/base";
import { JDJumping } from "@jdreact/jdreact-core-lib";
import JDDevice from "@jdreact/jdreact-core-lib/Libraries/JDDevice";
import routers from "@/router";
import throttle from "lodash/throttle";
import mta from "../Mta/report";

class Navigator implements INavigator {
  router: any;

  constructor() {
    this.goto = throttle(this.goto, 1000);
  }
  sendMsgToPrev(_props: any, _msg?: any): void {
    // throw new Error('Method not implemented.');
  }

  exit() {
    if (JDDevice && typeof JDDevice.exitApp === "function") {
      JDDevice.exitApp();
    }
  }

  setRouter(routerEl) {
    if (!routerEl) {
      return;
    }
    this.router = routerEl.router;
  }

  getCurrentRoutes() {
    return this.router?.getCurrentRoutes?.() || [];
  }

  /**
   * 跳转
   * @param jumpUrl 目标地址可以是http,https,openapp
   */
  goto(params: IGotoParams): void {
    //上报pv埋点
    const pageInfo = routers.find((item) => item.key == params.to);

    if (pageInfo) {
      mta.pv({
        pageId: pageInfo?.pageId,
        pageParam: params?.args,
        ext: { ext: JSON.stringify({ businessTag: "cityCountry" }) },
      });
    }

    if (isType.isEmpty(params)) {
      return;
    }
    if (params.args?.url?.startsWith("http")) {
      // toast.show('正在跳转中~', { duration: 1000 });
      return this.toWeb(params.args?.url);
    }
    if (params.args?.url?.startsWith("openapp")) {
      // toast.show('正在跳转中~', { duration: 1000 });
      return this.toOpenapp(params.args?.url);
    }
    this.router.push({
      routeName: params.to,
      props: {
        args: params.args,
      },
    });
  }

  goback(len?: number, newProps?: any) {
    const currentRoutes = this.getCurrentRoutes();
    const backItem = currentRoutes[0];
    const pageInfo = routers.filter((item) => item.key == backItem.routeName);
    if (pageInfo && pageInfo?.[0]?.pageId) {
      mta.pv({
        pageId: pageInfo[0].pageId,
        pageParam: newProps?.args,
        ext: { ext: JSON.stringify({ businessTag: "cityCountry" }) },
      });
    }
    if (typeof len === "number") {
      const popToItem = currentRoutes[currentRoutes.length - 1 + len];
      if (typeof newProps === "object") {
        return this.router?.popToWithProps?.(popToItem?.routeName, newProps);
      }
      return this.popTo(popToItem?.routeName);
    }
    this.router.goBack();
  }

  /**
   * 目标地址可以是http,https
   */
  private toWeb(to: string) {
    JDJumping.jumpToWeb(to);
  }

  /**
   * 目标地址可以是openapp
   */
  private toOpenapp(to: string) {
    JDJumping.jumpToOpenapp(to);
  }

  popTo(routeName: string): void {
    this.router?.popTo(routeName);
  }
}

const navigator = new Navigator();

export default navigator;
