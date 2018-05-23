var Ajax = require("../../../../../../utils/ajax.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    redball : {},
    blueball:{},
    expect : '',
    issearch : false,
    opensearch : null,
    aExpect : [],
    index : 0
  },
  bindPickerChange : function (e) {
    var index = e.detail.value;
    this.setData({
      index: index,
      expect : this.data.aExpect[index]
    })
  },
  research: function () {
    this.resetball();
    this.setData({ 
      issearch: false
    });
  },
  resetball : function () {
    var redball = {}, blueball = {};
    for (var i = 1; i <= 33; i++) {
      var ii = i < 10 ? '0' + i : i;
      redball[i] = {sindex : ii, index: i, ischeck: false };
      if (i < 17) {
        blueball[i] = {sindex : ii,  index: i, ischeck: false };
      }
    }
    this.setData({
      redball: redball,
      blueball: blueball,
      opensearch : null
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideLoading();
    this.resetball();
    this.setData({
      expect: options.expect
    });
    var aExpect = [],
        index = 0;
    app.globalData.openList.forEach(function(v, i){
      aExpect.push(v['expect']);
      if (v['expect'] == options.expect){
        index = i;
      }
    });
    if (aExpect.length > 0){
      this.setData({
        index: index,
        aExpect: aExpect
      })
    }
  },
  clickball : function (event) {
    var dataset = event.target.dataset,
        type = dataset.type,
        index = dataset.index;
    if (type == 'red') {
      this.data.redball[index]['ischeck'] = !this.data.redball[index]['ischeck'];
      this.setData({
        redball: this.data.redball
      });
    } else {
      this.data.blueball[index]['ischeck'] = !this.data.blueball[index]['ischeck'];
      this.setData({
        blueball: this.data.blueball
      });
    }
  },
  getSsqSelect : function () {
    var aRedball = [], aBlueball = [],
        redball = this.data.redball,
        blueball = this.data.blueball;
    for (var i = 1; i <= 33; i++) {
      if(redball[i].ischeck) {
        aRedball.push(redball[i].index);
      }
      if (i < 17) {
        if (blueball[i].ischeck) {
          aBlueball.push(blueball[i].index);
        }
      }
    }
    if (aRedball.length < 6) {
      wx.showToast({
        icon: "success",
        title: '请选择6个红球',
        duration: 2000
      });
      return false;
    }
    if (aBlueball.length < 1) {
      wx.showToast({
        icon: "success",
        title: '请选择1个蓝球',
        duration: 2000
      });
      return false;
    }
    return {
      red : aRedball,
      blue: aBlueball
    }
  },
  clicksearch : function () {
    var _this = this;
    var expect = this.data.expect;
    var data = this.getSsqSelect();
    if (false === data) {
      return false;
    }
    wx.showLoading({
      title: '查询中...'
    })
    this.setData({issearch : true});
    Ajax.getZhongJiang('ssq', {
        data : {
          expect : expect,
          blueball : data.blue.join(","),
          redball : data.red.join(","),
          records : 100
        },
        success : function (res) {
          var data = res.data;
          wx.hideLoading();
          if (!data || data.code) {
              _this.setData({ issearch: false });
              wx.showLoading({
                title: '服务器繁忙',
              })
              return false;
          }
          var userRedCodes = data.userRedCodes,
              userBlueCodes = data.userBlueCodes,
              userZjBlueCodes = data.userZjBlueCodes,
              userZjRedCodes = data.userZjRedCodes,
              userCodes = {};
          for(var i=0;i<userRedCodes.length;i++) {
              var isZj = false;
              for (var j=0;j<userZjRedCodes.length;j++) {
                if (userRedCodes[i] == userZjRedCodes[j]) {
                  isZj = true;
                }
              }
              userCodes[i] = { code: userRedCodes[i], iszj: isZj};
          }
          data.userRedCodes = userCodes;
          userCodes = {};
          for (var i = 0; i < userBlueCodes.length;i++) {
            var isZj = false;
            for (var j = 0; j < userZjBlueCodes.length;j++) {
              if (userBlueCodes[i] == userZjBlueCodes[j]) {
                  isZj = true;
                }
              }
              userCodes[i] = { code: userBlueCodes[i], iszj: isZj};
          }
          data.userBlueCodes = userCodes;
          _this.setData({
            opensearch : data
          });
        }
    });
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