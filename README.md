<!-- markdownlint-disable MD033 -->

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
