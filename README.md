<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD040 -->

# CROSS-UTILS

## Taro内资源加载逻辑

<table>
  <tr><th>级别</th><th>平台</th><th>加载逻辑</th><th>后缀</th></tr>
  <tr><td rowspan="14">一级公民</td><td>微信小程序</td><td>微信小程序内优先加载</td><td>index.weapp.ts</td></tr>
  <tr><td>百度小程序</td><td>百度小程序内优先加载</td><td>index.swan.ts</td></tr>
  <tr><td>支付宝小程序</td><td>支付宝小程序内优先加载</td><td>index.alipay.ts</td></tr>
  <tr><td>抖音小程序</td><td>抖音小程序内优先加载</td><td>index.tt.ts</td></tr>
  <tr><td>QQ小程序</td><td>QQ小程序内优先加载</td><td>index.qq.ts</td></tr>
  <tr><td>京东小程序</td><td>京东小程序内优先加载</td><td>index.jd.ts</td></tr>
  <tr><td>企业微信小程序</td><td>企业微信小程序内优先加载</td><td>index.qywx.ts</td></tr>
  <tr><td>钉钉小程序</td><td>钉钉小程序内优先加载</td><td>index.dd.ts</td></tr>
  <tr><td>支付宝IOT小程序</td><td>支付宝IOT小程序内优先加载</td><td>index.iot.ts</td></tr>
  <tr><td>飞书小程序</td><td>飞书小程序内优先加载</td><td>index.lark.ts</td></tr>
  <tr><td>快手小程序</td><td>快手小程序内优先加载</td><td>index.kwai.ts</td></tr>
  <tr><td>H5页面</td><td>H5页面内优先加载</td><td>index.h5.ts</td></tr>
  <tr><td>React Native项目</td><td>React Native项目内优先加载</td><td>index.rn.ts</td></tr>
  <tr><td>Harmony-hybird项目</td><td>Harmony-hybird项目内优先加载</td><td>index.harmony-hybrid.ts</td></tr>
  <tr><td>二级公民</td><td>通用</td><td>非平台文件内优先加载</td><td>index.taro.ts</td></tr>
  <tr><td>三级公民</td><td>通用</td><td>非平台文件且无.taro.ts优先加载</td><td>index.ts</td></tr>
</table>

## 单包结构

@test/cross-xxx

```
@test/cross-xxx
└── main
    ├── index.ts                # 入口文件（三级公民）
    ├── index.taro.ts           # Taro 通用实现（二级公民）
    ├── index.weapp.ts          # 微信小程序实现（一级公民）
    ├── index.alipay.ts         # 支付宝小程序实现（一级公民）
    ├── index.h5.ts             # H5实现（一级公民）
    ├── package.json            # 包配置文件
    ├── README.md               # 文档说明
    ├── CHANGELOG.md            # 更新日志
    ├── __tests__                   # 类型定义目录
    │   └── index.test.ts
    ├── types                   # 类型定义目录
    │   └── index.d.ts
    └── utils                   # 工具函数目录
        └── index.ts
```

## 版本控制

核心原则：父子包最大限度保持版本同步

场景：

初始化时，主包v1.0依赖子包1v1.0，子包2v1.0。经过一段时间的迭代，子包1开发到v1.3版本，子包2开发到v1.9版本，而主包一直未进行升级。对主包进行发版，若版本低于1.3则将主包内两个子包的版本升级到低于1.3最大的版本；若版本高于1.3低于1.9则将主包直接升到子包2低于1.9到最大版本，同时对子包1跳版到此版本；若版本高于1.9则两个子包都进行跳版。

子包发版不触发父包发版

父包发版大概率触发子包发版
