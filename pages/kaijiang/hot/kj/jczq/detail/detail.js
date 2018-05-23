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
    // this.initUrl(options.lotname)
    this.checkLogin()
    // wx.setNavigationBarTitle({ title: options.title })
  },
  initUrl(lotname) {
    this.setData({
      url: this.getUrl(lotname)
    })
  },
  checkLogin() {
    const oldusercheck = this.data.usercheck
    app.checkLogin((data) => {
      const newusercheck = wx.getStorageSync('usercheck')
      if (!oldusercheck || oldusercheck != newusercheck) {
        this.setData({
          url: this.getUrl()
        })
      }
      this.setData({ usercheck: newusercheck })
    })
  },
  getUrl() {
    const bfUrl = 'https://live.m.500.com/detail/football/709987/situation?from=app_bet&render=local%3F0_ala_h5qb'
    const domain = 'wx.500.com'
    const params = `skey=${wx.getStorageSync('user_session_key')}&backurl=${encodeURIComponent(bfUrl)}`
    const protocal = 'https'
    console.log(`${protocal}://${domain}/port/wxminiapi/jump.php?${params}&t=${new Date().getTime()}`)
    return `${protocal}://${domain}/port/wxminiapi/jump.php?${params}&t=${new Date().getTime()}`
  }
})