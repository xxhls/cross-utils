export type TUserInfo = {
  pin: string;
  username: string;
  [key: string]: any;
};

export interface ILogin {
  /**
   * 判断京东用户是否登陆
   * @returns
   */
  isLogin(): Promise<any>;

  /**
   * 发起客户端京东用户登录，如果已经登陆，直接返回成功。
   * @returns
   */
  doLogin(): Promise<any>;

  /**
   * 获取登陆用户信息
   * @returns 返回 Promise(resolve,reject)对象,返回数据为map类型，例如{pin:'xxx'},{username:'xxx'},{nickname:'xxx'}
   */
  // getUserInfo(): Promise<TUserInfo>
}
