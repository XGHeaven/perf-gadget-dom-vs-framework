# 飞书 DOM 接口性能测试

# TODO 项目测试

- 测试源码 `/todo/vue-src`
- 测试静态资源 `/todo/assets`

## 准备

- 准备 Taro 环境 `cd todo/taro-vue && pnpm install`
- 准备飞书 DOM 环境 `cd todo/dom && pnpm install`
- 准备各个环境下的 appid，填写入对应 taro 应用的配置内

## 测试命令

- `taro-wx`
  - `cd todo/taro-vue && pnpm run copy && pnpm run build:weapp`
  - 使用微信开发者工具打开 todo/taro-vue/dist 目录
- `taro-alipay`
  - `cd todo/taro-vue && pnpm run copy && pnpm run build:alipay`
  - 使用支付宝开发者工具 todo/taro-vue/dist 目录
- `taro-lark`
  - `cd todo/taro-vue && pnpm run copy && pnpm run build:tt`
  - 使用飞书开发者工具 todo/taro-vue/dist 目录
- `taro-tt`
  - `cd todo/taro-vue && pnpm run copy && pnpm run build:tt`
  - 使用飞书开发者工具 todo/taro-vue/dist 目录
- `dom-lark`
  - `cd todo/dom && pnpm run build && pnpm run copy`
  - 使用飞书开发者工具打开 todo/dom/gadget 目录
