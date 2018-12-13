# 500彩票 微信小程序与QB小程序


## 资源
[微信开发文档][1]   https://developers.weixin.qq.com/miniprogram/introduction/
[QB小程序开发文档][3]  https://softimtt.myapp.com/browser/weapp/doc_html/index.html
[后台管理][2]  https://mp.weixin.qq.com/

Git仓库 git@10.0.1.115:wechat/500lottery.git


## 目录设计
```
├── asserts ------------------------------- 静态资源目录
│   ├── images ---------------------------- 图片 css background相关图片
│   ├── style ----------------------------- 样式 暂无使用
├── common -------------------------------- 公共JS
│   ├── baiduMap.js ----------------------- 百度地图 地方彩 高频彩中使用
│   ├── constants.js ---------------------- 全局公共变量 彩种信息
│   ├── util.js --------------------------- 工具类方法 彩种接口格式化
│   ├── constants.js ---------------------- 全局公共变量 彩种信息
│   ├── wxFunc.js ------------------------- 小程序原生接口promise封装
├── components ---------------------------- 全局公共组件 暂无使用
├── config -------------------------------- 全局配置
│   ├── api.js ---------------------------- 后台接口地址 易于域名切换
├── controls ------------------------------ 小程序控制器
│   ├── ajax.js --------------------------- 数据请求接口封装
├── pages --------------------------------- 小程序页面目录
│   ├── index ----------------------------- 授权页
│   ├── openplatform ---------------------- 大神推单页 H5
│   ├── kaijiang -------------------------- 开奖目录
│   │   ├── hot --------------------------- 全国彩
│   │   │   ├── detail -------------------- 竞彩比分页 H5
│   │   │   ├── datachart ----------------- 走势图 H5
│   │   │   ├── help ---------------------- 玩法页 H5
│   │   │   ├── kj ------------------------ 彩种详情页 期号页
│   │   ├── local ------------------------- 地方彩 
│   │   ├── gaopin ------------------------ 高频彩
│   │   ├── kaijiang.js ------------------- 首页
│   ├── wxpay ----------------------------- 小程序支付中间跳转页
├── statics ------------------------------- 静态资源
├── utils --------------------------------- 工具类
│   ├── ajax.js --------------------------- 首页 双色球 登录相关
│   ├── config.js ------------------------- 登录配置
│   ├── user.js --------------------------- 小程序登录
│   ├── util.js --------------------------- 工具类
│   ├── wxFunc.js ------------------------- 微信原生接口promise封装
├── wxParse ------------------------------- 富文本解析器 双色球使用
├── .gitignore ---------------------------- git管理过滤器
├── app.js -------------------------------- 小程序入口文件 做公共数据入口
├── app.json ------------------------------ 小程序配置文件
├── app.wxss ------------------------------ 小程序公共样式文件 全部样式都在这
├── project.config.json ------------------- 项目配置文件
├── README.md ----------------------------- 项目说明
```

## 接口
```
// 全国彩
"https://ews.500.com/xcxkj/kaijiang/quanguo"  
"https://ews.500.com/xcxkj/kaijiang/wechat"
"https://ews.500.com/xcxkj/kaijiang/history"
"https://ews.500.com/xcxkj/kaijiang/wechatinfo"
"https://ews.500.com/xcxkj/kaijiang/lotinfo"
// 双色球
"https://open.500.com/api/index.php"
// 竞彩
"https://ews.500.com/xcxkj/kaijiang/wechatinfo"
"https://ews.500.com/xcxkj/kaijiang/datelist"

// 北单
"https://ews.500.com/xcxkj/kaijiang/bdexpectlist"
"https://ews.500.com/xcxkj/kaijiang/bdsfexpectlist"


// 地方彩 期号 详情页接口
"https://ews.500.com/xcxkj/kaijiang/lotinfo"

// 高频彩 详情页接口
"https://ews.500.com/xcxkj/kaijiang/lotlist"

// 地方彩-高频彩 省份彩种接口
"https://ews.500.com/xcxkj/kaijiang/province"
"https://ews.500.com/xcxkj/kaijiang/lotprov"

// 评论接口
"https://ews.500.com/cmt/supply/commentlist"


// 联合登陆接口
"https://wx.500.com/port/wxminiapi/auth.php"
"https://wx.500.com/port/wxminiapi/login.php"
```


## 建议
QB小程序，微信小程序都可以参考该项目模式进行重构，重构成本为把所有文件后缀改成wxml和一些登录支付的修改


  [1]: https://developers.weixin.qq.com/miniprogram/introduction/
  [2]: https://mp.weixin.qq.com/
  [3]: https://softimtt.myapp.com/browser/weapp/doc_html/index.html