import _ from "lodash";
import Taro from "@tarojs/taro";
import System from "@basicComps-pkg/system/main";
import cookie from "@basicComps-pkg/Cookie/main";

const TYPE_UNDEFINED = "undefined";
const TYPE_NULL = "null";

/**
 * 类型判断工具对象
 */
export const isType = {
  // 基础类型判断
  isArray: (arg: unknown): arg is Array<unknown> =>
    Object.prototype.toString.call(arg) === "[object Array]",

  isObject: (arg: unknown): arg is Record<string, unknown> =>
    Object.prototype.toString.call(arg) === "[object Object]",

  isString: (arg: unknown): arg is string =>
    Object.prototype.toString.call(arg) === "[object String]",

  isNumber: (arg: unknown): arg is number =>
    Object.prototype.toString.call(arg) === "[object Number]",

  isBoolean: (arg: unknown): arg is boolean =>
    Object.prototype.toString.call(arg) === "[object Boolean]",

  isFunction: (v: unknown): v is Function =>
    Object.prototype.toString.call(v) === "[object Function]",

  // 扩展类型判断
  isUndefined: (v: unknown): v is undefined => typeof v === TYPE_UNDEFINED,
  isNull: (v: unknown): v is null => v === null,
  isDate: (v: unknown): v is Date => v instanceof Date,
  isRegex: (v: unknown): v is RegExp => v instanceof RegExp,
  isNil: (v: unknown): v is null | undefined => v == null,
  isStringNumber: (v: string): boolean => /^[0-9]+.?[0-9]*$/.test(v),

  // 验证方法
  validateString: (value: string): boolean =>
    isType.isString(value) && value.length > 0,
  validateArray: <T>(value: T[]): boolean =>
    isType.isArray(value) && value.length > 0,

  /**
   * 判断对象或数组是否为空
   */
  isEmpty(value: unknown): boolean {
    if (this.isNil(value) || (this.isString(value) && value === "")) {
      return true;
    }
    if (this.isArray(value)) {
      return (value as unknown[]).length === 0;
    }
    if (this.isObject(value)) {
      return Object.keys(value as object).length === 0;
    }
    return false;
  },
};

/**
 * 数据转换工具对象
 */
export const dataConvert = {
  /**
   * 将颜色值转换为 RGB 格式
   */
  colorToRgb(color: string): string {
    if (color.startsWith("rgb")) return color;
    const div = document.createElement("div");
    div.style.color = color;
    document.body.appendChild(div);
    const rgbColor = window.getComputedStyle(div).color;
    document.body.removeChild(div);
    return rgbColor;
  },

  /**
   * JSON字符串化处理
   */
  stringify: {
    value(obj: any): string {
      if (isType.isString(obj)) return obj;
      try {
        return JSON.stringify(obj);
      } catch (error) {
        // console.error('stringifyValue error:', error);
        return String(obj);
      }
    },

    values(obj: Record<string, any>): Record<string, string> {
      const result: Record<string, string> = {};
      for (const key in obj) {
        if (isType.isObject(obj[key])) {
          Object.assign(result, this.values(obj[key]));
        } else {
          result[key] = String(obj[key]);
        }
      }
      return result;
    },
  },

  /**
   * Base64编解码
   */
  base64: {
    encode: (str: string): string => window?.btoa(str),
    decode: (str: string): string => window?.atob(str),
  },

  /**
   * 解析可能是JSON的字符串
   */
  parseJson(str: string): any {
    try {
      const val = JSON.parse(str);
      if (typeof val === "object") return val;
      // 兼容嵌套JSON字符串
      const v = JSON.parse(val);
      if (typeof v === "object") return v;
      return str;
    } catch {
      return str;
    }
  },
};

/**
 * 分页数据处理类
 * @template T 数据项的类型
 */
export class Pagination<T> {
  constructor(
    private items: T[],
    private pageSize: number,
  ) {}

  /**
   * 获取指定页码的数据
   * @param pageNum 页码（从1开始）
   * @returns 当前页的数据数组
   */
  getPage(pageNum: number): T[] {
    const start = (pageNum - 1) * this.pageSize;
    return this.items.slice(start, start + this.pageSize);
  }

  /**
   * 获取总页数
   */
  get totalPages(): number {
    return Math.ceil(this.items.length / this.pageSize);
  }
}

/**
 * 字符串工具
 */
export const stringUtils = {
  /**
   * 全局替换字符串
   */
  replaceAll(str: string, search: string, replace: string): string {
    return str.split(search).join(replace);
  },

  /**
   * 深度比较两个值是否相等
   */
  deepEqual(x: any, y: any): boolean {
    return _.isEqual(x, y);
  },
};

/**
 * 时间相关工具
 */
