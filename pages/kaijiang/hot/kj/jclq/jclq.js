// pages/jczq/jczq.js
const app = getApp()
Page({
  data: {
    tab: 'rfsf',
    expectPath: '/pages/kaijiang/hot/kj/jclq/info/info',         // 底下Tab小程序往期结果地址
    detailPath: '/pages/kaijiang/hot/kj/jclq/detail/detail',      // 底下Tab小程序详情页地址
    helpPath: '/pages/kaijiang/hot/help/help',      // 底下Tab小程序玩法地址
  },

  onLoad(options) {
    if (options.day) {
      this.setData({ day: options.day });
      this.getOpenInfo();
      this.getDateList();
    }
  },
  
  changeTap(e) {
    this.setData({ tab: e.currentTarget.dataset.tab })
  },

  bindPickerChange(e) {
    this.setData({ day: this.data.dateList[e.detail.value] })
    this.setData({ matchList: [] })
    this.getOpenInfo();
  },

  getOpenInfo() {
    app.utils.Ajax.getJcPrizeDetail({ lotid: 47, expect: '', day: this.data.day.replace(/-/g, '') }).then((data) => {
      this.setData({ matchList: data });
    })
  },

  getDateList() {
    app.utils.Ajax.getJcHistory().then((data) => {
      this.setData({ dateList: data });
    })
  }
})