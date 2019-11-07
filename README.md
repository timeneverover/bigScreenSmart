# project

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
#```

#For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

#文件结构
/config/ :配置文件
    config/dev.env.js   开发环境服务端请求路径配置
    config/prod.env.js  生成环境服务端请求路径配置
    config/index.js     配置运行端口号

/dist/ :npm run build之后生成的文件，给后端使用

/src/assets :静态文件img
/src/components :vue组件文件
/src/css :css文件
/src/pages :.vue页面文件
/src/publicService :js文件
    src/publicService/urls.js          请求的后台地址
    src/publicService/HttpService.js   axios请求封装
/src/router :路由配置
/src/store :全局变量存储和操作
    /src/store/index.js :全局变量初始化
    /src.store/mutations-types.js :全局变量操作声明
    /src/store/mutations.js :全局变量操作实现
    /src/store/actions.js :方法声明，在vue页面中调用

+提示窗口使用：
this.tips.open('error/success','message');
