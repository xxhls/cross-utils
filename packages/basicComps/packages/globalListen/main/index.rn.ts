import { AppState, NativeAppEventEmitter, Platform } from "react-native";
import PubSub from "pubsub-js";

export const GLOBAL_APPSTATE_EVENT = "GLOBAL_APPSTATE_EVENT";

// 订阅AppState状态
export function subscribeAppState(callback) {
  const token = PubSub.subscribe(GLOBAL_APPSTATE_EVENT, callback);

  return () => PubSub.unsubscribe(token);
}

function handleAppStateChange(nextAppState, _initProps) {
  if (typeof nextAppState !== "string") {
    nextAppState = "";
  }
  // console.log('nextAppState', nextAppState)

  // 验证环境iOS:从前台切后台，会执行两次回调nextAppState的值依次是 inactive 、 background
  if (nextAppState.match(/inactive/)) {
    PubSub.publish(GLOBAL_APPSTATE_EVENT, { toBackground: true });
    return;
  }
  // 验证环境iOS: 从后台切前台，会执行回调，nextAppState的值是 active
  // 安卓不能判断是否是关闭其他上层页面（如打开小程序关闭）统一都是active
  if (nextAppState.match(/active/)) {
    PubSub.publish(GLOBAL_APPSTATE_EVENT, { toForground: true });
  }
}

let _handleAppStateChange;

let __subscription__, __subscription__1;
export function registerGlobalAppState(initProps) {
  // 当跳转到【外部】页面后返回到当前页面时，如果需要做处理，ios端可以监听JDReactNativeRefresh通知，安卓端可以使用AppState
  if (!_handleAppStateChange) {
    _handleAppStateChange = (state) => {
      handleAppStateChange(state, initProps);
    };
  }
  __subscription__1 = AppState.addEventListener(
    "change",
    _handleAppStateChange,
  );

  if (Platform.OS === "ios") {
    __subscription__ = NativeAppEventEmitter.addListener(
      "JDReactNativeRefresh",
      (NativeEvent) => {
        // 因为ios的通知是广播的，所以需要再次判断当前监听到的通知是不是自己的，即判断是不是真是自己重新变得可见了
        // console.log('global', initProps);
        // var rootuuid = global.initprops.rootViewTag;    // rn入口参数中都会有一个rootViewTag字段，作为每个rn业务的唯一标识。

        // console.log('NativeEvent.appName, rootuuid', NativeEvent)
        if (NativeEvent?.rootUUID == initProps.rootViewTag) {
          // 当前页面恢复可见状态。后台切换到前台不会走这里。（如果ios还要处理后台切换到前台，使用AppState组件）
          // console.log("App has come to the foreground!");
          PubSub.publish(GLOBAL_APPSTATE_EVENT, { backFromPage: true });
        }
      },
    );
  }
}

export function unRegister() {
  try {
    if (Platform.OS == "ios") {
      __subscription__?.remove?.();
    }
    __subscription__1?.remove?.();
    // else {
    //     AppState.removeEventListener?.('change', _handleAppStateChange);
    // }
  } catch (error) {
    // console.log(error);
  }
}
