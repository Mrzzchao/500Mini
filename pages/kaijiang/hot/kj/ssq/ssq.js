
var app = getApp();
Page({
  data:{
    tab:'1',
    historyList:[],
    current_expect:''
  },
  onLoad:function(options){
    if(options.expect){
     this.setData({expect:options.expect});
     this.getPrizeDetail();
    }
    this.getHistory();
    this.getOpenInfo();
  },
  getHistory:function(){
      var _this = this;
      app.getOpenHistory(3,function(data){
           _this.setData({historyList:data.data});
      })
  },
  getOpenInfo:function(){
    var _this = this;
    app.getOpenInfo(3,function(data){
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
    app.getPrizeDetail(3,this.data.expect,function(data){
            if(data.data&&data.data.redresult){
               data.data['fore']  = data.data.redresult.split(',');
             }       
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