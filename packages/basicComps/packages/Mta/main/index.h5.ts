
import { loadjs } from '../../utils/base/modules/load';
import { dataConvert, isType } from '../../utils/dataUtils';

import { IMta, TClickParams, TEPParams, TPVParams, STDParams } from './IMta'

declare var MPing: any;
declare global {
    interface Window {
        jap: any;
    }
}
class Mta implements IMta {
    initSuccess: boolean;
    std_param: string;

    /**
     * 初始化埋点库，可以传入std_param
     */
    init(std_param?: { [key: string]: string }): void {
        try {
            loadjs('https://wl.jd.com/unify.min.js').then(() => {
                this.initSuccess = true;
                if (std_param) {
                    this.std_param = JSON.stringify(std_param);
                }
                window.jap = {
                    siteId: 'MO-J2011-1', //站点编号，必传字段，没有请从EasyAnalytics申请
                };
            })
        } catch (e) {

        }
    }
    /**
     * pageId: string 对应页面id,埋点需求中浏览标识 
     * eventId: string 对应点击事件id，埋点需求中事件标识
     * jsonParam: object 对应事件参数，埋点需求中 自定义参数（ json_param）
     * ext:object 拓展参数，例如 ext = {a:'',b:'',ext:{XX}} 只有ext 中包含ext参数时，ext 才会写入表中的ext中
     * eventLevel：事件level
     */
    click(params: TClickParams): void {
        try {
            if (this.initSuccess) {
                let { eventId, pageId, jsonParam, ext, eventLevel } = params || {}
                pageId = isType.isEmpty(pageId) ? '' : pageId;
                eventId = isType.isEmpty(eventId) ? '' : eventId;

                jsonParam = isType.isEmpty(jsonParam) ? null : dataConvert.stringify.value(jsonParam as any) as any;

                ext = isType.isEmpty(ext) ? {} : ext;

                var click = new MPing.inputs.Click(eventId);
                click.page_id = pageId;
                click.json_param = JSON.stringify(jsonParam);
                click.event_level = eventLevel;
                click.std_param = this.std_param;
                click = Object.assign(click, ext);
                (new MPing()).send(click);
            }
        } catch (e) {

        }
    }

    /**
     * pageId: string 对应页面id,埋点需求中浏览标识
     * pageParam: object 对应页面的url_page_par
     * ext:object 拓展参数，例如 ext = {a:'',b:'',ext:{XX}} 只有ext 中包含ext参数时，ext 才会写入表中的ext中
     */
    pv(params: TPVParams): void {
        try {
            if (this.initSuccess) {
                let { pageId, pageParam, ext } = params || {};
                pageId = isType.isEmpty(pageId) ? '' : pageId;
                pageParam = isType.isEmpty(pageParam) ? null : dataConvert.stringify.value(pageParam as any) as any;
                ext = isType.isEmpty(ext) ? {} : ext;

                var pv = new MPing.inputs.PV();
                pv.page_id = pageId;
                pv.page_param = JSON.stringify(pageParam);
                pv.std_param = this.std_param;
                pv = Object.assign(pv, ext);
                var mping = new MPing();        // 构造上报实例
                mping.send(pv);                  // 上报pv
            }

        } catch (e) {
            // console.log('error', e)
        }
    }

    /**
     * pageId: string 对应页面id,埋点需求中浏览标识
     *  eventId: string 对应点击事件id，埋点需求中事件标识
     * jsonParam:object 曝光参数
     */
    ep(params: TEPParams, isObj?: boolean): void {
        try {
            if (this.initSuccess) {
                let { eventId, pageId, jsonParam, ext } = params || {};
                let jsondata = {}
                if (isObj) {
                    // console.log('_jsonParam1111', eventId,"===",jsonParam)
                    jsondata = dataConvert.stringify.value(jsonParam as any)
                } else {
                    jsondata = (jsonParam || [])?.map?.((item, index) => {
                        return dataConvert.stringify.value(item)
                    })
                }

                pageId = isType.isEmpty(pageId) ? '' : pageId;
                eventId = isType.isEmpty(eventId) ? '' : eventId;

                let _jsonParam = isType.isEmpty(jsonParam) ? null : JSON.stringify(jsondata);
                // jsonParam = isEmpty(jsonParam) ? {} : jsondata;
                ext = isType.isEmpty(ext) ? {} : ext;

                // var exposure = new MPing.inputs.Exposure(eventId);        // 构造点击上报对象
                var exposure = new MPing.inputs.Click(eventId);   //h5曝光埋点走点击，不走曝光。


                exposure.page_id = pageId;
                exposure.json_param = _jsonParam;
                exposure.std_param = this.std_param;
                exposure = Object.assign(exposure, ext);
                (new MPing()).send(exposure);                           // 构造上报实例，上报点击事件
            }
        } catch (e) {

        }


    }

    // 设置站点参数std_param,对象格式，所有的参数值，必须都是string类型
    setStdParam(params: STDParams): void {
        params = isType.isEmpty(params) ? {} : params;
        this.std_param = JSON.stringify(params);
    }

    addTag() { }

}

const mta = new Mta();
export default mta;