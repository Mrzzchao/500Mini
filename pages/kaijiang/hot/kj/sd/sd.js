
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

  onLoad(options) {
    this.init(options)
    if (options.expect) {
      this.setData({ expect: options.expect });
      this.getPrizeDetail();
    }
    this.getHistory();
    this.getOpenInfo();
  },

  init(options) {
    const tab = options.tab || '1'
    this.setData({
      tab: tab
    })
  },

  getHistory() {
    app.utils.Ajax.getHotHistory(7).then((data) => {
      this.setData({ historyList: data });
    })
  },

  getOpenInfo() {
    app.utils.Ajax.getHotInfo(7).then((data) => {
      if (data.curr_expect) {
        this.setData({ current_expect: data.curr_expect });
      }
    })
  },

  getPrizeDetail() {
    app.utils.Ajax.getHotPrizeDetail({ lotid: 7, expect: this.data.expect }).then((data) => {
      if (data && data.result) {
        data['fore'] = data.result.split(',');
      }
      this.setData({ prize_info: data });
      this.setData({ datachartPath: data.zoushitu })
      this.setData({ zstTitle: data.zoushitu_title })
    })
  },

  changeTap() {
    if (this.data.tab == '1') {
      this.setData({ tab: '2' });
    } else {
      this.setData({ tab: '1' });
    }
  },

  showPrize(e) {
    if (e.currentTarget.dataset.expect) {
      this.setData({ expect: e.currentTarget.dataset.expect });
      this.getPrizeDetail();
      this.setData({ tab: '1' });
    } else {
      this.setData({ expect: '' });
      this.setData({ prize_info: '' });
      this.setData({ tab: '1' });
    }
  }
})