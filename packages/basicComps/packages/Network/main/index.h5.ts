import { getDeviceInfo, isJDApp } from "@jmfe/jd-jssdk";
import ParamsSign from "@legos/js-security-v3/dist";
import axios from "axios";
import qs from "qs";

// 定义接口类型
interface ApiParams {
  functionId: string;
  body: any;
  method?: string;
  signBusinessId?: string;
  appid?: string;
}

interface DeviceInfo {
  systemVersion: string;
  appVersion: string;
  systemName: string;
  model: string;
  brand: string;
  appBuild?: string;
  uuid?: string;
  un_area?: string;
}

// 获取签名参数
const getSignedParams = (appId: string) => {
  try {
    const paramsSignInst = new ParamsSign({
      appId: appId,
    });

    return function (bParams: any) {
      const staticResult = {
        h5st: null,
        originParam: bParams,
        signedParams: {},
      };

      const requiredParamList = [
        "functionId",
        "appid",
        "client",
        "body",
        "clientVersion",
        "sign",
        "t",
        "jsonp",
      ];
      const paramsSign = requiredParamList.reduce(
        (acc, curr) => {
          let value = bParams[curr];

          if (curr === "body") {
            value = CryptoJS.SHA256(value).toString();
          }
          acc[curr] = value;

          return acc;
        },
        {} as Record<string, any>,
      );

      return paramsSignInst
        .sign(paramsSign)
        .then((signedParams) => {
          return {
            h5st: signedParams.h5st ? encodeURI(signedParams.h5st) : null,
            originParam: bParams,
            signedParams,
          };
        })
        .catch(() => {
          return staticResult;
        });
    };
  } catch (err) {
    return function (bParams: any) {
      return Promise.resolve({
        h5st: null,
        originParam: bParams,
        signedParams: {},
      });
    };
  }
};

// 创建签名
const createSign = (businessId: string, colorParams: any) => {
  // 获取签名函数
  const signFunction = getSignedParams(businessId);

  // 构建参数
  const params = {
    t: Date.now(),
    functionId: colorParams?.functionId,
    appid: colorParams?.appId,
    body: JSON.stringify(colorParams?.body),
    client: colorParams?.client || "m",
    clientVersion: colorParams?.clientVersion || "1.0.0",
  };

  // 调用签名函数并返回Promise
  return signFunction(params)
    .then((data) => {
      const p = Object.assign({}, colorParams, params, { h5st: data["h5st"] });
      return p;
    })
    .catch((e) => {
      // console.error('Sign creation failed:', e)
      return null;
    });
};

// 获取设备信息
const getDeviceInformation = (): Promise<DeviceInfo> => {
  const defaultDeviceInfo: DeviceInfo = {
    systemVersion: "",
    appVersion: "",
    systemName: "",
    model: "",
    brand: "",
  };

  if (!isJDApp()) {
    return Promise.resolve(defaultDeviceInfo);
  }

  return getDeviceInfo()
    .then((deviceInfoRe) => {
      if (deviceInfoRe.status === "0") {
        return { ...defaultDeviceInfo, ...deviceInfoRe.data };
      }
      return defaultDeviceInfo;
    })
    .catch((error) => {
      // console.log('Failed to get device info:', error)
      return defaultDeviceInfo;
    });
};

// 获取API域名
const getApiDomain = (hostname: string): string => {
  const colorMap: Record<string, string> = {
    "daojia.jd.com": "api.m.jd.com",
    "www.jddj.com": "api.m.jd.com",
    "prepdjm.jd.com": "beta-api.m.jd.com",
    "testpdjm.jd.com": "beta-api2.m.jd.com",
    "testpdj-three.jd.com": "beta-api3.m.jd.com",
    "imdada-ndev.jd.com": "beta-api2.m.jd.com",
    "imdada.jd.com": "api.m.jd.com",
    "qa-daojia.jd.com": "test-api.m.jd.com",
    "qa1-daojia.jd.com": "testa-api.m.jd.com",
    "qa2-daojia.jd.com": "testb-api.m.jd.com",
    "hour.jd.com": "api.m.jd.com",
    "hour-prepdjm.jd.com": "beta-api.m.jd.com",
    "hour-dev.jd.com": "beta-api2.m.jd.com",
    "jgc.jd.com": "api.m.jd.com",
    "jgc-pre.jd.com": "beta-api.m.jd.com",
    "jgc-dev.jd.com": "api.m.jd.com",
  };

  return colorMap[hostname] || "api.m.jd.com";
};

