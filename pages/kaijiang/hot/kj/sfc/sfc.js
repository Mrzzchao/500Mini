
var app = getApp();
Page({
  data:{
    tab:'1',
    historyList:[],
    current_expect:'',
    kjPath: '',                                     // 底下Tab小程序开奖地址
    datachartPath: '',                              // 底下Tab小程序走势图地址
    helpPath: '/pages/kaijiang/hot/help/help',      // 底下Tab小程序玩法地址
    zstTitle: ''                                    // 走势图标题
  },
  onLoad: function (options) {
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
  getHistory:function(){
      var _this = this;
      app.getOpenHistory(1,function(data){
           _this.setData({historyList:data.data});
      })
  },
  getOpenInfo:function(){
    var _this = this;
    app.getOpenInfo(1,function(data){
           if(data.data.curr_expect){
            _this.setData({current_expect:data.data.curr_expect});
           }
      })
  },
  changeTap:function(){
    if(this.data.tab=='1'){
      this.setData({tab:'2'});
    }else{
      this.setData({tab:'1'});
    }
  },
  getPrizeDetail:function(){
      var _this = this;
    app.getPrizeDetail(1,this.data.expect,function(data){
            _this.setData({prize_info:data.data});
           
      })
  },
  showPrize:function(e){
  if(e.currentTarget.dataset.expect){
      this.setData({expect:e.currentTarget.dataset.expect});
      this.getPrizeDetail();
      this.setData({tab:'1'});
    }else{
        this.setData({expect:''});
        this.setData({prize_info:''});
        this.setData({tab:'1'});
    }
  }
})