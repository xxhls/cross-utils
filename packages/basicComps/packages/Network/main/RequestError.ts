// 主接口异常情况枚举值
export enum HomeRequestError {
  codeError = "codeError", //code非0
  loginFail = "loginFail", //登录失败
  notObject = "notObject", //返回值不是Object
  doNotReport = "doNotReport", //不上报
}

//错误码
export enum NetReqErrorCode {
  success = 0, //正常
  systemError = -1, //系统异常
  unlogin = 302, //未登录
  riskLimit = 403, //风控用户
  uploadParamError = 203, //入参失败
  flowLimit = 601, //限流，
  notLoginPin = 529, // 未登录
}

export enum ResponseCode {
  /**
   * SUCCESS
   */ // 成功
  REQUEST_SUCCESS = "0",
  /**
   * SYSTEM_ERROR
   */ // 系统异常
  SYSTEMERROR = "-1",

  /**
   * INVALID_PARAM
   */ // 入参失败
  INVALIDPARAM = "A-0-0-0-001",
  /**
   * UNLOGIN
   */ // 以下为业务类异常
  // 未登录
  UNLOGIN = "A-0-0-0-003",
  /**
   * INVALID_USER
   */ // 用户无效，比如，UUID与用户PIN同时为空
  INVALID_USER = "A-0-0-0-004",
  /**
   * 用户无效，不在白名单中
   */
  NOT_IN_WHITE_LIST = "A-0-0-0-005",
  /**
   * SCF_NOT_DELIVERY
   */ //SCF不支持配送
  SCF_NOT_DELIVERY = "A-0-0-0-120",
  /**
   * SERVICE_DOWNGRADE 服务降级
   */
  SERVICE_DOWNGRADE = "A-0-0-0-400",
  /**
   * 限流
   */
  LIMITED_SERVICE_DOWNGRADE = "A-0-0-0-403",

  TIME_OUT = "A-0-0-0-0",
}
