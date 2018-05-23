// pages/openplatform/home.js
var utilUser = require("../../utils/user.js");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lock: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  onShow() {
    if(!(this.data.lock)) {
      console.log('canuse:',wx.canIUse("switchTab"));
      wx.switchTab({
        url: '/pages/openplatform/home'
      })
      this.setData({lock: true})
    } else {
      wx.switchTab({
        url: '/pages/kaijiang/kaijiang'
      })
      this.setData({ lock: false })
    }
  },

})