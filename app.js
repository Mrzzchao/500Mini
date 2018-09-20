//app.js
var utilUser = require("./utils/user.js");
const Ajax = require("./controls/ajax.js")
App({
  onLaunch: function () {
    this.getUserInfo();
  },
  getUserInfo:function(cb){
    console.log('==========')
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      utilUser.checkLogin(function (res) {
        that.globalData.userInfo = res.userInfo;
        typeof cb == "function" && cb(that.globalData.userInfo)
      });
    }
  },
  checkLogin(cb) {
    const that = this
    utilUser.checkLogin(function (res) {
      that.globalData.userInfo = res.userInfo;
      typeof cb == "function" && cb(that.globalData.userInfo)
    });
  },
  globalData: {
    rechecktimes : 0,
    userInfo:null,
    isQB: wx.getSystemInfoSync().isQB
  },
  utils: {
    Ajax: Ajax
  },
  getOpenHistory:function(lotId,callBack){
    wx.request({
      url: 'https://passport.500.com/wechatapp/kaijiang/history',
      data: {lotid:lotId,t:new Date().getTime()},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header:{
         'content-type':'application/x-www-form-urlencoded',
         'Content-type':'application/x-www-form-urlencoded'
      },
      success: function(res){
        typeof callBack == "function" && callBack(res.data);
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
    getOpenInfo:function(lotId,callBack){
    wx.request({
      url: 'https://passport.500.com/wechatapp/kaijiang/wechat',
      data: {lotid:lotId,t:new Date().getTime()},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header:{
         'content-type':'application/x-www-form-urlencoded',
         'Content-type':'application/x-www-form-urlencoded'
      },
      success: function(res){
        typeof callBack == "function" && callBack(res.data);
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  getPrizeDetail:function(lotId,expect,callBack){
     wx.request({
       url: 'https://passport.500.com/wechatapp/kaijiang/wechatinfo',
      data: {lotid:lotId,expect:expect,t:new Date().getTime()},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header:{
         'content-type':'application/x-www-form-urlencoded',
         'Content-type':'application/x-www-form-urlencoded'
      },
      success: function(res){
        typeof callBack == "function" && callBack(res.data);
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })   
  }
})