// 主API函数
const api = ({
  functionId,
  body,
  method = "GET",
  signBusinessId,
  appid = "dj_xsg_activity",
}: ApiParams) => {
  // 配置axios
  axios.interceptors.request.use((config) => {
    config.headers["X-Requested-With"] = "XMLHttpRequest";
    return config;
  });
  axios.defaults.withCredentials = true;

  const requestUrl = getApiDomain(location.hostname);

  return new Promise((resolve, reject) => {
    // 无论设备信息获取成功与否，都会继续请求接口
    getDeviceInformation()
      .then((deviceInfo) => {
        return processApiRequest(deviceInfo);
      })
      .catch((error) => {
        // 即使获取设备信息失败，也使用默认设备信息继续请求
        // console.error('Failed to get device info, using default:', error)
        const defaultDeviceInfo: DeviceInfo = {
          systemVersion: "",
          appVersion: "",
          systemName: "",
          model: "",
          brand: "",
        };
        return processApiRequest(defaultDeviceInfo);
      });

    // 处理API请求的函数
    function processApiRequest(deviceInfo: DeviceInfo) {
      const commonP = {
        clientVersion: deviceInfo.appVersion,
        client: deviceInfo.systemName,
        d_model: deviceInfo.model,
        d_brand: deviceInfo.brand,
        osVersion: deviceInfo.systemVersion,
        build: deviceInfo.appBuild || "",
        "x-api-eid-token": localStorage.getItem("x-api-eid-token") || "",
        uuid: deviceInfo.uuid,
        area: deviceInfo.un_area || "",
        lng: body?.lng,
        lat: body?.lat,
        appId: appid,
      };

      // 处理签名
      const processRequest = (params: any) => {
        const postData = {
          body: JSON.stringify(body),
          ...params,
        };

        const isGet = method === "GET";

        return axios({
          method,
          url: `https://${requestUrl}/client.action?functionId=${functionId}&appid=${appid}`,
          params: isGet ? { ...params, body } : {},
          data: !isGet ? qs.stringify(postData) : {},
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          timeout: 16 * 1000,
          withCredentials: true,
        })
          .then((res) => resolve(res))
          .catch((error) => reject(error));
      };

      // 如果需要签名
      if (signBusinessId) {
        createSign(signBusinessId, { ...commonP, functionId, body })
          .then((signedParams) => {
            if (signedParams) {
              processRequest(signedParams);
            } else {
              processRequest(commonP);
            }
          })
          .catch(() => {
            processRequest(commonP);
          });
      } else {
        processRequest(commonP);
      }
    }
  });
};

