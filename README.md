# 家庭财产管理系统前端

大体上使用MVVM架构

|环境|Apache 2.4.39|
|----|-------------|
|端口号|80|
|数据库|MySQL 8.0.3|


文件夹目录：

```txt
E:.
├─static                                # 静态文件
│  ├─dependence                         # 静态依赖文件
│  │  ├─loginAndRegister                # 登录注册模板静态文件
│  │  │  ├─assets
│  │  │  │  ├─css
│  │  │  │  ├─fonts
│  │  │  │  ├─js
│  │  │  │  │  ├─core
│  │  │  │  │  └─plugins
│  │  │  │  └─sass
│  │  │  │      └─now-ui-kit
│  │  │  │          ├─mixins
│  │  │  │          └─plugins
│  │  │  ├─css
│  │  │  ├─img
│  │  │  │  └─flags
│  │  │  └─js
│  │  ├─reqwest                         # reqwest依赖文件，用来发起Ajax请求
│  │  └─vue                             # Vue依赖文件 用来实现MVVM
│  └─index                              # 自己写的静态文件
│      ├─css
│      ├─image
│      │  └─icon
│      └─js
└─viewModel                             # ViewModel层实现
```

## 框架与资源

* [Vue](https://cn.vuejs.org/v2/guide/)
* [Reqwest](https://www.npmjs.com/package/reqwest)

使用到的前端框架

* [Bootstrop](https://www.bootcss.com/)
* [Diquick](http://www.diquick.com/?type=accordion#/panel)
* [Element](https://element.eleme.cn/#/zh-CN/component/menu)
* [Taro UI](https://taro-ui.aotu.io/#/docs/navbar)

图标

* [iconfont](https://www.iconfont.cn/)
