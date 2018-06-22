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
  onLoad (options) {
    console.log('---------')
    console.log(options)
    this.initUrl(options.lotname)
    // wx.setNavigationBarTitle({ title: options.title })
  },
  initUrl(lotname) {
    console.log(lotname)
    this.setData({
      url: this.getUrl(lotname)
    })
  },
  getUrl(lotname) {
    console.log(lotname)
    const url = `http://m.500.com/lottery/help/${lotname}_help.html?0_ala_h5qb`
    return url
  }
})