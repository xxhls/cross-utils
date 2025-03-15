import Taro from "@tarojs/taro";

export class ViewportObserver {
  constructor(targetElements, callback, relativeInfo = { bottom: 0, left: 0 }) {
    this.rootElement = rootElement;
    this.targetElements = targetElements;
    this.callback = callback;
    this.observer = Taro.createIntersectionObserver?.(
      Taro.getCurrentInstance()?.page as Taro.PageInstance,
      { observeAll: true, thresholds: [0.5] },
    );
    this.observer
      .relativeToViewport(relativeInfo)
      .observe(targetElements, callback);
  }

  // 停止观察所有元素
  disconnect() {
    this.observer.disconnect();
  }
}