/* eslint-disable */
// CryptoJS 代码保持不变
var CryptoJS =
  CryptoJS ||
  (function (h, s) {
    var f = {},
      t = (f.lib = {}),
      g = function () {},
      j = (t.Base = {
        extend: function (a) {
          g.prototype = this;
          var c = new g();
          a && c.mixIn(a);
          c.hasOwnProperty("init") ||
            (c.init = function () {
              c.$super.init.apply(this, arguments);
            });
          c.init.prototype = c;
          c.$super = this;
          return c;
        },
        create: function () {
          var a = this.extend();
          a.init.apply(a, arguments);
          return a;
        },
        init: function () {},
        mixIn: function (a) {
          for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]);
          a.hasOwnProperty("toString") && (this.toString = a.toString);
        },
        clone: function () {
          return this.init.prototype.extend(this);
        },
      }),
      q = (t.WordArray = j.extend({
        init: function (a, c) {
          a = this.words = a || [];
          this.sigBytes = c != s ? c : 4 * a.length;
        },
        toString: function (a) {
          return (a || u).stringify(this);
        },
        concat: function (a) {
          var c = this.words,
            d = a.words,
            b = this.sigBytes;
          a = a.sigBytes;
          this.clamp();
          if (b % 4)
            for (var e = 0; e < a; e++)
              c[(b + e) >>> 2] |=
                ((d[e >>> 2] >>> (24 - 8 * (e % 4))) & 255) <<
                (24 - 8 * ((b + e) % 4));
          else if (65535 < d.length)
            for (e = 0; e < a; e += 4) c[(b + e) >>> 2] = d[e >>> 2];
          else c.push.apply(c, d);
          this.sigBytes += a;
          return this;
        },
        clamp: function () {
          var a = this.words,
            c = this.sigBytes;
          a[c >>> 2] &= 4294967295 << (32 - 8 * (c % 4));
          a.length = h.ceil(c / 4);
        },
        clone: function () {
          var a = j.clone.call(this);
          a.words = this.words.slice(0);
          return a;
        },
        random: function (a) {
          for (var c = [], d = 0; d < a; d += 4)
            c.push((4294967296 * h.random()) | 0);
          return new q.init(c, a);
        },
      })),
      v = (f.enc = {}),
      u = (v.Hex = {
        stringify: function (a) {
          var c = a.words;
          a = a.sigBytes;
          for (var d = [], b = 0; b < a; b++) {
            var e = (c[b >>> 2] >>> (24 - 8 * (b % 4))) & 255;
            d.push((e >>> 4).toString(16));
            d.push((e & 15).toString(16));
          }
          return d.join("");
        },
        parse: function (a) {
          for (var c = a.length, d = [], b = 0; b < c; b += 2)
            d[b >>> 3] |= parseInt(a.substr(b, 2), 16) << (24 - 4 * (b % 8));
          return new q.init(d, c / 2);
        },
      }),
      k = (v.Latin1 = {
        stringify: function (a) {
          var c = a.words;
          a = a.sigBytes;
          for (var d = [], b = 0; b < a; b++)
            d.push(
              String.fromCharCode((c[b >>> 2] >>> (24 - 8 * (b % 4))) & 255),
            );
          return d.join("");
        },
        parse: function (a) {
          for (var c = a.length, d = [], b = 0; b < c; b++)
            d[b >>> 2] |= (a.charCodeAt(b) & 255) << (24 - 8 * (b % 4));
          return new q.init(d, c);
        },
      }),
      l = (v.Utf8 = {
        stringify: function (a) {
          try {
            return decodeURIComponent(escape(k.stringify(a)));
          } catch (c) {
            throw Error("Malformed UTF-8 data");
          }
        },
        parse: function (a) {
          return k.parse(unescape(encodeURIComponent(a)));
        },
      }),
      x = (t.BufferedBlockAlgorithm = j.extend({
        reset: function () {
          this._data = new q.init();
          this._nDataBytes = 0;
        },
        _append: function (a) {
          "string" == typeof a && (a = l.parse(a));
          this._data.concat(a);
          this._nDataBytes += a.sigBytes;
        },
        _process: function (a) {
          var c = this._data,
            d = c.words,
            b = c.sigBytes,
            e = this.blockSize,
            f = b / (4 * e),
            f = a ? h.ceil(f) : h.max((f | 0) - this._minBufferSize, 0);
          a = f * e;
          b = h.min(4 * a, b);
          if (a) {
            for (var m = 0; m < a; m += e) this._doProcessBlock(d, m);
            m = d.splice(0, a);
            c.sigBytes -= b;
          }
          return new q.init(m, b);
        },
        clone: function () {
          var a = j.clone.call(this);
          a._data = this._data.clone();
          return a;
        },
        _minBufferSize: 0,
      }));
    t.Hasher = x.extend({
      cfg: j.extend(),
      init: function (a) {
        this.cfg = this.cfg.extend(a);
        this.reset();
      },
      reset: function () {
        x.reset.call(this);
        this._doReset();
      },
      update: function (a) {
        this._append(a);
        this._process();
        return this;
      },
      finalize: function (a) {
        a && this._append(a);
        return this._doFinalize();
      },
      blockSize: 16,
      _createHelper: function (a) {
        return function (c, d) {
          return new a.init(d).finalize(c);
        };
      },
      _createHmacHelper: function (a) {
        return function (c, d) {
          return new w.HMAC.init(a, d).finalize(c);
        };
      },
    });
    var w = (f.algo = {});
    return f;
  })(Math);
