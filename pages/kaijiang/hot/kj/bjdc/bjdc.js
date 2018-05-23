// pages/jczq/jczq.js
Page({
  data: {
    'tab': 'spf',
    kjPath: '',                                     // 底下Tab小程序开奖地址
    datachartPath: '',                              // 底下Tab小程序走势图地址
    helpPath: '/pages/kaijiang/hot/help/help',      // 底下Tab小程序玩法地址
    zstTitle: ''                                    // 走势图标题
  },
  onLoad: function (options) {
    this.lotId = 9;
    //this.data.tab = 'spf';
    options.expect = options.expect;
    if (options.expect) {
      this.setData({ expect: options.expect });
      this.getOpenInfo();
      this.getBdExpectList();
      this.getBdsfExpectList();
    }
  },
  changeTap: function (e) {
    if( e.currentTarget.dataset.tab=='sf'){
         this.lotId = 55;
         this.setData({ expect: this.data.sfExpectList[0] }); 
         this.getOpenInfo();
    }else if(this.lotId ==55 ){
        this.lotId = 9;
        this.setData({ expect: this.data.bdExpectList[0] }); 
        this.getOpenInfo();
    }
    
    this.setData({ tab: e.currentTarget.dataset.tab })
  },
  bdPickerChange: function (e) {
    this.setData({ expect: this.data.bdExpectList[e.detail.value] })
    this.setData({ data: [] })
    this.getOpenInfo();
  },
  sfPickerChange: function (e) {
    this.setData({ expect: this.data.sfExpectList[e.detail.value] })
    this.setData({ data: [] })
    this.getOpenInfo();
  },
  getOpenInfo() {
    var _this = this;
    wx.request({
      url: 'https://passport.500.com/wechatapp/kaijiang/wechatinfo',
      data: { lotid: this.lotId, expect: this.data.expect, t: new Date().getTime() },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        _this.setData({ data: res.data.data });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  getBdExpectList: function () {
    var _this = this;
    wx.request({
      url: 'https://passport.500.com/wechatapp/kaijiang/bdexpectlist',
      data: { t: new Date().getTime() },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        _this.setData({ bdExpectList: res.data.data });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  getBdsfExpectList: function () {
    var _this = this;
    wx.request({
      url: 'https://passport.500.com/wechatapp/kaijiang/bdsfexpectlist',
      data: { t: new Date().getTime() },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        _this.setData({ sfExpectList: res.data.data });
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