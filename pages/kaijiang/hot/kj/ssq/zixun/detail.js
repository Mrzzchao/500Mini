var Ajax = require("../../../../../../utils/ajax.js");
var WxParse = require('../../../../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id : -1,
    shahaolist : null,
    detail : null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.hideLoading();
    this.setData({
      id: options.id
    });
    if(options.id == -2) {
      Ajax.getShahaoInfo('ssq', {
        success : function (res) {
          if(res.data && !res.data.code) {
            _this.setData({
              shahaolist : res.data
            })
          }
        }
      });
    } else {

      Ajax.getArticleDetail('ssq', {
        data : {
          id : options.id
        },
        success: function (res) {
          var data = res.data;
          if (data && !data.code) {
            var article = data['content'];
            WxParse.wxParse('article', 'html', article, _this, 5);
            _this.setData({
              detail : data
            })
          }
        }
      });
    }
  },
  parseHtml : function(htmlBlock) {
    var parser = new DOMParser();
    return parser.parseFromString(htmlBlock, "text/html");
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
  
  }
})