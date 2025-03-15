import e from "axios";
import t from "qs";
import o from "@legos/js-security-v3/dist";
import {
  isDaojiaApp as r,
  isIOS as n,
  isAndroid as i,
  isJDApp as a,
} from "@jd/qin-env/dist/es/index.h5";
import { setCookie as d } from "@dj-lib/cookie/dist/es/index.h5";
import { SHA256 as c } from "@dj-lib/tools";
import { getDeviceId as s } from "@dj-lib/host-info/dist/es/index.h5";
import { errReport as u } from "@dj-lib/djmonitor/dist/es/index.h5";
var l = function () {
  return (
    (l =
      Object.assign ||
      function (e) {
        for (var t, o = 1, r = arguments.length; o < r; o++)
          for (var n in (t = arguments[o]))
            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e;
      }),
    l.apply(this, arguments)
  );
};
function p(e, t, o, r) {
  return new (o || (o = Promise))(function (n, i) {
    function a(e) {
      try {
        c(r.next(e));
      } catch (e) {
        i(e);
      }
    }
    function d(e) {
      try {
        c(r.throw(e));
      } catch (e) {
        i(e);
      }
    }
    function c(e) {
      var t;
      e.done
        ? n(e.value)
        : ((t = e.value),
          t instanceof o
            ? t
            : new o(function (e) {
                e(t);
              })).then(a, d);
    }
    c((r = r.apply(e, t || [])).next());
  });
}
function m(e, t) {
  var o,
    r,
    n,
    i,
    a = {
      label: 0,
      sent: function () {
        if (1 & n[0]) throw n[1];
        return n[1];
      },
      trys: [],
      ops: [],
    };
  return (
    (i = { next: d(0), throw: d(1), return: d(2) }),
    "function" == typeof Symbol &&
      (i[Symbol.iterator] = function () {
        return this;
      }),
    i
  );
  function d(d) {
    return function (c) {
      return (function (d) {
        if (o) throw new TypeError("Generator is already executing.");
        for (; i && ((i = 0), d[0] && (a = 0)), a; )
          try {
            if (
              ((o = 1),
              r &&
                (n =
                  2 & d[0]
                    ? r.return
                    : d[0]
                      ? r.throw || ((n = r.return) && n.call(r), 0)
                      : r.next) &&
                !(n = n.call(r, d[1])).done)
            )
              return n;
            switch (((r = 0), n && (d = [2 & d[0], n.value]), d[0])) {
              case 0:
              case 1:
                n = d;
                break;
              case 4:
                return a.label++, { value: d[1], done: !1 };
              case 5:
                a.label++, (r = d[1]), (d = [0]);
                continue;
              case 7:
                (d = a.ops.pop()), a.trys.pop();
                continue;
              default:
                if (
                  !((n = a.trys),
                  (n = n.length > 0 && n[n.length - 1]) ||
                    (6 !== d[0] && 2 !== d[0]))
                ) {
                  a = 0;
                  continue;
                }
                if (3 === d[0] && (!n || (d[1] > n[0] && d[1] < n[3]))) {
                  a.label = d[1];
                  break;
                }
                if (6 === d[0] && a.label < n[1]) {
                  (a.label = n[1]), (n = d);
                  break;
                }
                if (n && a.label < n[2]) {
                  (a.label = n[2]), a.ops.push(d);
                  break;
                }
                n[2] && a.ops.pop(), a.trys.pop();
                continue;
            }
            d = t.call(e, a);
          } catch (e) {
            (d = [6, e]), (r = 0);
          } finally {
            o = n = 0;
          }
        if (5 & d[0]) throw d[1];
        return { value: d[0] ? d[1] : void 0, done: !0 };
      })([d, c]);
    };
  }
}
"function" == typeof SuppressedError && SuppressedError;
var f = "deviceid_pdj_jd",
  h = {
    deviceId: "uuid",
    platCode: "client",
    platVersion: "osVersion",
    channel: "partner",
    buildVersion: "build",
    brand: "d_brand",
    deviceModel: "d_model",
  };
