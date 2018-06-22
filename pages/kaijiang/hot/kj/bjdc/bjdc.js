// pages/jczq/jczq.js
const app = getApp()
Page({
  data: {
    tab: 'spf',
    kjPath: '',                                     // 底下Tab小程序开奖地址
    datachartPath: '',                              // 底下Tab小程序走势图地址
    helpPath: '/pages/kaijiang/hot/help/help',      // 底下Tab小程序玩法地址
    zstTitle: ''                                    // 走势图标题
  },

  onLoad (options) {
    this.lotId = 9;
    if (options.expect) {
      this.setData({ expect: options.expect });
      this.getOpenInfo();
      this.getBdExpectList();
      this.getBdsfExpectList();
    }
  },

  changeTap (e) {
    if( e.currentTarget.dataset.tab=='sf'){
         this.lotId = 55;
         this.setData({ expect: this.data.sfExpectList[0] }); 
         this.getOpenInfo();
    }else if(this.lotId == 55 ){
        this.lotId = 9;
        this.setData({ expect: this.data.bdExpectList[0] }); 
        this.getOpenInfo();
    }
    
    this.setData({ tab: e.currentTarget.dataset.tab })
  },

  bdPickerChange (e) {
    this.setData({ expect: this.data.bdExpectList[e.detail.value] })
    this.setData({ data: [] })
    this.getOpenInfo();
  },

  sfPickerChange (e) {
    this.setData({ expect: this.data.sfExpectList[e.detail.value] })
    this.setData({ data: [] })
    this.getOpenInfo();
  },

  getOpenInfo() {
    app.utils.Ajax.getHotPrizeDetail({ lotid: this.lotId, expect: this.data.expect}).then((data) => {
      this.setData({ data });
      this.setData({ helpPath: data.helpurl })
    })
  },

  getBdExpectList () {
    app.utils.Ajax.getBdExpectList().then((data) => {
      this.setData({ bdExpectList: data });
    })
  },

  getBdsfExpectList () {
    app.utils.Ajax.getBdsfExpectList().then((data) => {
      this.setData({ sfExpectList: data });
    })
  }
})