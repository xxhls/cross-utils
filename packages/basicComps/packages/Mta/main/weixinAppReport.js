/* 2021-03-05 16:05:39 @issue to lijiwen@jd.com Thanks */
!(function () {
  function v(e) {
    if (x && m.own[e]) return x.getStorage(e);
    var t = "";
    try {
      t = wx.getStorageSync(e);
    } catch (e) {}
    return t;
  }
  function l(e, t) {
    if (x && m.own[e]) return x.setStorage(e, t);
    try {
      wx.setStorageSync(e, t);
    } catch (e) {}
  }
  var x,
    c,
    h = {
      1e3: ["direct", "t_1000578828_xcx_1000_wxtd", "xcx", ""],
      1001: ["direct", "t_1000578828_xcx_1001_fxrk", "xcx", ""],
      1005: ["weixin", "t_1000578826_xcx_1005_fxss", "xcx", ""],
      1006: ["weixin", "t_1000578826_xcx_1006_fxss", "xcx", ""],
      1007: ["weixin", "t_1000578832_xcx_1007_drxxkp", "xcx", ""],
      1008: ["weixin", "t_1000578832_xcx_1008_qlxxkp", "xcx", ""],
      1010: ["direct", "t_1000578828_xcx_1010_scj", "xcx", ""],
      1011: ["weixin", "t_1000578833_xcx_1011_smewm", "xcx", ""],
      1012: ["weixin", "t_1000578833_xcx_1011_smewm", "xcx", ""],
      1013: ["weixin", "t_1000578833_xcx_1011_smewm", "xcx", ""],
      1014: ["weixin", "t_1000578827_xcx_1014_xcxmbxx", "xcx", ""],
      1017: ["weixin", "t_1000578829_xcx_1017_tyb", "xcx", ""],
      1019: ["direct", "t_1000578830_xcx_1019_qb", "xcx", ""],
      1020: ["weixin", "t_1000072662_xcx_1020_gzhjs", "xcx", ""],
      1022: ["direct", "t_1000578828_xcx_1022_zdrk", "xcx", ""],
      1023: ["direct", "t_1000578828_xcx_1023_zmtb", "xcx", ""],
      1024: ["direct", "t_1000578828_xcx_1024_xcxjs", "xcx", ""],
      1025: ["weixin", "t_1000578833_xcx_1025_smywm", "xcx", ""],
      1026: ["weixin", "t_1000578829_xcx_1026_fjxcx", "xcx", ""],
      1027: ["weixin", "t_1000578826_xcx_1027_dbss", "xcx", ""],
      1028: ["direct", "t_1000578836_xcx_1028_kqkb", "xcx", ""],
      1029: ["direct", "t_1000578836_xcx_1029_kqxq", "xcx", ""],
      1030: ["weixin", "t_1000578829_xcx_1030_zdhcs", "xcx", ""],
      1031: ["weixin", "t_1000578833_xcx_1025_smywm", "xcx", ""],
      1032: ["weixin", "t_1000578833_xcx_1025_smywm", "xcx", ""],
      1034: ["weixin", "t_1000578827_xcx_1034_zfwcxx", "xcx", ""],
      1035: ["weixin", "t_1000072662_xcx_1035_cdl", "xcx", ""],
      1036: ["weixin", "t_335139774_xcx_1036_appfxxx", "xcx", ""],
      1037: ["weixin", "t_1000578834_xcx_1037_xcxtz", "xcx", ""],
      1038: ["weixin", "t_1000578834_xcx_1038_xcxtz", "xcx", ""],
      1039: ["weixin", "t_1000578829_xcx_1039_yds", "xcx", ""],
      1042: ["weixin", "t_1000578826_xcx_1042_tjss", "xcx", ""],
      1043: ["weixin", "t_1000072662_xcx_1043_gzhxx", "xcx", ""],
      1044: ["weixin", "t_1000578832_xcx_1044_fxxxkp", "xcx", ""],
      1045: ["weixin", "t_1000578835_xcx_1045_pyq", "xcx", ""],
      1046: ["weixin", "t_1000578835_xcx_1046_xqy", "xcx", ""],
      1047: ["weixin", "t_1000578833_xcx_1047_smxcxm", "xcx", ""],
      1048: ["weixin", "t_1000578833_xcx_1047_smxcxm", "xcx", ""],
      1049: ["weixin", "t_1000578833_xcx_1047_smxcxm", "xcx", ""],
      1052: ["direct", "t_1000578836_xcx_1052_kqmdlb", "xcx", ""],
      1053: ["weixin", "t_1000578826_xcx_1053_sys", "xcx", ""],
      1054: ["direct", "t_1000578828_xcx_1054_dbss", "xcx", ""],
      1055: ["weixin", "t_1000578829_xcx_1055_h5hq", "xcx", ""],
      1056: ["weixin", "t_1000578829_xcx_1056_ylbf", "xcx", ""],
      1057: ["direct", "t_1000578830_xcx_1057_yxkxqy", "xcx", ""],
      1058: ["weixin", "t_1000072663_xcx_1058_gzhwz", "xcx", ""],
      1059: ["weixin", "t_1000578829_xcx_1059_yqy", "xcx", ""],
      1064: ["weixin", "t_1000578829_xcx_1064_wifilj", "xcx", ""],
      1067: ["weixin", "t_1000578835_xcx_1067_gzh", "xcx", ""],
      1068: ["weixin", "t_1000578835_xcx_1068_fjxcx", "xcx", ""],
      1069: ["weixin", "t_1000578829_xcx_1069_ydyy", "xcx", ""],
      1071: ["direct", "t_1000578830_xcx_1071_yxklby", "xcx", ""],
      1072: ["weixin", "t_1000578833_xcx_1072_ewmsk", "xcx", ""],
      1073: ["weixin", "t_1000578829_xcx_1073_kfxx", "xcx", ""],
      1074: ["weixin", "t_1000072663_xcx_1074_gzhxx", "xcx", ""],
      1077: ["weixin", "t_1000578829_xcx_1077_yzb", "xcx", ""],
      1078: ["weixin", "t_1000578829_xcx_1078_wifilj", "xcx", ""],
      1079: ["weixin", "t_1000578829_xcx_1079_yxzx", "xcx", ""],
      1081: ["weixin", "t_1000578829_xcx_1081_kfwzl", "xcx", ""],
      1082: ["weixin", "t_1000072663_xcx_1082_hhwzl", "xcx", ""],
      1084: ["weixin", "t_1000578835_xcx_1084_ysy", "xcx", ""],
      1088: ["direct", "t_1000578828_xcx_1088_hhxx", "xcx", ""],
      1089: ["direct", "t_1000578828_xcx_1089_ltkxl", "xcx", ""],
      1090: ["direct", "t_1000578828_xcx_1090_xcxcd", "xcx", ""],
      1091: ["weixin", "t_1000072663_xcx_1091_wzspkp", "xcx", ""],
      1092: ["direct", "t_1000578829_xcx_1092_csfwrk", "xcx", ""],
      1095: ["weixin", "t_1000578835_xcx_1095_xcxzj", "xcx", ""],
      1096: ["direct", "t_1000578828_xcx_1096_ltjl", "xcx", ""],
      1097: ["weixin", "t_1000578829_xcx_1097_zfqy", "xcx", ""],
      1099: ["direct", "t_1000578829_xcx_1099_cj", "xcx", ""],
      1100: ["direct", "t_1000578828_xcx_1100_hbfmxqy", "xcx", ""],
      1102: ["weixin", "t_1000072663_xcx_1102_fwyl", "xcx", ""],
      1103: ["direct", "t_1000578829_xcx_1103_fxwd", "xcx", ""],
      1104: ["direct", "t_1000578829_xcx_1104_xlwd", "xcx", ""],
      1106: ["direct", "t_1000578828_xcx_1106_xlss", "xcx", ""],
      1107: ["direct", "t_1000578828_xcx_1107_dyxx", "xcx", ""],
      1112: ["direct", "t_1000072660_17008_79", "xcx", ""],
      1113: ["direct", "t_1000578828_xcx_1113_azfyp", "xcx", ""],
      1114: ["direct", "t_1000578828_xcx_1114_azcbl", "xcx", ""],
      1119: ["direct", "t_1000578828_xcx_1119_qywxgzt", "xcx", ""],
      1120: ["direct", "t_1000578828_xcx_1120_qywxgrzl", "xcx", ""],
      1121: ["weixin", "t_1000578832_xcx_1121_qywxltjhk", "xcx", ""],
      1124: ["weixin", "t_1000578833_xcx_1124_smywym", "xcx", ""],
      1125: ["weixin", "t_1000578833_xcx_1124_smywym", "xcx", ""],
      1126: ["weixin", "t_1000578833_xcx_1124_smywym", "xcx", ""],
      1129: ["weixin", "t_1000578829_xcx_1129_pc", "xcx", ""],
      1131: ["direct", "t_1000578828_xcx_1131_fcdk", "xcx", ""],
      1133: ["direct", "t_1000578828_xcx_1133_yjsb", "xcx", ""],
      1135: ["weixin", "t_1000578829_xcx_1135_zcxtz", "xcx", ""],
      1150: ["weixin", "t_1000578833_xcx_1150_sspm", "xcx", ""],
      1152: ["weixin", "t_1000072663_xcx_1152_dyhspdkxcx", "xcx", ""],
      1153: ["weixin", "t_1000578833_xcx_1253_swjgy", "xcx", ""],
      1154: ["weixin", "t_1000578832_xcx_1154_pyqdy", "xcx", ""],
      1155: ["weixin", "t_1000578832_xcx_1155_pyqdytz", "xcx", ""],
      1157: ["weixin", "t_1000578832_xcx_1157_fqhhhk", "xcx", ""],
      1158: ["weixin", "t_1000578832_xcx_1158_qgjdkxcx", "xcx", ""],
      1167: ["direct", "t_1000578828_xcx_1167_bqtz", "xcx", ""],
      1168: ["weixin", "t_1000578828_xcx_1168_qqllq", "xcx", ""],
    },
    n = wx.request,
    e = wx.getSystemInfo,
    t = wx.getNetworkType,
    m = {
      jdaKey: "__jda",
      jddKey: "__jdd",
      jdvKey: "__jdv",
      customerInfoKey: "union_customerinfo",
      jdvTimeMS: 864e5,
      customerInfoTime: 86400,
      sessionTime: 1800,
      referKey: "__refer",
      md5Salt: "5YT%aC89$22OI@pQ",
      own: {
        __jda: 1,
        __jdd: 1,
        __jdv: 1,
        __refer: 1,
        appid: 1,
        jdwcx: 1,
        jdzdm: 1,
        union_customerinfo: 1,
      },
      addr: function () {
        var e = "https://neptune.jd.com/log/m";
        try {
          var t = getApp({ allowDefault: !0 });
          t &&
            t.globalRequestUrl &&
            (e = t.globalRequestUrl.replace(/\/*$/, "/neptune/log/m"));
        } catch (e) {}
        return e;
      },
    },
    i = 0;
  function r(e) {
    (e = e || "tr-" + i++),
      (this.name = e),
      (this.logCache = []),
      (this.env = []),
      (this.ext = {}),
      (this.isReady = r.isWxDataReady),
      r.loggerList && r.loggerList instanceof Array && r.loggerList.push(this),
      r.isInitJda || (r.initJda(), (r.isInitJda = !0));
  }
  function _(e) {
    return s(a(o(e)));
  }
  function a(e) {
    return p(u(d(e), 8 * e.length));
  }
  function s(e) {
    for (
      var t, x = c ? "0123456789ABCDEF" : "0123456789abcdef", i = "", n = 0;
      n < e.length;
      n++
    )
      (t = e.charCodeAt(n)), (i += x.charAt((t >>> 4) & 15) + x.charAt(15 & t));
    return i;
  }
  function o(e) {
    for (var t, x, i = "", n = -1; ++n < e.length; )
      (t = e.charCodeAt(n)),
        (x = n + 1 < e.length ? e.charCodeAt(n + 1) : 0),
        55296 <= t &&
          t <= 56319 &&
          56320 <= x &&
          x <= 57343 &&
          ((t = 65536 + ((1023 & t) << 10) + (1023 & x)), n++),
        t <= 127
          ? (i += String.fromCharCode(t))
          : t <= 2047
            ? (i += String.fromCharCode(192 | ((t >>> 6) & 31), 128 | (63 & t)))
            : t <= 65535
              ? (i += String.fromCharCode(
                  224 | ((t >>> 12) & 15),
                  128 | ((t >>> 6) & 63),
                  128 | (63 & t),
                ))
              : t <= 2097151 &&
                (i += String.fromCharCode(
                  240 | ((t >>> 18) & 7),
                  128 | ((t >>> 12) & 63),
                  128 | ((t >>> 6) & 63),
                  128 | (63 & t),
                ));
    return i;
  }
  function d(e) {
    var t,
      x = Array(e.length >> 2);
    for (t = 0; t < x.length; t++) x[t] = 0;
    for (t = 0; t < 8 * e.length; t += 8)
      x[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
    return x;
  }
  function p(e) {
    for (var t = "", x = 0; x < 32 * e.length; x += 8)
      t += String.fromCharCode((e[x >> 5] >>> x % 32) & 255);
    return t;
  }
  function u(e, t) {
    (e[t >> 5] |= 128 << t % 32), (e[14 + (((t + 64) >>> 9) << 4)] = t);
    for (
      var x = 1732584193, i = -271733879, n = -1732584194, c = 271733878, r = 0;
      r < e.length;
      r += 16
    ) {
      var _ = x,
        a = i,
        s = n,
        o = c;
      (x = g(x, i, n, c, e[r + 0], 7, -680876936)),
        (c = g(c, x, i, n, e[r + 1], 12, -389564586)),
        (n = g(n, c, x, i, e[r + 2], 17, 606105819)),
        (i = g(i, n, c, x, e[r + 3], 22, -1044525330)),
        (x = g(x, i, n, c, e[r + 4], 7, -176418897)),
        (c = g(c, x, i, n, e[r + 5], 12, 1200080426)),
        (n = g(n, c, x, i, e[r + 6], 17, -1473231341)),
        (i = g(i, n, c, x, e[r + 7], 22, -45705983)),
        (x = g(x, i, n, c, e[r + 8], 7, 1770035416)),
        (c = g(c, x, i, n, e[r + 9], 12, -1958414417)),
        (n = g(n, c, x, i, e[r + 10], 17, -42063)),
        (i = g(i, n, c, x, e[r + 11], 22, -1990404162)),
        (x = g(x, i, n, c, e[r + 12], 7, 1804603682)),
        (c = g(c, x, i, n, e[r + 13], 12, -40341101)),
        (n = g(n, c, x, i, e[r + 14], 17, -1502002290)),
        (x = w(
          x,
          (i = g(i, n, c, x, e[r + 15], 22, 1236535329)),
          n,
          c,
          e[r + 1],
          5,
          -165796510,
        )),
        (c = w(c, x, i, n, e[r + 6], 9, -1069501632)),
        (n = w(n, c, x, i, e[r + 11], 14, 643717713)),
        (i = w(i, n, c, x, e[r + 0], 20, -373897302)),
        (x = w(x, i, n, c, e[r + 5], 5, -701558691)),
        (c = w(c, x, i, n, e[r + 10], 9, 38016083)),
        (n = w(n, c, x, i, e[r + 15], 14, -660478335)),
        (i = w(i, n, c, x, e[r + 4], 20, -405537848)),
        (x = w(x, i, n, c, e[r + 9], 5, 568446438)),
        (c = w(c, x, i, n, e[r + 14], 9, -1019803690)),
        (n = w(n, c, x, i, e[r + 3], 14, -187363961)),
        (i = w(i, n, c, x, e[r + 8], 20, 1163531501)),
        (x = w(x, i, n, c, e[r + 13], 5, -1444681467)),
        (c = w(c, x, i, n, e[r + 2], 9, -51403784)),
        (n = w(n, c, x, i, e[r + 7], 14, 1735328473)),
        (x = y(
          x,
          (i = w(i, n, c, x, e[r + 12], 20, -1926607734)),
          n,
          c,
          e[r + 5],
          4,
          -378558,
        )),
        (c = y(c, x, i, n, e[r + 8], 11, -2022574463)),
        (n = y(n, c, x, i, e[r + 11], 16, 1839030562)),
        (i = y(i, n, c, x, e[r + 14], 23, -35309556)),
        (x = y(x, i, n, c, e[r + 1], 4, -1530992060)),
        (c = y(c, x, i, n, e[r + 4], 11, 1272893353)),
        (n = y(n, c, x, i, e[r + 7], 16, -155497632)),
        (i = y(i, n, c, x, e[r + 10], 23, -1094730640)),
        (x = y(x, i, n, c, e[r + 13], 4, 681279174)),
        (c = y(c, x, i, n, e[r + 0], 11, -358537222)),
        (n = y(n, c, x, i, e[r + 3], 16, -722521979)),
        (i = y(i, n, c, x, e[r + 6], 23, 76029189)),
        (x = y(x, i, n, c, e[r + 9], 4, -640364487)),
        (c = y(c, x, i, n, e[r + 12], 11, -421815835)),
        (n = y(n, c, x, i, e[r + 15], 16, 530742520)),
        (x = j(
          x,
          (i = y(i, n, c, x, e[r + 2], 23, -995338651)),
          n,
          c,
          e[r + 0],
          6,
          -198630844,
        )),
        (c = j(c, x, i, n, e[r + 7], 10, 1126891415)),
        (n = j(n, c, x, i, e[r + 14], 15, -1416354905)),
        (i = j(i, n, c, x, e[r + 5], 21, -57434055)),
        (x = j(x, i, n, c, e[r + 12], 6, 1700485571)),
        (c = j(c, x, i, n, e[r + 3], 10, -1894986606)),
        (n = j(n, c, x, i, e[r + 10], 15, -1051523)),
        (i = j(i, n, c, x, e[r + 1], 21, -2054922799)),
        (x = j(x, i, n, c, e[r + 8], 6, 1873313359)),
        (c = j(c, x, i, n, e[r + 15], 10, -30611744)),
        (n = j(n, c, x, i, e[r + 6], 15, -1560198380)),
        (i = j(i, n, c, x, e[r + 13], 21, 1309151649)),
        (x = j(x, i, n, c, e[r + 4], 6, -145523070)),
        (c = j(c, x, i, n, e[r + 11], 10, -1120210379)),
        (n = j(n, c, x, i, e[r + 2], 15, 718787259)),
        (i = j(i, n, c, x, e[r + 9], 21, -343485551)),
        (x = k(x, _)),
        (i = k(i, a)),
        (n = k(n, s)),
        (c = k(c, o));
    }
    return Array(x, i, n, c);
  }
  function f(e, t, x, i, n, c) {
    return k(
      (function (e, t) {
        return (e << t) | (e >>> (32 - t));
      })(k(k(t, e), k(i, c)), n),
      x,
    );
  }
  function g(e, t, x, i, n, c, r) {
    return f((t & x) | (~t & i), e, t, n, c, r);
  }
  function w(e, t, x, i, n, c, r) {
    return f((t & i) | (x & ~i), e, t, n, c, r);
  }
  function y(e, t, x, i, n, c, r) {
    return f(t ^ x ^ i, e, t, n, c, r);
  }
  function j(e, t, x, i, n, c, r) {
    return f(x ^ (t | ~i), e, t, n, c, r);
  }
  function k(e, t) {
    var x = (65535 & e) + (65535 & t);
    return (((e >> 16) + (t >> 16) + (x >> 16)) << 16) | (65535 & x);
  }
  (r.loggerList = []),
    (r.dependList = { sysinfo: 0, netType: 0 }),
    (r.isWxDataReady = !1),
    (r.dataReady = function (e) {
      if (!r.isWxDataReady) {
        for (var t in ((r.dependList[e] = 1), r.dependList))
          if (!r.dependList[t]) return;
        r.isWxDataReady = !0;
        t = 0;
        for (var x = r.loggerList.length; t < x; t++) r.loggerList[t].ready();
        delete r.loggerList;
      }
    }),
    ((r.pr = r.prototype).ready = function () {
      this.isReady = !0;
      for (var e = this.logCache.length, t = 0; t < e; t++)
        this.sendData.apply(this, this.logCache[t]);
    }),
    (r.pr.sendData = function (e, t, x) {
      var i;
      ((i =
        "pv" == t
          ? this.initPvData(x)
          : "cl" == t
            ? this.initClickData(x)
            : "cd" == t
              ? this.initShoppingData(x)
              : "od" == t
                ? this.initOrderData(x)
                : "sr" == t
                  ? this.initPageUnloadData(x)
                  : "ep" == t
                    ? this.initExposureData(x)
                    : x).tpc = e),
        (i.report_ts = I() / 1e3),
        (i.token = r.md5(i.report_ts + m.md5Salt)),
        (i.data[0].typ = t),
        this.request(i, "sr" == t || "cl" == t);
    }),
    (r.pr.send = function (e, t, x) {
      this.isReady
        ? this.sendData.apply(this, arguments)
        : this.logCache.push(arguments);
    }),
    (r.pr.request = function (e, t) {
      var x = !1;
      if (
        (n({
          url: m.addr() + "?std=" + e.std,
          data: e,
          method: "POST",
          header: { "content-type": "application/json" },
          success: function (e) {
            x = !0;
          },
        }),
        t)
      )
        for (var i = I() + 100; I() < i || x; );
    }),
    (r.pr.exports = function () {
      var c = this;
      return {
        set: function (e) {
          c.setData(e);
        },
        pv: function (e) {
          (c.lastPvTime && I() - c.lastPvTime < 100) ||
            ((c.lastPvTime = I()),
            c.env[O] || (c.setupPageview(), (c.env[O] = !0)),
            c.send("wx_app.000000", "pv", e),
            (c.env[O] = !1));
        },
        click: function (e) {
          c.send("wx_app.000001", "cl", e);
        },
        exposure: function (e) {
          c.send("wx_app.000005", "ep", e);
        },
        autoClick: function (e) {
          var t,
            x = e.target.dataset,
            i = e.currentTarget.dataset;
          if ((x && x.eid ? (t = x) : i && i.eid && (t = i), t)) {
            var n = {
              eid: t.eid,
              elevel: t.elevel,
              eparam: t.eparam,
              pname: t.pname,
              pparam: t.pparam,
              target: t.target,
              event: e,
            };
            c.send("wx_app.000001", "cl", n);
          }
        },
        addToCart: function (e) {
          c.send("wx_app.000002", "cd", e);
        },
        order: function (e) {
          c.send("wx_app.000003", "od", e);
        },
        pageUnload: function (e) {
          c.send("wx_app.000004", "sr", e);
        },
        getSeries: function () {
          return (
            c.env[O] || (c.setupPageview(), (c.env[O] = !0)),
            JSON.stringify(c.getSeriesData())
          );
        },
        urlAddSeries: function (e) {
          var t = (e || "").indexOf("#"),
            x = "wxappSeries=" + encodeURIComponent(this.getSeries());
          return -1 < t
            ? t === e.length - 1
              ? e + x
              : e + "&" + x
            : e + "#" + x;
        },
        setMParam: function (e) {
          return c.setMParam(e);
        },
        getJda: function () {
          return v(m.jdaKey);
        },
        getJdv: function () {
          return v(m.jdvKey);
        },
        getStorage: function (e) {
          return v(e);
        },
        setStorage: function (e, t) {
          return l(e, t);
        },
        setJdv: function (e) {
          return e && 5 === e.split("|").length && l(m.jdvKey, e + "|" + I());
        },
      };
    }),
    (c = 0),
    (r.md5 = _);
  function D() {
    return I() + "" + parseInt(2147483647 * Math.random());
  }
  function C(e) {
    return "[object Object]" == {}.toString.call(e);
  }
  function S(e, t) {
    if (C(e) && C(t)) for (var x in t) e[x] = t[x];
  }
  function q(e) {
    var t = [];
    if (C(e)) for (var x in e) "m_param" !== x && t.push(x + "=" + e[x]);
    return t.join("&");
  }
  var I = function () {
      return new Date().getTime();
    },
    z = 0,
    b = z++,
    P = z++,
    R = z++,
    T = z++,
    K = z++,
    A = z++,
    L = z++,
    J = z++,
    U = z++,
    O = z++,
    E = z++,
    M = z++,
    W = z++,
    N = z++,
    X = z++,
    F = z++,
    Y = z++,
    $ = z++,
    B = z++,
    H = z++,
    Q = z++,
    V = z++,
    G = z++,
    Z = z++,
    ee = z++,
    te = z++,
    xe = z++,
    ie = z++,
    ne = z++,
    ce = z++;
  r.pr.getData = function (e) {
    for (var t = {}, x = 0, i = e.length; x < i; x++) {
      var n = e[x];
      t[n[0]] = this.env[n[1]] || "";
    }
    return t;
  };
  var re,
    _e = null;
  (r.pr.setupPageview = function () {
    var e = this.env,
      t = I(),
      x = parseInt(t / 1e3),
      i = (function (e) {
        if (C(e)) for (var t in e) return !1;
        return !0;
      })(e[N]),
      n = v(m.jdaKey),
      c = v(m.jddKey),
      r = v(m.jdvKey);
    if (!e[M] || i)
      try {
        var _ = getCurrentPages(),
          a = _[_.length - 1];
        if (((e[M] = e[M] || a.route || a.__route__ || ""), i)) {
          var s = C(a.options) ? a.options : {};
          (e[W] = q(s)), (e[N] = s), this.setMParam(s.m_param);
        }
      } catch (e) {}
    (e[U] = !1),
      (function (e, t, x) {
        var i = (e || "").split(".");
        1 < i.length
          ? (x[U] = x[U] || 1 * i[1] + m.sessionTime < t)
          : (x[U] = !0);
      })(c, x, e);
    var o = (function (e, t, x) {
        var i = (e || "").split("|"),
          n = "",
          c = "",
          r = "",
          _ = "",
          a = !0;
        6 <= i.length &&
          t - i[5] <= m.jdvTimeMS &&
          ((n = i[1]), (c = i[2]), (r = i[3]), (_ = i[4]), (a = !1));
        var s = x[N],
          o = [];
        if (_e && h[_e]) {
          var d = h[_e];
          (o[0] = d[0]),
            (o[1] = encodeURIComponent(d[1])),
            (o[2] = encodeURIComponent(d[2]) || "none"),
            (o[3] = encodeURIComponent(d[3]) || "-"),
            (_e = null);
        }
        s &&
          s.utm_source &&
          ((o[0] = encodeURIComponent(s.utm_source)),
          (o[1] = encodeURIComponent(s.utm_campaign || "") || c),
          (o[2] = encodeURIComponent(s.utm_medium || "") || r),
          (o[3] = encodeURIComponent(s.utm_term || "") || _),
          (_ = o[3]),
          (a = !0));
        var p = !1;
        0 < o.length && "direct" != o[0]
          ? (p =
              (o[0] !== n || o[1] !== c || o[2] !== r) && "referral" !== o[2])
          : 0 < o.length &&
            "direct" == o[0] &&
            ("direct" === n || !n) &&
            (p = o[1] !== c || o[2] !== r || o[3] !== _);
        var u = "";
        return (
          p &&
            ((n = o[0] || n),
            (c = o[1] || c),
            (r = o[2] || r),
            (_ = o[3] || _)),
          (a || p) &&
            (u = [1, n || "direct", c || "-", r || "none", _ || "-", t].join(
              "|",
            )),
          (x[U] = x[U] || p),
          u
        );
      })(r, t, e),
      d = (function (e, t, x) {
        var i = (e || "").split("."),
          n = 1;
        1 < i.length
          ? ((x[U] = x[U] || 1 * i[1] + m.sessionTime < t),
            (n = (x[U] ? 1 : 1 * i[0] + 1) || 1))
          : (x[U] = !0),
          (x[A] = n);
      })(c, x, e),
      p = (function (e, t, x) {
        var i,
          n,
          c,
          r,
          _ = (e || "").split("."),
          a = 1,
          s = 1;
        (s =
          5 < _.length
            ? ((a = _[0] || a),
              (i = _[1] || D()),
              (n = _[2] || t),
              x[U]
                ? ((c = _[4] || t), (r = t), 1 * _[5] + 1 || 1)
                : ((c = _[3] || t), (r = _[4] || t), 1 * _[5] || 1))
            : ((i = D()), (n = c = r = t), 1)),
          [
            (x[ne] = a),
            (x[P] = i),
            (x[R] = n),
            (x[T] = c),
            (x[K] = r),
            (x[L] = s),
          ].join(".");
      })(n, x, e);
    !(function (e) {
      if (e[ce] && e[ce].pv_sid && e[ce].pv_seq) {
        var t = 1 * e[ce].pv_sid,
          x = 1 * e[ce].pv_seq;
        99999999 < t ||
          ((t > e[L] || (t == e[L] && x >= e[A])) &&
            ((e[L] = t), (e[A] = 1 + x)));
      }
    })(e),
      o && l(m.jdvKey, o),
      (d = [e[A], x].join(".")),
      (p = [e[ne], e[P], e[R], e[T], e[K], e[L]].join(".")),
      l(m.jddKey, d),
      l(m.jdaKey, p);
    var u = (function (e, t, x) {
      var i = x[N],
        n = "",
        c = "";
      if (i && i.customerinfo) (n = i.customerinfo), (c = t);
      else {
        var r = e instanceof Array ? e : [];
        2 == r.length &&
          t - r[1] < m.customerInfoTime &&
          ((n = r[0]), (c = r[1]));
      }
      return (x[ee] = n) ? [n, c] : [];
    })(v(m.customerInfoKey), x, e);
    if (
      (l(m.customerInfoKey, u),
      (e[J] = o || r),
      (function (e) {
        var t = v("jdwcx") || v("jdzdm");
        t &&
          (t.unionid && (e[G] = t.unionid),
          t.wxversion && (e[Z] = t.wxversion));
      })(this.env),
      e[U])
    )
      (e[$] = ""), (e[B] = "");
    else {
      var f = v(m.referKey);
      (e[$] = f[0]), (e[B] = f[1]);
    }
    l(m.referKey, [e[M], e[W]]);
  }),
    (r.pr.initPvData = function (e) {
      (this.pageLoadTime = I()), (this.maxClickDeep = 0), (e = e || {});
      var t = this.baseEnv(),
        x = [
          ["sku", te],
          ["shp", xe],
          ["tit", E],
          ["ldt", ie],
        ],
        i = this.getData(x);
      return (
        (i.page_id = e.pageId || this.env[X] || ""),
        (i.pname = e.pname || this.env[F] || this.env[M] || ""),
        (i.pparam = e.pparam || this.env[Y] || this.env[W] || ""),
        S(t.data[0], i),
        S(t.data[0].ext, e.ext),
        t
      );
    }),
    (r.pr.initClickData = function (e) {
      var t = this.baseEnv(),
        x = t.data[0];
      if (
        ((x.eid = e.eid || ""),
        (x.eparam = e.eparam || ""),
        (x.elevel = e.elevel || ""),
        (x.page_id = e.pageId || this.env[X] || ""),
        (x.pname = e.pname || this.env[F] || this.env[M] || ""),
        (x.pparam = e.pparam || this.env[Y] || this.env[W] || ""),
        (x.tar = e.target || ""),
        (x.x = 0),
        (x.y = 0),
        (function (e) {
          return !!(C(e) && e.type && e.target);
        })(e.event))
      ) {
        var i = e.event,
          n = i.touches;
        if (
          ((!n || n.length < 1) && (n = i.changedTouches), n && 0 < n.length)
        ) {
          x.x = parseInt(n[0].pageX);
          var c = parseInt(n[0].pageY);
          (x.y = c) > this.maxClickDeep && (this.maxClickDeep = c);
        }
      }
      return S(x.ext, e.ext), t;
    }),
    (r.pr.initExposureData = r.pr.initClickData),
    (r.pr.initShoppingData = function (e) {
      var t = this.baseEnv(),
        x = t.data[0];
      return (
        (x.eid = e.eid || ""),
        (x.eparam = e.eparam || ""),
        (x.elevel = e.elevel || ""),
        (x.page_id = e.pageId || this.env[X] || ""),
        (x.pname = e.pname || this.env[F] || this.env[M] || ""),
        (x.pparam = e.pparam || this.env[Y] || this.env[W] || ""),
        (x.sku_list = e.shoppingList ? JSON.stringify(e.shoppingList) : ""),
        S(x.ext, e.ext),
        t
      );
    }),
    (r.pr.initOrderData = function (e) {
      var t = this.baseEnv(),
        x = t.data[0];
      return (
        (x.eid = e.eid || ""),
        (x.eparam = e.eparam || ""),
        (x.elevel = e.elevel || ""),
        (x.page_id = e.pageId || this.env[X] || ""),
        (x.pname = e.pname || this.env[F] || this.env[M] || ""),
        (x.pparam = e.pparam || this.env[Y] || this.env[W] || ""),
        (x.sku_list = e.orderList ? JSON.stringify(e.orderList) : ""),
        (x.order_total_fee = e.total || 0),
        (x.sale_ord_id = e.orderid || ""),
        S(x.ext, e.ext),
        t
      );
    }),
    (r.pr.initPageUnloadData = function (e) {
      var t = ((I() - this.pageLoadTime) / 1e3).toFixed(3),
        x = this.baseEnv(),
        i = x.data[0];
      return (
        (e = e || {}),
        (i.page_id = e.pageId || this.env[X] || ""),
        (i.pname = e.pname || this.env[F] || this.env[M] || ""),
        (i.pparam = e.pparam || this.env[Y] || this.env[W] || ""),
        (i.alive_seconds = t),
        (i.click_deep = this.maxClickDeep),
        S(i.ext, e.ext),
        x
      );
    }),
    (re = r.wxDat = {}),
    e({
      success: function (e) {
        e &&
          ((re.dvc = e.model),
          (re.pixelRatio = (e.pixelRatio || "") + ""),
          (re.scr = parseInt(e.windowWidth) + "x" + parseInt(e.windowHeight)),
          (re.lang = e.language),
          (re.wxver = e.version),
          (re.sdkver = e.SDKVersion || ""));
      },
      complete: function () {
        r.dataReady("sysinfo");
      },
    }),
    t({
      success: function (e) {
        e && (re.net = e.networkType);
      },
      complete: function () {
        r.dataReady("netType");
      },
    }),
    (r.pr.setData = function (e) {
      if (C(e)) {
        var t = {
          account: [H],
          siteId: [b],
          skuid: [te],
          shopid: [xe],
          title: [E],
          loadtime: [ie],
          url: [M],
          urlParam: [W, q],
          pageId: [X],
          pname: [F],
          pparam: [Y],
          appid: [Q],
          openid: [V],
          unionid: [G],
        };
        for (var x in e) {
          var i = t[x];
          i
            ? (this.env[i[0]] = i[1] ? i[1](e[x]) : e[x])
            : (this.ext[x] = e[x]);
        }
        var n = C(e.urlParam) ? e.urlParam : {};
        (this.env[N] = n),
          this.setMParam(n.m_param),
          this.env[Q] || (this.env[Q] = v("appid"));
      }
    }),
    (r.appDat = {}),
    (r.setAppData = function (e) {
      for (var t in e) r.appDat[t] = e[t];
    }),
    (r.scene = null),
    (r.setScene = function (e) {
      _e = r.scene = e;
    }),
    (r.pr.setMParam = function (e) {
      try {
        var t = JSON.parse(e);
        this.env[ce] = C(t) ? t : {};
      } catch (e) {
        this.env[ce] = {};
      }
    }),
    (r.pr.baseEnv = function () {
      var e = this.env,
        t = r.wxDat,
        x = {
          cli: "wx-app",
          std: e[b] || "WXAPP-JA2016-1",
          uuid: e[P] || "",
          scr: t.scr || "",
          dvc: t.dvc || "",
          lang: t.lang || "",
          appkey: e[Z] || "",
          appid: e[Q] || "",
          openid: e[V] || "",
          unionid: e[G] || "",
          gender: t.gender || "",
          city: t.city || "",
          province: t.province || "",
          country: t.country || "",
          wxver: t.wxver || "",
          data: [],
        },
        i = [
          ["ctp", M],
          ["par", W],
          ["ref", $],
          ["rpr", B],
          ["seq", A],
          ["vts", L],
          ["pin", H],
          ["fst", R],
          ["pst", T],
          ["vct", K],
        ],
        n = this.getData(i);
      return (
        (n.jsver = "WX1.1.2"),
        (n.net = t.net || ""),
        (n.lat = t.lat || ""),
        (n.lon = t.lon || ""),
        (n.speed = t.speed || ""),
        (n.accuracy = t.accuracy || ""),
        (n.pixelRatio = t.pixelRatio || ""),
        (n.jdv = e[J] || ""),
        (n.customerInfo = e[ee] || ""),
        (n.unpl = v("unpl") || ""),
        (n.scene = r.scene || ""),
        (n.sdkver = t.sdkver || ""),
        (n.ext = {}),
        S(n.ext, this.ext),
        S(n.ext, r.appDat),
        x.data.push(n),
        x
      );
    }),
    (r.pr.getSeriesData = function () {
      var e = this.env,
        t = {
          uuid: e[P] || "",
          std: e[b] || "WXAPP-JA2016-1",
          seq: e[A],
          vts: e[L],
        };
      return e[Z] && (t.appkey = e[Z]), e[Q] && (t.appid = e[Q]), t;
    }),
    (r.initJda = function () {
      var e = v(m.jdaKey);
      if (!e) {
        var t = I();
        (e = [1, D(), t, t, t, 0].join(".")), l(m.jdaKey, e);
      }
      return e;
    }),
    (module.exports = {
      init: function () {
        return new r().exports();
      },
      usePlugin: function (e) {
        if (e)
          try {
            x = requirePlugin(e);
          } catch (e) {}
      },
      setAppData: function (e) {
        r.setAppData(e);
      },
      setScene: function (e) {
        r.setScene(e);
      },
    });
})();
