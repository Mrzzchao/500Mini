// pages/openplatform/home.js
var utilUser = require("../../utils/user.js");
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
  onShow() {
    this.checkLogin()
    console.log('onShow')
  },
  initUrl() {
    this.setData({
      url: this.getUrl()
    })
  },
  checkLogin() {
    const oldusercheck = this.data.usercheck
    app.checkLogin((data) => {
      const newusercheck = wx.getStorageSync('usercheck')
      if(!oldusercheck || oldusercheck != newusercheck) {
        this.setData({
          url: this.getUrl()
        })
      }
      this.setData({ usercheck: newusercheck}) 
    })
  },
  getUrl() {
    const openplatformUrl = 'https://m.500.com/openplatform/?showhead&httpsonly=1&hdflag=true&wxmini'
    const domain = 'wx.500.com'
    const params = `skey=${wx.getStorageSync('user_session_key')}&backurl=${encodeURIComponent(openplatformUrl)}`
    const protocal = 'https'
    return `${protocal}://${domain}/port/wxminiapi/jump.php?${params}&t=${new Date().getTime()}`
  }
})