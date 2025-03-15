interface ClickParam {
  /**
   * 点击ID
   * eid
   */
  eventId: string;
  /**
   * 页面id
   * pageId
   */
  pageId: string;
  /**
   * 点击参数
   * 可传入点击事件相关的参数，需由业务方确定好参数规则，便于后续解析利用
   * eparam
   */
  eparam?: string;
  /**
   * 当前页面参数
   * 如果该页面为商详页，则为商品ID;如果该页面为活动页，则为活动ID;如果该页面为店
   * pparam
   */
  pparam?: string;
  /**
   * 原生对象名称
   */
  pageClassName: string;
  /**
   * 点击参数，json格式
   */
  jsonParam?: string;
  /**
   * 711产品加的扩展参数
   */
  map?: string;
  jparam?: string;
}

interface ExposureParam {
  /**
   * 曝光事件id
   * eid
   */
  eid: string;
  /**
   * 曝光参数
   * eparam
   */
  eparam?: string;
  /**
   * 页面ID
   * pageId
   */
  pageId: string;
  /**
   * 当前页面参数或接口名，不带参数
   * 页面名称:‘门店首页’
   */
  ctp: string;
  /**
   * 当前页面参数
   * pparam
   */
  pparam?: string;
  /**
   * 曝光参数，json格式
   * eparam
   */
  jsonParam?: string;
  jparam?: string;
  map: any;
}

interface SelfExposureParam extends ExposureParam {
  json_param?: string;
}

interface pvParam {
  /**
   * 页面id
   * pageId
   */
  pageId: string;
  /**
   * 页面唯一标识
   * pname
   */
  pageParam: string;
  /**
   * 当前页面参数
   * pparam
   */
  pageName: string;
  map: any;
}

interface PageParamsObj {
  storeId: string;
  venderId: string;
  pageid: string;
  type?: string;
  source?: string;
}

export { ClickParam, ExposureParam, SelfExposureParam, pvParam, PageParamsObj };
