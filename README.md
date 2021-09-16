
# VUE-ADMIN-TEMPLATE
tens

# vue-admin-template

> A minimal vue admin template with Element UI & axios & iconfont & permission control & lint

**Live demo:** http://panjiachen.github.io/vue-admin-template

[中文文档](https://github.com/PanJiaChen/vue-admin-template/blob/master/README-zh.md)

## Build Setup

```bash
# Clone project
git clone https://github.com/PanJiaChen/vue-admin-template.git

# Install dependencies
npm install

# Serve with hot reload at localhost:9528
npm run dev

# Build for production with minification
npm run build

# Build for production and view the bundle analyzer report
npm run build --report
```

## Demo

![demo](https://github.com/PanJiaChen/PanJiaChen.github.io/blob/master/images/demo.gif)

## Extra

If you want router permission && generate menu by user roles , you can use this branch [permission-control](https://github.com/PanJiaChen/vue-admin-template/tree/permission-control)

This project is based on `webpack4` development. If you want to use `webpack3` development, please use this branch [webpack3](https://github.com/PanJiaChen/vue-admin-template/tree/webpack3)

## Related Project

[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

[electron-vue-admin](https://github.com/PanJiaChen/electron-vue-admin)

### Element-Ui using cdn tutorial

First find `index.html`([root directory](https://github.com/PanJiaChen/vue-admin-template/blob/element-ui-cdn/index.html))

Import css and js of `Element`, and then import vue. Because `Element` is vue-dependent, vue must be import before it.

Then find [webpack.base.conf.js](https://github.com/PanJiaChen/vue-admin-template/blob/element-ui-cdn/build/webpack.base.conf.js)
Add `externals` to make webpack not package vue and element.

```
externals: {
  vue: 'Vue',
  'element-ui':'ELEMENT'
}
```

Finally there is a small detail to pay attention to that if you import vue in global, you don't need to manually `Vue.use(Vuex)`, it will be automatically mounted, see
[issue](https://github.com/vuejs/vuex/issues/731)

And you can use `npm run build --report` to see the effect

Pictured:
![demo](https://panjiachen.github.io/images/element-cdn.png)

**[Detailed code](https://github.com/PanJiaChen/vue-admin-template/commit/746aff560932704ae821f82f10b8b2a9681d5177)**

**[Branch](https://github.com/PanJiaChen/vue-admin-template/tree/element-ui-cdn)**

## License

[MIT](https://github.com/PanJiaChen/vue-admin-template/blob/master/LICENSE) license.

Copyright (c) 2017-present PanJiaChen


# 1-3 第1 2节
经常用的
  src下的
    api
    views
要修改的一般就是
  config目录下的js
  以及路由，在src下的router目录

### 取消eslint的代码检查
  主要是规则提示太多，直接关掉
    在config目录下的index.js文件中设置
    useEslint: false

## 国际化设置
打开src下的main.js 找到这句代码
```js
import locale from 'element‐ui/lib/locale/lang/en'
```

将en修改为zn-CN
```js
import locale from 'element‐ui/lib/locale/lang/zh‐CN'
```
修改后组件都是按照中文的习惯展示

## 配置 Easy mock BASE_API


## 启动
cnpm install
npm run dev

### 如果报sass的错误
Error: Node Sass does not yet support your current environment: Windows 64-bit
解决方法(更新)
```bash
cnpm i node-sass -D
```

## 使用模拟数据
dev.env.js 中设置BASE_API:

## 登录
src/api/login.js


