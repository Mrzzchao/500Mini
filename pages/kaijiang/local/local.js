
var app = getApp();
Page({
  data: {
    tab: '1',
    subPath: '/wechatapp',
    historyList: [],
    current_expect: '',
    kjPath: '',                                     // 底下Tab小程序开奖地址
    datachartPath: '',                              // 底下Tab小程序走势图地址
    helpPath: '/pages/kaijiang/hot/help/help',      // 底下Tab小程序玩法地址
    zstTitle: ''                                    // 走势图标题
  },
  onLoad: function (options) {
    this.init(options)
    this.setData({lotname: options.lotname})
    this.getLocalDetail(options)
  },
  init(options) {
    const tab = options.tab || '1'
    this.setData({ lotname: options.lotname })
    this.setData({
      tab: tab
    })
    wx.setNavigationBarTitle({ title: options.lotchinesename + '详情' })
  },
  changeTap: function () {
    if (this.data.tab == '1') {
      this.setData({ tab: '2' });
    } else {
      this.setData({ tab: '1' });
    }
  },
  getLocalDetail({expect, lotname}) {
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.request({
      url: `https://passport.500.com${this.data.subPath}/kaijiang/lotinfo?expect=${expect}&lotname=${lotname}`,
      data: { t: new Date().getTime() },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: (res) => {
        if (res.data.status === '100') {
          this.formatLottery(res.data.data)
          this.formatExpect(res.data.data.historyexpect)
          this.setData({ localDetail: res.data.data })
          this.setData({ historyList: res.data.data.historyexpect})
          this.setData({datachartPath: res.data.data.zoushitu})
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
  showPrize(e) {
    const expect = e.currentTarget.dataset.expect
    if (expect) {
      this.setData({ expect: expect });
      this.getLocalDetail({expect: expect, lotname: this.data.lotname});
      this.setData({ tab: '1' });
    } else {
      this.setData({ expect: '' });
      this.setData({ historyList: ''});
      this.setData({ tab: '1' });
    }
  },
  formatLottery(data) {
    const weekList = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    const strArr = data.opencode.split('|')
    const date = data.opentime.split(' ')[0]
    data.fore = strArr[0].split(',')
    data.back = strArr[1] ? strArr[1].split(',') : []
    data.weekDay = weekList[new Date(date).getDay()]
    data.resulttime = date + ' ' + data.weekDay
  },
  formatExpect(data) {
    data.map((item) => {
      return this.formatLottery(item)
    })
  }
})