function j(e) {
  var t = (function (e) {
    var t = {};
    for (var o in e) {
      var r = o;
      r in h ? (t[h[r]] = e[r]) : (t[r] = e[r]);
    }
    return t;
  })(e);
  return (t.source = t.client), (t.clientVersion = t.appVersion), t;
}
var y = function (e, t) {
    return p(void 0, void 0, void 0, function () {
      var r, n, i;
      return m(this, function (a) {
        switch (a.label) {
          case 0:
            return (
              a.trys.push([0, 2, , 3]),
              (r = new o({ appId: e, preRequest: !0, debug: !0 })),
              (n = {
                appid: "hourly-m",
                functionId: t.functionId,
                clientVersion: t.clientVersion,
                client: t.client,
                t: t.t,
                body: c(t.body).toString(),
              }),
              [4, r.sign(n)]
            );
          case 1:
            return (i = a.sent()), [2, encodeURI(i.h5st)];
          case 2:
            return a.sent(), [2, null];
          case 3:
            return [2];
        }
      });
    });
  },
  b = function (o) {
    return p(void 0, void 0, void 0, function () {
      var c, p, h, b, v, g, w, x, I, S, C, V, _, O, k;
      return m(this, function (m) {
        switch (m.label) {
          case 0:
            return (
              (c = Date.now()),
              (p = {
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
                "hour-prepdjm.jd.com": "api.m.jd.com",
                "local.jd.com": "beta-api.m.jd.com",
                "hour.jd.com": "api.m.jd.com",
                "hour-dev.jd.com": "beta-api.m.jd.com",
                "hour-pre.jd.com": "api.m.jd.com",
              }),
              (h = sessionStorage.getItem(f))
                ? [3, 2]
                : [4, s().catch(function (e) {})]
            );
          case 1:
            (h = m.sent()),
              sessionStorage.setItem(f, h),
              (b = {
                domain: location.host.includes(".jd.com") ? ".jd.com" : "",
                expires: 90,
                path: "/",
              }),
              d(f, h, b),
              (m.label = 2);
          case 2:
            if (
              ((v = (function (e) {
                var t = localStorage.getItem(e) || "";
                if (t) {
                  var o = "";
                  try {
                    o = JSON.parse(t);
                  } catch (e) {
                    o = t;
                  }
                  return o;
                }
                return "";
              })("_current_address_")),
              (g = (v && "string" == typeof v ? JSON.parse(v) : v) || {}),
              o.body &&
                "object" == typeof o.body &&
                (o.body = JSON.stringify(o.body)),
              (w = {
                lat: g.latitude || "",
                lng: g.longitude || "",
                lat_pos: g.latitude || "",
                lng_pos: g.longitude || "",
                city_id: g.cityId || g.areaCode || g.cityCode || "",
                channel:
                  ((T = "h5"),
                  r
                    ? (n && (T = "ios"), i && (T = "android"))
                    : a && (T = "rn"),
                  T),
                platform: o.appVersion || "8.25.0",
                platCode: "h5",
                appVersion: o.appVersion || "8.25.0",
                appName: "paidaojia",
                deviceModel: "appmodel",
                deviceId: h,
                traceId: h + c || "",
                t: c,
                loginType: 12,
                appid: "hourly-m",
                "x-api-eid-token":
                  localStorage.getItem("x-api-eid-token") || "",
              }),
              (x = "/client.action?appid=hourly-m&functionId=".concat(
                o.functionId,
              )),
              (I = p[location.hostname] || "api.m.jd.com"),
              (S = "https://"
                .concat(I, "/client.action?appid=hourly-m&functionId=")
                .concat(o.functionId)),
              (C = o.colorMethod || o.method || "GET"),
              (V = {
                headers: l(
                  { "Content-Type": "application/x-www-form-urlencoded" },
                  o.header,
                ),
                method: C,
                url: "".concat(
                  location.host.indexOf(".jd.com") > -1 ||
                    location.host.indexOf("jddj.com") > -1
                    ? S
                    : x,
                ),
                timeout: o.timeout || 16e3,
                withCredentials: !0,
              }),
              (w = l(l({}, w), o)),
              !(_ = j(w)).signBusinessId)
            )
              return [3, 6];
            m.label = 3;
          case 3:
            return (
              m.trys.push([3, 5, , 6]), (O = _), [4, y(_.signBusinessId, _)]
            );
          case 4:
            return (O.h5st = m.sent()), [3, 6];
          case 5:
            return m.sent(), [3, 6];
          case 6:
            return (
              (k = _.isReport),
              delete _.method,
              delete _.colorMethod,
              delete _.functionId,
              delete _.timeout,
              delete _.isReport,
              "post" == C || "POST" == C
                ? (V.data = t.stringify(_))
                : (V.params = _),
              [
                2,
                e.request(V).then(
                  function (e) {
                    e.isColor = 1;
                    var t = e.data || {};
                    if (o.isNeedDealError) {
                      try {
                        k &&
                          t &&
                          t.code &&
                          0 != t.code &&
                          u({
                            errType: 1,
                            errCode: t && t.code,
                            errMsg: t,
                            extra: l({}, V),
                          });
                      } catch (e) {}
                      return Promise.resolve(e);
                    }
                    if (0 == t.code || "ok" == t.status)
                      return Promise.resolve(e);
                    try {
                      k &&
                        u({
                          errType: 1,
                          errCode: t && t.code,
                          errMsg: t,
                          extra: l({}, V),
                        });
                    } catch (e) {}
                    return Promise.reject(e);
                  },
                  function (e) {
                    try {
                      k &&
                        u({
                          errType: 1,
                          errCode: 999,
                          errMsg: e,
                          extra: { type: "axios&error" },
                        });
                    } catch (e) {}
                    return Promise.reject(l(l({}, e), { isColor: 1 }));
                  },
                ),
              ]
            );
        }
        var T;
      });
    });
  };
export { b as api, b as default };
