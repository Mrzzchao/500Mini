// pages/kaijiang/gaopin/gaopin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectBoxStatus: false,
    day: '',
    dayList: [],
    subPath: '/wechatapp',
    kjPath: '',                                     // 底下Tab小程序开奖地址
    datachartPath: '',                              // 底下Tab小程序走势图地址
    helpPath: '/pages/kaijiang/hot/help/help',      // 底下Tab小程序玩法地址
    zstTitle: ''                                    // 走势图标题
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({day: options.day.slice(0, 10)})
    this.setData({lotname: options.lotname})
    console.log(options)
    wx.setNavigationBarTitle({ title: options.lotchinesename + '详情'})
    this.getGaopinList({
      lotname: options.lotname,
      day: options.day.slice(0, 10)
    })
  },
  getGaopinList({ day, lotname }) {
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.request({
      url: `https://passport.500.com${this.data.subPath}/kaijiang/lotlist?day=${day}&lotname=${lotname}`,
      data: { t: new Date().getTime() },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: (res) => {
        if (res.data.status === '100') {
          this.formatExpect(res.data.data.result)
          this.setData({ gaopinList: res.data.data.result })
          this.setData({ dayList: res.data.data.historydate })
          this.setData({ datachartPath: res.data.data.zoushitu })
          this.setData({zstTitle: res.data.data.zoushitu_title})
        } else {
          console.log(res.message)
        }
        wx.hideLoading()
      },
      fail: (res) => {
        console.log(res.message)
      },
      complete: (res) => { },
    })
  },
  bindPickerChange(e) {
    const day = this.data.dayList[e.detail.value]
    this.setData({day})
    this.getGaopinList({
      day,
      lotname: this.data.lotname
    })
    console.log(e.detail.value)
  },
  toggleSelect(e) {
    const selectBoxStatus = this.data.selectBoxStatus
    this.setData({ selectBoxStatus: !selectBoxStatus})
  },
  selectDay(e) {
    const day = e.currentTarget.dataset.day
    this.setData({day})
    this.getGaopinList({day, lotname: this.data.lotname})
  },
  formatLottery(data) {
    data.opentime = data.opentime.slice(5, 16)
    const strArr = data.opencode.split('|')
    data.opencode = strArr[1] ? (strArr[0] + ',' + strArr[1]) : strArr[0]
  },
  formatExpect(data) {
    data.map((item) => {
      return this.formatLottery(item)
    })
  }
})