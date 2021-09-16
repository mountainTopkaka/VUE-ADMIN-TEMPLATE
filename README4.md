# 第四章路由
路由就是地址映射

vue-router

cnpm install -g vue-cli
或者cnpm install -g @vue/cli


## 路径
在src目录下的 main.js 里引入了 router
在src目录下的 router目录里 index.js配置了各个路由的对应 path (访问方式)  和 component(vue界面)

## 静态路由
path: '/list',

## 动态路由
### 动态路由可以传递几个参数
通过冒号表示传递参数id
 path: '/item/:id',
