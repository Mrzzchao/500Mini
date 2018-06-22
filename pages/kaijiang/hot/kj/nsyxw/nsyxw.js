var app = getApp();
Page({
  data:{
    historyList:[],
    kjPath: '',                                     // 底下Tab小程序开奖地址
    datachartPath: '',                              // 底下Tab小程序走势图地址
    helpPath: '/pages/kaijiang/hot/help/help',      // 底下Tab小程序玩法地址
    zstTitle: ''                                    // 走势图标题
  },
  onLoad(options){
    this.getHistory();
  },

  getHistory() {
    app.utils.Ajax.getHotHistory(53).then((data) => {
      this.setData({ historyList: data });
      this.setData({ datachartPath: data[0].zoushitu })    // 数组结构放在第一项处理
      this.setData({ zstTitle: data[0].zoushitu_title })
      this.setData({ helpPath: data[0].helpurl })
    })
  }
})