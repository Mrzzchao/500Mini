var Ajax = require("../../../../../../utils/ajax.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: 'zixun',
    shahaolist : null,  //杀号内容
    zxlist : null,    //资讯列表
    lastid : '',      //当前页最后一个id
    loadding: '',     //加载文字显示
    isend : false,    //是否加载到最后
    maxsize :20,     //资讯分页数
    aLoading: {
      init: '下拉加载更多',
      start: '加载中...',
      end: '无更多信息'
    },
    isloading : false
  },
  jump: function (event) {
    var dataset = event.currentTarget.dataset,
      url = dataset.url;
    wx.navigateTo({
      url: url
    });
    wx.showLoading({
      title: '数据加载中...'
    })
  },
  getLoadingWords : function (type) {
    this.setData({
      loadding : this.data.aLoading[type]
    });
  },
  loaddingmore: function () {
    if (this.data.isend) {
      return false;
    }
    this.getLoadingWords('start');
    this.getZxList();
  },
  getZxList : function () {
    if (this.data.isloading) {
        //return false;
    }
    this.setData({
      isloading : true
    })
    var _this = this,
      size = this.data.maxsize;
      Ajax.getZixunList('ssq', {
        data: {
          od: 1,
          size: size,
          lastid: _this.data.lastid
        },
        success: function (res) {
          var data = res.data;
          if (data && !data.code) {
            var len = data.length;
            var isend = len < size ? true : false;
            if (len > 0) {
              var zxlist = _this.data.zxlist || [];
              zxlist = zxlist.concat(data);
              _this.setData({
                lastid: data && data[data.length - 1].id,
                zxlist: zxlist,
                isend: isend,
                isloading: false
              });
            }
            _this.getLoadingWords(isend ? 'end' : 'init');
          }
          wx.hideLoading();
        }
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.shahaolist && this.data.zxlist) {
      return false;
    }
      var _this = this;

      wx.showLoading({
        title: '数据加载中...'
      });
      this.getZxList();
      Ajax.getShahaoInfo('ssq', {
        success: function (res) {
          if (res.data && !res.data.code) {
            _this.setData({
              shahaolist: res.data
            })
          }
        }
      });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loaddingmore();
  }
})