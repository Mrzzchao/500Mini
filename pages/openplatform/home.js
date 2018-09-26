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
    let url = ''
    if (app.globalData.isQB) {
      url = this.getQBUrl()
      this.initUrl(url)
    } else {
      url = this.getWechatUrl()
      this.checkLogin(url)
    }
  },
  initUrl(url) {
    console.log(url)
    this.setData({
      url: url
    })
  },
  checkLogin(url) {
    const oldusercheck = this.data.usercheck
    app.checkLogin((data) => {
      const newusercheck = wx.getStorageSync('usercheck')
      if(!oldusercheck || oldusercheck != newusercheck) {
        this.initUrl(url)
      }
      this.setData({ usercheck: newusercheck}) 
    })
  },
  getWechatUrl() {
    const openplatformUrl = 'https://m.500.com/openplatform/?showhead&httpsonly=1&hdflag=true&wxmini'
    const protocal = 'https'
    const domain = 'wx.500.com'
    const params = `skey=${wx.getStorageSync('user_session_key')}&backurl=${encodeURIComponent(openplatformUrl)}`
    return `${protocal}://${domain}/port/wxminiapi/jump.php?${params}&t=${new Date().getTime()}`
  },
  getQBUrl() {
    // const openplatformUrl = 'https://m.500.com'
    const openplatformUrl = 'https://m.500.com/openplatform/?showhead&httpsonly=1&hdflag=true&wxmini'
    // const openplatformUrl = 'http://wx.500boss.com/user/index.php?c=home&a=login&from=&backurl=http%3A%2F%2Fhuodong.500boss.com%2F2018%2Fmrjc%2Ftouch.php%23%2F'

    return openplatformUrl
  }
})