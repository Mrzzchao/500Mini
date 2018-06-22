// pages/kaijiang/gaopin/gaopin.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectBoxStatus: false,
    day: '',
    dayList: [],
    kjPath: '',                                     // 底下Tab小程序开奖地址
    datachartPath: '',                              // 底下Tab小程序走势图地址
    helpPath: '/pages/kaijiang/gaopin/help/help',      // 底下Tab小程序玩法地址
    zstTitle: ''                                    // 走势图标题
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.init(options)
  },

  init(options) {
    const day = options.day.slice(0, 10)

    this.setData({day})
    this.setData({ lotname: options.lotname })
    console.log(options)
    this.getGaopinList({
      day,
      lotname: options.lotname
    })

    wx.setNavigationBarTitle({ title: options.lotchinesename + '详情' })
  },

  getGaopinList({ day, lotname }) {
    app.utils.Ajax.getGaopinList({ day, lotname }).then((data) => {
      this.formatExpect(data.result)
      this.setData({ gaopinList: data.result })
      this.setData({ dayList: data.historydate })
      this.setData({ datachartPath: data.zoushitu })
      this.setData({ zstTitle: data.zoushitu_title })
    })
  },

  bindPickerChange(e) {
    const day = this.data.dayList[e.detail.value]
    this.setData({day})
    this.getGaopinList({
      day,
      lotname: this.data.lotname
    })
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
    const strArr = data.opencode.split('|')
    data.opentime = data.opentime.slice(5, 16)
    data.opencode = strArr[1] ? (strArr[0] + ',' + strArr[1]) : strArr[0]
  },

  formatExpect(data) {
    data.map((item) => {
      return this.formatLottery(item)
    })
  }
})