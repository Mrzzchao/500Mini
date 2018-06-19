
var app = getApp();
Page({
  data: {
    tab: '1',
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
    app.utils.Ajax.getLocalDetail({ expect, lotname }).then((data) => {
      this.formatLottery(data)
      this.formatExpect(data.historyexpect)
      this.setData({ localDetail: data })
      this.setData({ historyList: data.historyexpect })
      this.setData({ datachartPath: data.zoushitu })
      this.setData({ zstTitle: data.zoushitu_title })
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