export const timeUtils = {
  /**
   * 自定义超时函数
   * @param callback 回调函数
   * @param delay 延迟时间（毫秒）
   * @param args 额外参数
   */
  setTimeout<T extends Function>(
    callback: T,
    delay: number,
    ...args: Array<any>
  ): number {
    const options = args?.[0] || {};
    const newArgs = !isType.isEmpty(options?._from) ? args : [];

    return setTimeout(
      () => {
        try {
          isType.isFunction(callback) && callback();
        } catch (error) {
          // console.error('customTimeout error:', error);
        }
      },
      delay || 0,
      ...newArgs,
    );
  },

  /**
   * 清除超时
   */
  clearTimeout: clearTimeout,

  /**
   * 防抖函数（使用lodash实现）
   */
  debounce: _.debounce,

  /**
   * 设置Cookie过期时间
   * @param key Cookie的键名
   * @param daysLater 可选参数，指定过期天数。如果不传，默认当天结束时过期
   *
   * @example
   * // 当天23:59:59过期
   * timeUtils.setExpireTime('myCookie');
   *
   * // 7天后的23:59:59过期
   * timeUtils.setExpireTime('myCookie', 7);
   */
  setExpireTime(key: string, daysLater?: number): void {
    let expDate: number;
    if (daysLater) {
      // 设置指定天数后的23:59:59过期
      expDate = new Date(
        new Date().setHours(0, 0, 0, 0) + daysLater * 24 * 60 * 60 * 1000 - 1,
      ).getTime();
    } else {
      // 设置当天23:59:59过期
      expDate = new Date(
        new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1,
      ).getTime();
    }
    cookie.set(key, String(expDate));
  },
};

// 为了向后兼容，导出原来的函数名
export const setDayExp = timeUtils.setExpireTime;

/**
 * 对象工具
 */
export const objectUtils = {
  /**
   * 检查对象是否包含指定的所有属性
   *
   * @description
   * 该函数用于检查一个对象是否同时拥有所有指定的属性，并且这些属性的值不为undefined或null
   *
   * @param obj 要检查的目标对象
   * @param keys 要检查的属性名数组
   * @returns 如果所有属性都存在且有效则返回true，否则返回false
   *
   * @throws {TypeError} 如果keys数组中包含非字符串类型的元素会抛出类型错误
   *
   * @example
   * const obj = { name: 'John', age: 30 };
   * hasOwnProperties(obj, ['name', 'age'])     // 返回: true
   * hasOwnProperties(obj, ['name', 'gender'])  // 返回: false
   */
  hasOwn<T extends unknown = {}, K extends string[] = []>(
    obj: T,
    keys: K,
  ): boolean {
    // 检查目标对象是否为有效对象
    if (!isType.isObject(obj)) return false;

    // 检查keys是否为数组
    if (!isType.isArray(keys)) return false;

    // 检查keys是否为空数组
    if (!keys?.length) return false;

    // 检查keys数组中的每个元素是否都是字符串
    if (!keys.every((key) => isType.isString(key))) {
      throw new TypeError(`${keys} is not String array`);
    }

    // 遍历检查每个属性
    for (let i = 0; i < keys.length; i++) {
      // 检查属性是否存在于对象上（不包括原型链）
      const hasOwnProperty = Object.prototype.hasOwnProperty.call(obj, keys[i]);
      if (!hasOwnProperty) return false;

      // 检查属性值是否为undefined或null
      const t = typeof obj[keys[i]];
      if (t == undefined || t == null) return false;
    }

    return true;
  },

  /**
   * 深度克隆对象
   */
  deepClone<T>(obj: T): T {
    return _.cloneDeep(obj);
  },

  /**
   * 对象属性填充
   */
  polyfill: {
    /**
     * 填充对象的缺失属性
     */
    fillMissingKeys<T extends object>(obj: T, defaultObj: Partial<T>): T {
      const result = { ...obj };
      Object.keys(defaultObj).forEach((key) => {
        if (result[key] === undefined) {
          result[key] = defaultObj[key];
        }
      });
      return result;
    },

    /**
     * 移除对象的空属性
     */
    removeEmptyKeys(obj: object): object {
      return Object.fromEntries(
        Object.entries(obj).filter(
          ([_, value]) => value != null && value !== "",
        ),
      );
    },
  },
};

// 为了向后兼容，导出原来的函数
export const { hasOwn: hasOwnProperties } = objectUtils;

/**
 * 图片处理工具对象
 */
