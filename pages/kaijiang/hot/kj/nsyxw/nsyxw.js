var app = getApp();
Page({
  data:{
    historyList:[],
    kjPath: '',                                     // 底下Tab小程序开奖地址
    datachartPath: '',                              // 底下Tab小程序走势图地址
    helpPath: '/pages/kaijiang/hot/help/help',      // 底下Tab小程序玩法地址
    zstTitle: ''                                    // 走势图标题
  },
  onLoad:function(options){
    this.getHistory();
  },
  getHistory:function(){
      var _this = this;
      app.getOpenHistory(53,function(data){
           _this.setData({historyList:data.data});
           _this.setData({ datachartPath: data.data[0].zoushitu })    // 数组结构放在第一项处理
           _this.setData({ zstTitle: data.data[0].zoushitu_title })
      })
  }
})