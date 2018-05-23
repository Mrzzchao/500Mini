// pages/jczq/jczq.js
Page({
  data: {
    'tab': 'rfsf',
    expectPath: '/pages/kaijiang/hot/kj/jclq/info/info',         // 底下Tab小程序往期结果地址
    detailPath: '/pages/kaijiang/hot/kj/jclq/detail/detail',      // 底下Tab小程序详情页地址
    helpPath: '/pages/kaijiang/hot/help/help',      // 底下Tab小程序玩法地址
  },
  onLoad: function (options) {
    //this.data.tab = 'rfsf';
    options.day = options.day;
    if (options.day) {
      this.setData({ day: options.day });
      this.getOpenInfo();
      this.getDateList();
    }
  },
  changeTap: function (e) {
    this.setData({ tab: e.currentTarget.dataset.tab })
  },
  bindPickerChange: function (e) {
    this.setData({ day: this.data.dateList[e.detail.value] })
    this.setData({ matchList: [] })
    this.getOpenInfo();
  },
  getOpenInfo() {
    var _this = this;
    wx.request({
      url: 'https://passport.500.com/wechatapp/kaijiang/wechatinfo',
      data: { lotid: 47, expect: '', day: this.data.day.replace(/-/g, ''), t: new Date().getTime() },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        _this.setData({ matchList: res.data.data });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  getDateList: function () {
    var _this = this;
    wx.request({
      url: 'https://passport.500.com/wechatapp/kaijiang/datelist',
      data: { t: new Date().getTime() },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        _this.setData({ dateList: res.data.data });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }
})