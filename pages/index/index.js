//index.js
//获取应用实例
var app = getApp()
Page({
  data: {

  },
  onLoad: function () {
    this.checkAuth().then((res) => {
      console.log('已经授权')
      this.goKjPage()
    }, (res) => {
      console.log('未授权， 请重新授权')
    }).catch(() => {
      console.log('获取授权信息失败')
    })
  },
  checkAuth() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: (res) => {
          console.log(res.authSetting['scope.userInfo'])
          if (res.authSetting['scope.userInfo']) {
            resolve(res)
          } else {
            reject(res)
          }
        },
        fail: (res) => {
          reject(res)
        }
      })

    })
  },
  userInfoHandler(data) {
    this.checkAuth().then((res) => {
      console.log('已经授权')
      app.globalData.userInfo = data.detail
      this.goKjPage()
    }, (res) => {
      console.log('未授权， 请重新授权')
    }).catch(() => {
      console.log('获取授权信息失败')
      wx.showToast({
        title: '请重新授权',
        icon: 'none'
      })
    })
  },
  goKjPage() {
    wx.switchTab({
      url: '/pages/kaijiang/kaijiang'
    })
  }
})