export const imageUtils = {
  webpSupport: System.isAndroid,

  /**
   * 验证图片URL
   */
  validateUrl(url: string): string {
    const imgReg = /^(http:|https:)?\/\//i;
    return url && imgReg.test(url) ? url : "";
  },

  /**
   * 图片URL格式化和优化
   */
  format: {
    /**
     * 基础URL格式化
     * @param path 图片路径（相对路径或绝对路径）
     * @param size 图片尺寸，格式为"宽x高"，默认为"200x200"
     * @param flag 是否使用随机CDN域名
     */
    url(path: string, size: string = "200x200", flag?: boolean): string {
      if (!path) return "";

      let url = path;
      if (url.substring(0, 1) === "/") {
        url = url.substring(1);
      }

      const reduce = "!q80";

      if (url.indexOf(".com/") !== -1) {
        return url + reduce;
      }

      if (flag) {
        const indexs = ["10", "11", "12", "13", "14", "20", "30"];
        const index = indexs[Math.floor(Math.random() * indexs.length)];
        return `https://img${index}.360buyimg.com/n1/s${size}_${reduce}`;
      }

      return `https://m.360buyimg.com/n1/s${size}_${url}${reduce}`;
    },

    /**
     * 高级图片URL处理
     * @param url 原始图片URL
     * @param compressionOption 压缩选项
     * @param domain 自定义域名
     */
    advanced(
      url: string,
      compressionOption?: {
        flag: boolean;
        width?: number;
        height?: number;
      },
      domain?: string,
    ): string {
      if (!url) return "";

      // Base64图片直接返回
      if (url.indexOf("data:image") === 0 && url.indexOf("base64") !== -1) {
        return url;
      }

      // 清理URL中的空白字符
      url = url.replace(/\s+/g, "");

      // 统一使用HTTPS协议
      url = url.replace(/^(https?:)?\/\//i, "https://");

      // 提取并验证图片格式
      const rUrl = url.match(
        /(\S*(jpg|jpeg|png|webp|gif|JPG|JPEG|PNG|WEBP|GIF))\s*/g,
      );
      if (!rUrl) return url;
      url = rUrl[0];

      // 处理相对路径
      if (!/^https/i.test(url)) {
        url = `https://img10.360buyimg.com/img/${url}`;
      }

      // GIF图片特殊处理
      if (/\.gif/i.test(url)) return url;

      // 验证是否为JFS图片和CDN图片
      const isJfsImg = /jfs\//.test(url);
      if (
        !isJfsImg ||
        !/(m|img\d{1,2})\.360buyimg\.com/.test(url) ||
        !/\.(jpg|jpeg|png|webp)/.test(url)
      ) {
        return url;
      }

      // 处理图片尺寸
      if (compressionOption?.width) {
        const height = compressionOption.height || compressionOption.width;
        url = url.replace(
          /(\/)(?:s\d+x\d+_)?(jfs\/)/,
          `$1s${compressionOption.width}x${height}_$2`,
        );
      }

      // WebP格式转换
      if (
        this.webpSupport &&
        /\.(jpg|jpeg|png)/.test(url) &&
        !/\.webp/.test(url)
      ) {
        url += ".webp";
      }

      // 根据网络环境设置压缩质量
      if (/\.(jpg|jpeg)/.test(url)) {
        const NETWORKTYPE = Taro?.getApp?.()?.networkType || "4g";
        const level = {
          wifi: 80,
          "4g": 60,
          "3g": 40,
          "2g": 20,
        }[NETWORKTYPE];
        if (level) {
          url = url.replace(/(\.(jpg|jpeg))(!q\d{1,2})?/, `$1!q${level}`);
        }
      }

      // CDN负载均衡
      const pool = [10, 11, 12, 13, 14, 20, 30];
      const idx =
        (parseInt(url.substr(url.lastIndexOf("/") + 1, 8), 36) || 0) %
        pool.length;
      url = url.replace(
        /(\/\/img)\d{1,2}(\.360buyimg\.com)/,
        `$1${pool[idx]}$2`,
      );

      return url;
    },
  },
};

// 为了向后兼容，导出原来的函数
export const { url: parseImgUrl } = imageUtils.format;
export const { advanced: imagesFormat } = imageUtils.format;

/**
 * 数据工具集合
 * 包含类型判断、数据转换、格式化等功能
 *
 * @example
 * // 类型判断
 * import { isType } from './dataUtils';
 * isType.isArray([1, 2, 3]);       // true
 * isType.isEmpty({});              // true
 * isType.isString('test');         // true
 *
 * // 数据转换
 * import { dataConvert } from './dataUtils';
 * dataConvert.stringify.value({ name: 'John' });  // '{"name":"John"}'
 * dataConvert.base64.encode('hello');             // 'aGVsbG8='
 *
 * // 对象工具
 * import { objectUtils } from './dataUtils';
 * objectUtils.hasOwn({ name: 'John' }, 'name');   // true
 * objectUtils.deepClone({ nested: { value: 1 } }); // 深拷贝对象
 *
 * // 图片处理
 * import { imageUtils } from './dataUtils';
 * imageUtils.format.url('example.jpg', '800x600');
 * imageUtils.format.advanced('example.jpg', { width: 800, height: 600 });
 *
 * // 时间工具
 * import { timeUtils } from './dataUtils';
 * timeUtils.setTimeout(() => console.log('delayed'), 1000);
 * timeUtils.debounce(() => console.log('debounced'), 300);
 */
