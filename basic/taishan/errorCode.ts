/** @format */

//错误级别
export enum ErrortType {
  Error = 1,
  Warn = 2,
  Info = 3,
}

// 地址信息 1;
export enum AddressInfoError {
  GET_ADDRESS_FAILED = "10001", //调用地址router组件缺失经纬度 已接
  GET_ADDRESS_TIMEOUT = "10002", //调用地址组件超时5s进行拦截 已接
  GET_ADDRESS_CHANGE = "10003", //地址发生变化 已接
  GET_ADDRESS_CATCH = "10004", //地址由于业务逻辑导致不能正常获取 已接
  GET_ADDRESS_F = "10005", //地址router调取失败 已接
  GET_ADDRESS_USETIME = "10006", //地址router真实获取到的时间 已接
  GET_ADDRESS_SUCCESS = "10007", //地址router获取成功 已接
}

// 接口请求 2;
export enum RequestError {
  REQUEST_PARAMETERS_MISSING = "20001", //请求参数缺失
  REQUEST_PRE_VALIDATION_FAILED = "20002", //请求前置校验失败
  REQUEST_SIGN_FAILED = "20003", //sign加密失败 已接
  GET_EID_FAILED = "20004", //获取Eid失败 已接
  GET_EID_TIMEOUT = "20005", //获取Eid失败 已接
  REQEUST_UUID_MISSING = "20006", //获取uuid失败
}

// 请求响应 3;
export enum ResponseError {
  CODE_NOT_0 = "30001", //code非0
  DATA_INVALID = "30002", //code 为0 数据不合法
  STATUSCODE_NOT_200 = "30003", //httpcode 返回值非200
  NETWORK_ERROR = "30004", //网络异常 超时 断网
  LOGIN_FAIL = "30005", //登录失败
  BODY_CODE_ERROR = "30006", //所有业务返回的errorCode有值且 不是-1的情况
  BODY_CART_ERROR = "30007", //小车业务返回了tipTypeCode
}

// 页面异常 4;
export enum PageException {
  // ERRORCODE = '40001', // body里下发error
  COMPONENT_DIDCATCH = "40002", //  jsx组件报错
  SKU_ERROR = "40004", // 商卡错误
  JS_ERROR = "40005", //全局js报错
  COMMODY_BAI = "40006", // 货架白屏
  SKU_BAI = "40007", // 商卡白屏
  ADD_CART_BAI = "40008", //加车按钮白屏
  MEMORY_OVER = "40009", //内存溢出
  JS_UNDEIFNED_ERROR = "40010", //全局undefined报错
  JS_CHARACTER = "40011", //chractor报错
  HASOBSERVE = "110001", //observe 排查
}

//三方依赖 5; 暂无
export enum ThirdPartyError {
  SDK_INITIALIZATION_FAILED = "50001", //sdk初始化失败 暂无
  METHOD_CALL_TIMEOUT = "50002", //方法调用超时 暂无
  METHOD_CALL_UNEXPECTED_VALUE = "50003", //方法调用返回非预期值 暂无
}

// 数据解析操作 6;
export enum DataParsingError {
  JSON_PARSE_EXCEPTION = "60001",
}

//生命周期 7;
// 页面初始化
// 页面退出
// 切到后台
// 切到前台
// 页面被系统回收
export enum LifeCycle {
  PAGE_ONLOAD = "70001", //已埋
  PAGE_UNLOAD = "70002", //暂无
  PAGE_ONHIDE = "70003", //暂无
  PAGE_ONSHOW = "70004", //已埋
  PAGE_RECYCLE = "70005", //暂无
  PAGE_EXCEPTION = "70006", //已埋
}

// 埋点异常 8;
export enum BuriedPointException {
  ASSERT_FAILED = "80001", // 与预期方案不符
  BURIED_FAILED = "80002", // 上报异常
}

// 资源加载异常 9;
export enum ResourceError {
  RESOURCE_DOWNLOAD_FAILED = "90001", //静态资源下载异常 暂无
  IMAGE_DOWNLOAD_FAILED = "90002", //静态资源下载失败 已埋
  VIDEO_DOWNLOAD_FAILED = "90003", //图片下载失败 暂无
}

// 页面是否可以交互 10;
export enum InteractionError {
  SCROLL = "100001", //滚动 用不到
  ADD_CART_ERROR = "100002", //加车
  SETTLEMENT_ERROR = "100003", //去结算
  SUBMIT_ORDER_ERROR = "100004", //提单 用不到
  PAGE_TURN = "100005", //翻页 暂无
  ADDRESS_SELECT_SWITCH = "100006", //切换位置
  XVIEW_ERROR = "100007", //xview报错
  JUMP_ERROR = "100008", //跳转类  router openapp webview
  QUERY_CART_ERROR = "100009", //查询购物车  router openapp webview
  WARE_ADD_CART_ERROR = "100010", //多规格加车失败
}

// 页面是否可以交互 10;
export enum InteractionInfo {
  ADD_CART_INFO = "120001", //多规格弹窗加车触发失败
}

export enum CatchError {
  TRY_CATHCH = "110002", // try catch 捕获异常
}
