// pages/openplatform/home.js
var utilUser = require("../../utils/user.js");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lock: false,
    url: '',
    usercheck: '',
    canIUse: wx.canIUse('web-view')
  },
  onShow() {
    if (app.globalData.isQB) {
      this.QBHandler()
    } else {
      this.weChatHandler()
    }
  },

  weChatHandler() {
    if (!(this.data.lock)) {
      console.log('canuse:', wx.canIUse("switchTab"));
      wx.switchTab({
        url: '/pages/openplatform/home'
      })
      this.setData({ lock: true })
    } else {
      wx.switchTab({
        url: '/pages/kaijiang/kaijiang'
      })
      this.setData({ lock: false })
    }
  },

  QBHandler() {
    this.initUrl()
  },

  initUrl() {
    this.setData({
      url: this.getUrl()
    })
  },

  getUrl() {
    const openplatformUrl = 'https://m.500.com/openplatform/?showhead&httpsonly=1&hdflag=true&wxmini'
    const domain = 'wx.500.com'
    const params = `c=home&a=login&from=&backurl=${encodeURIComponent(openplatformUrl)}`
    const protocal = 'https'
    console.log(`${protocal}://${domain}/user/index.php?${params}&t=${new Date().getTime()}`)
    return `${protocal}://${domain}/user/index.php?${params}&t=${new Date().getTime()}`
  }
})