(function (h) {
  for (
    var s = CryptoJS,
      f = s.lib,
      t = f.WordArray,
      g = f.Hasher,
      f = s.algo,
      j = [],
      q = [],
      v = function (a) {
        return (4294967296 * (a - (a | 0))) | 0;
      },
      u = 2,
      k = 0;
    64 > k;

  ) {
    var l;
    a: {
      l = u;
      for (var x = h.sqrt(l), w = 2; w <= x; w++)
        if (!(l % w)) {
          l = !1;
          break a;
        }
      l = !0;
    }
    l && (8 > k && (j[k] = v(h.pow(u, 0.5))), (q[k] = v(h.pow(u, 1 / 3))), k++);
    u++;
  }
  var a = [],
    f = (f.SHA256 = g.extend({
      _doReset: function () {
        this._hash = new t.init(j.slice(0));
      },
      _doProcessBlock: function (c, d) {
        for (
          var b = this._hash.words,
            e = b[0],
            f = b[1],
            m = b[2],
            h = b[3],
            p = b[4],
            j = b[5],
            k = b[6],
            l = b[7],
            n = 0;
          64 > n;
          n++
        ) {
          if (16 > n) a[n] = c[d + n] | 0;
          else {
            var r = a[n - 15],
              g = a[n - 2];
            a[n] =
              (((r << 25) | (r >>> 7)) ^ ((r << 14) | (r >>> 18)) ^ (r >>> 3)) +
              a[n - 7] +
              (((g << 15) | (g >>> 17)) ^
                ((g << 13) | (g >>> 19)) ^
                (g >>> 10)) +
              a[n - 16];
          }
          r =
            l +
            (((p << 26) | (p >>> 6)) ^
              ((p << 21) | (p >>> 11)) ^
              ((p << 7) | (p >>> 25))) +
            ((p & j) ^ (~p & k)) +
            q[n] +
            a[n];
          g =
            (((e << 30) | (e >>> 2)) ^
              ((e << 19) | (e >>> 13)) ^
              ((e << 10) | (e >>> 22))) +
            ((e & f) ^ (e & m) ^ (f & m));
          l = k;
          k = j;
          j = p;
          p = (h + r) | 0;
          h = m;
          m = f;
          f = e;
          e = (r + g) | 0;
        }
        b[0] = (b[0] + e) | 0;
        b[1] = (b[1] + f) | 0;
        b[2] = (b[2] + m) | 0;
        b[3] = (b[3] + h) | 0;
        b[4] = (b[4] + p) | 0;
        b[5] = (b[5] + j) | 0;
        b[6] = (b[6] + k) | 0;
        b[7] = (b[7] + l) | 0;
      },
      _doFinalize: function () {
        var a = this._data,
          d = a.words,
          b = 8 * this._nDataBytes,
          e = 8 * a.sigBytes;
        d[e >>> 5] |= 128 << (24 - (e % 32));
        d[(((e + 64) >>> 9) << 4) + 14] = h.floor(b / 4294967296);
        d[(((e + 64) >>> 9) << 4) + 15] = b;
        a.sigBytes = 4 * d.length;
        this._process();
        return this._hash;
      },
      clone: function () {
        var a = g.clone.call(this);
        a._hash = this._hash.clone();
        return a;
      },
    }));
  s.SHA256 = g._createHelper(f);
  s.HmacSHA256 = g._createHmacHelper(f);
})(Math);
/* eslint-enable */

export default api;
export { api };
