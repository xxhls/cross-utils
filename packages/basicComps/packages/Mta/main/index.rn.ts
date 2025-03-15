import { IMta, TClickParams, TEPParams, TPVParams, STDParams } from "./IMta";
import { JDMta } from "@jdreact/jdreact-core-lib";
import { dataConvert, isType } from "@basicComps-shared/dataUtils";

class Mta implements IMta {
  constructor() {
    this.click = this.click.bind(this);
    this.ep = this.ep.bind(this);
  }

  EPMAP = {};
  /**
   * 初始化埋点库，可以传入std_param
   */
  init(std_param: { [key: string]: string }): void {
    try {
      if (std_param) {
        this.setStdParam(std_param);
      }
    } catch (e) {}
  }

  // 确保传入的对象里面的Key value都是字符串类型
  _changeObj(obj: Object): Object {
    try {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          let valueAsString = obj[key] + "";
          obj[key] = valueAsString;
        }
      }
      return obj;
    } catch (e) {
      return obj;
    }
  }
  /**
   * pageId: string 对应页面id,埋点需求中浏览标识
   * eventId: string 对应点击事件id，埋点需求中事件标识
   * jsonParam: object 对应事件参数，埋点需求中 自定义参数（ json_param）
   * ext:object 拓展参数，例如 ext = {a:'',b:'',ext:{XX}} 只有ext 中包含ext参数时，ext 才会写入表中的ext中
   */
  click(params: TClickParams): void {
    let { eventId, pageId, jsonParam = {}, ext } = params || {};
    pageId = isType.isEmpty(pageId) ? "" : pageId;
    eventId = isType.isEmpty(eventId) ? "" : eventId;
    jsonParam = isType.isEmpty(jsonParam)
      ? null
      : (dataConvert.stringify.value(jsonParam) as any);
    ext = isType.isEmpty(ext) ? {} : ext;

    JDMta.sendClickDataWithJsonParam(
      eventId, // 事件id
      "", // eventParam 事件参数
      "", // 点击事件函数名称
      "", // 点击当前页面对象
      "", // pageParam 当前页面参数
      "", // 下一个页面参数
      pageId, // page_id
      "", // shop_id
      jsonParam ? JSON.stringify(jsonParam) : null, // json_param
      "", // order_id
      "", // sku
      "", // sku_tag
      "", // webDelayTime
      ext,
    ).then(
      (response) => {
        // console.log('sendClickDataWithJsonParam ok!');
      },
      (error) => {
        // console.log(error);
      },
    );
  }

  /**
   * pageId: string 对应页面id,埋点需求中浏览标识
   * pageParam: object 对应页面的url_page_par
   * ext:object 拓展参数，例如 ext = {a:'',b:'',ext:{XX}} 只有ext 中包含ext参数时，ext 才会写入表中的ext中
   */
  pv(params: TPVParams): void {
    let { pageId, pageParam, ext } = params || {};
    pageId = isType.isEmpty(pageId) ? "" : pageId;

    pageParam = isType.isEmpty(pageParam) ? {} : pageParam;
    ext = isType.isEmpty(ext)
      ? {}
      : Object.assign(ext as any, { hasPvExtend: "true" });

    JDMta.sendPvData("", JSON.stringify(pageParam), pageId, "", "", "", ext);
  }

  /**
   * pageId: string 对应页面id,埋点需求中浏览标识
   *  eventId: string 对应点击事件id，埋点需求中事件标识
   * jsonParam:object 曝光参数
   */
  ep(params: TEPParams, isObj?: boolean): void {
    let { eventId, pageId, jsonParam, ext } = params || {};

    let jsondata = {};

    if (isObj) {
      // // console.log('_jsonParam1111', eventId,"===",jsonParam)
      jsondata = dataConvert.stringify.value(jsonParam as any);
    } else {
      jsondata = (jsonParam || [])?.map?.((item, index) => {
        return dataConvert.stringify.value(item);
      });
    }

    pageId = isType.isEmpty(pageId) ? "" : pageId;
    eventId = isType.isEmpty(eventId) ? "" : eventId;
    let _jsonParam = isType.isEmpty(jsonParam)
      ? null
      : JSON.stringify(jsondata);
    ext = isType.isEmpty(ext) ? {} : ext;

    JDMta.sendExposureDataWithJsonParam(
      "",
      pageId,
      "",
      eventId,
      "",
      "",
      "",
      "",
      "",
      "",
      _jsonParam,
      "",
      0,
      ext,
    ).then(
      (response) => {
        // console.log('response', response, params)
      },
      (error) => {
        // console.log('_ep error:', error);
      },
    );
  }

  addTag(pageId: string, source: string, sourceValue: string): void {
    let tagParams = {
      key: pageId,
      value: { source: source, sourceValue: sourceValue, scene: "firstStep" },
    };
    JDMta.addTag(tagParams).then(
      (response) => {
        // console.log('addTag response', tagParams, response)
      },
      (error) => {
        // console.log('addTag error', tagParams, error);
      },
    );
  }

  // 设置站点参数std_param,对象格式，所有的参数值，必须都是string类型
  setStdParam(params: STDParams): void {
    params = isType.isEmpty(params) ? {} : params;
    JDMta.setUserProperty(params)
      .then((response) => {})
      .catch((e) => {});
  }
}

const mta = new Mta();
export default mta;
