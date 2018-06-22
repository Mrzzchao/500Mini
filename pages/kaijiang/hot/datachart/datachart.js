// pages/openplatform/home.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    usercheck: '',
    canIUse: wx.canIUse('web-view')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initUrl(options.lotname)
    // wx.setNavigationBarTitle({ title: options.title })
  },
  initUrl(lotname) {
    this.setData({
      url: this.getUrl(lotname)
    })
  },
  getUrl(lotname) {
    const url = `https://m.500.com/datachart/${lotname}/`
    return url
  }
})