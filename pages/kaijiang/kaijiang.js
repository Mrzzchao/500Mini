
var app = getApp()
Page({
  data: {
    tab: 'quanguo',
    subPath: '/wechatapp',     // 为了测试
    collapStatus: {},     // 展开状态列表
    provList: {},         // 省份列表
    provLottery: {}      // 省份彩种列表

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getQuanguoLottery()
  },
  onLoad: function () {
    this.weekList = ["日", "一", "二", "三", "四", "五", "六"];
    this.lottery = { 28: 'dlt', 3: 'ssq', 4: 'qxc', 5: 'pls', 7: 'sd', 11: 'qlc', 10001: 'plw', 45: 'xyxw', 53: 'nxyxw', 1: 'sfc', 15: 'zc6', 17: 'jq4', 46: 'jczq', 47: 'jclq', 9: 'bjdc' };
    this.setData({ 'lottery': this.lottery });
    this.setData({ 'current_date': new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + '星期' + this.weekList[new Date().getDay()]});
    this.setData({ 'current_week': '星期' + this.weekList[new Date().getDay()] });
    this.lotIdList = [4, 11, 5, 7, 10001, 45, 53, 1, 15, 17, 46, 47, 9];
  },
  changeTab: function(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ tab: tab})
    this.clearTab()
    switch(tab) {
      case 'local': this.getProvList(1); break;
      case 'gaopin': this.getProvList(2); break;
      default: break;
    }
  },
  collap: function(e) {
    var idx = e.currentTarget.dataset.idx
    var provId = e.currentTarget.dataset.provid
    var type = e.currentTarget.dataset.type
    var collapStatus = this.data.collapStatus

    collapStatus[idx] = !collapStatus[idx]
    this.setData({collapStatus: collapStatus})
    if(collapStatus[idx]) {
      this.getProvLottery(type, provId)
    }
  },
  clearTab() {
    this.setData({ collapStatus: {}})
    // this.setData({ provList: []})
    // this.setData({ provLottery: {}})
  },
  getQuanguoLottery() {
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.request({
      url: `https://passport.500.com${this.data.subPath}/kaijiang/quanguo`,
      data: { t: new Date().getTime() },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: (res) => {
        let list = res.data.data
        Object.keys(list).forEach((key) => {
          this.formatQuanguo(list[key])
        })
        this.setData(list)
        wx.hideLoading()
      },
      fail: (res) => {
        console.log(res.message)
      },
      complete: (res) => { },
    })
  },
  // 获取省份列表
  getProvList(type) {
    wx.showLoading({
      title: '数据加载中...',
    })
    let provList = this.data.provList
    wx.request({
      url: `https://passport.500.com${this.data.subPath}/kaijiang/province?type=${type}`,
      data: {t: new Date().getTime()},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: (res) => {
        if(res.data.status === '100') {
          provList[type] = res.data.data
          this.setData({provList})
        } else {
          console.log(res.message)
        }
        wx.hideLoading()
      },
      fail: (res) => {
        console.log(res.message)
      },
      complete: (res) => {},
    })
  },
  // 获取省份彩种
  getProvLottery(type, id) {
    wx.showLoading({
      title: '数据加载中...',
    })
    let provLottery = this.data.provLottery
    wx.request({
      url: `https://passport.500.com${this.data.subPath}/kaijiang/lotprov?type=${type}&id=${id}`,
      data: { t: new Date().getTime() },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: (res) => {
        if (res.data.status === '100') {
          this.formatLocal(res.data.data)
          if(provLottery[type]) {
            provLottery[type][id] = res.data.data
          } else {
            provLottery[type] = {}
            provLottery[type][id] = res.data.data
          }
          this.setData({ provLottery: provLottery})
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
  // 格式化地方彩种接口
  formatLocal(data) {
    const weekList = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    const regKlpk = /klpk/
    data.map((item) => {
      if(regKlpk.test(item.lotname)) {
        item.rectClass = true
      }
      const strArr = item.opencode.split('|')
      item.fore = strArr[0].split(',')
      item.back = strArr[1] ? strArr[1].split(',') : []
      item.weekDay = weekList[new Date(item.opentime).getDay()]
    })
  },
  // 格式化全国彩种接口
  formatQuanguo(data) {
    const weekList = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    try {
      if (data.opencode) {
        if (data.opencode.indexOf('|') > -1) {
          var str = data.opencode.split('|');
          data['fore'] = str[0].split(',');
          data['back'] = str[1].split(',');
        } else {
          data.opencode = data.opencode.split(',')
        }
      }
      if (data.result_time || data.date) {
        data.result_time = data.result_time || data.date;
        data.result_time = data.result_time.substring(0, 10);
        data.weekDay = weekList[new Date(data.result_time).getDay()]
        data.result_time2 = data.result_time + ' ' + data.weekDay
      } else {
        data.opentime = data.opentime
        data.opentime = data.opentime.substring(0, 10);
        data.weekDay = weekList[new Date(data.opentime).getDay()]
        data.result_time2 = data.opentime + ' ' + data.weekDay
      }
    } catch (e) {
    }
  }
})
