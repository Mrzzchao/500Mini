var app = getApp()
Page({
  data: {
    tab: 'quanguo',
    collapStatus: {},     // 展开状态列表
    provList: {},         // 省份列表
    provLottery: {}       // 省份彩种列表
  },
  onShow() {
    this.getQuanguo()
  },
  onLoad() {
    this.init()
  },

  init() {
    const weekList = ["日", "一", "二", "三", "四", "五", "六"];
    this.setData({ 'current_date': new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + '星期' + weekList[new Date().getDay()] });
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
  collap(e) {
    const idx = e.currentTarget.dataset.idx
    const provId = e.currentTarget.dataset.provid
    const type = e.currentTarget.dataset.type
    const collapStatus = this.data.collapStatus

    collapStatus[idx] = !collapStatus[idx]
    this.setData({collapStatus: collapStatus})
    if(collapStatus[idx]) {
      this.getProvLottery(type, provId)
    }
  },
  
  clearTab() {
    this.setData({ collapStatus: {}})
  },

  // 获得全国彩种
  getQuanguo() {
    app.utils.Ajax.getQuanguo().then((data) => {
      const list = this.formatQuanguo(data)
      this.setData(list)
    })
  },
  
  // 获取省份列表
  getProvList(type) {
    app.utils.Ajax.getProvList(type).then((data) => {
      this.setData({ provList:  data})
    })
  },

  // 获取省份彩种
  getProvLottery(type, id) {
    app.utils.Ajax.getProvLottery(type, id).then((data) => {
      data = this.formatLocal(data)
      let provLottery = this.data.provLottery

      provLottery[id] = data
      this.setData({ provLottery: provLottery})
    })
  },

  // 格式化地方彩种接口
  formatLocal(data) {
    const weekList = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    const regKlpk = /klpk/
    data.forEach((item) => {
      if(regKlpk.test(item.lotname)) {  // 特殊化处理快乐扑克
        item.rectClass = true
      }
      const strArr = item.opencode.split('|')
      item.fore = strArr[0].split(',')
      item.back = strArr[1] ? strArr[1].split(',') : []
      item.weekDay = weekList[new Date(item.opentime).getDay()]
    })
    return data
  },

  // 格式化全国彩种接口
  formatQuanguo(list) {
    const weekList = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

    Object.keys(list).forEach((key) => {
      let data = list[key]
      if (data.opencode) {
        if (~data.opencode.indexOf('|')) {
          const str = data.opencode.split('|');
          data['fore'] = str[0].split(',');
          data['back'] = str[1].split(',');
        } else {
          data.opencode = data.opencode.split(',')
        }
      }
      let time = ''
      if (data.result_time || data.date) {
        time = data.result_time || data.date;
      } else {
        time = data.opentime || ''
      } 
      time = time.substring(0, 10);
      data.weekDay = weekList[new Date(time).getDay()]
      data.result_time = time
      data.result_time2 = time + ' ' + data.weekDay
    })

    return list
  }
})
