//index.js
var util = require("../../../../../../utils/util.js");
var Ajax = require("../../../../../../utils/ajax.js");
//获取应用实例
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select : 'kj',
    userInfo : null,    //用户信息
    openList : null,    //开奖列表
    openDetail : null,  //开奖详情
    currentexpect : '', //当前期号
    pagenum : [0, 20 , 50 , 100],
    page : 1,
    kjcondition: ['6+1', '6+0', '5+1', '5+0,4+1', '4+0,3+1', '2+1,1+1,0+1'],
    loadding: '',
    aLoading : {
      init: '下拉加载更多',
      start : '加载中...',
      end : '无更多信息'
    }
  },
  jump : function (event) {
    var dataset = event.currentTarget.dataset,
      url = dataset.url;
      wx.navigateTo({
        url: url
      });
      wx.showLoading({
        title: '数据加载中...'
      })
  },
  getLoadingWords: function (type) {
    this.setData({
      loadding: this.data.aLoading[type]
    });
  },
  loaddingmore: function () {
    var page = this.data.page + 1;
    if (page == 4) {
      return false;
    }
    this.getLoadingWords('start');
    this.getList(page, '', '');
    this.setData({
      page : page
    })
  },
  /**
   * 获取双色球开奖列表
   */
  getOpenList : function () {
    var _this = this;
    Ajax.getCurrentExpect('ssq', {
      success : function (res) {
        var data = res.data;
        if (data && !data.code) {
          var currentexpect = data['curr_expect'],
            endtime = data['endtime'];
          _this.getList(1, currentexpect, endtime);
          
          _this.setData({
            currentexpect: currentexpect
          });
        }
      }
    });
  },
  getList: function (page, currentexpect, endtime) {
    var _this = this;
    var pagesize = this.data.pagenum[page];
    Ajax.getKjList('ssq', {
      data: { records: pagesize },
      success: function (res) {
        var openList = _this.data.openList || [];
        wx.hideLoading();
        if (res.data) {
          if (res.data.code) {
            return false;
          }
          var expect = '',
            currexpect = '';
          res.data.forEach(function (v, i) {
            if (i <= _this.data.pagenum[page-1] - 1) {
              return false;
            }
            v.opencode = util.splitCode(v.opencode);
            v.opentime = v.opentime.split(" ")[0];
            v.week = util.getweek(v.opentime);
            if (i == 0) {
              if (currentexpect) currexpect = v.expect != currentexpect ? currentexpect : '';
              expect = v.expect;
            }
            openList.push(v);
          });
          if (currexpect) {
            openList.unshift({
              expect: currexpect,
              curr_expect: currexpect,
              opencode: [],
              opentime: endtime.split(' ')[0],
              week: util.getweek(endtime)
            });
          }
          app.globalData.openList = openList;
          if (!currexpect && expect) {
            _this.getOpenDetail(null, expect);
          }
          _this.getLoadingWords(page == 3 ? 'end' : 'init');
          _this.setData({
            openList: openList
          });
        }
      }
    });
  },
  /**
   * 获取开奖详情
   */
  getOpenDetail: function (event, expect, cb) {
    if (!expect) {
        var dataset = event.currentTarget.dataset;
        expect = dataset.expect;
    }
    if (!expect) {
      return false;
    }
    var _this = this;
    var openDetail = this.data.openDetail || {};
    if (openDetail && openDetail[expect] && openDetail[expect].ccmoney) {
      if(cb) {
        return cb();
      }
      var opencodes = openDetail[expect];
      if (opencodes) {
        opencodes.isshow = !opencodes.isshow;
        openDetail[expect] = opencodes;
        _this.setData({
          openDetail: openDetail
        })
        return false;
      }
    }
    if (openDetail && openDetail[expect] && openDetail[expect].isshow) {
      if (cb) {
        return cb();
      }
      var opencodes = openDetail[expect];
      opencodes.isshow = !opencodes.isshow;
      openDetail[expect] = opencodes;

      _this.setData({
        openDetail: openDetail
      });
      return false;
    }
    wx.showLoading({
      title: '数据加载中...'
    });
    Ajax.getKjDetail('ssq', {
      data: { expect: expect, records : 100},
      success : function (res) {
          wx.hideLoading();
          if (res.data) {
            //_this.setData_this.openDetail[expect] = res.data;
            var opencodes = res.data;
            if (opencodes.expect != expect) {
              opencodes = {};

              if(cb) {
                return cb();
              }
            } else {
              opencodes.ccmoney = util.changeMoneyToYi(opencodes.ccmoney);
              opencodes.totalmoney = util.changeMoneyToYi(opencodes.totalmoney);
            }
            opencodes.isshow = true;
            openDetail[expect] = opencodes;

            if (cb) {
              var openList = app.globalData.openList || [];
              var openItem = openList[0];
              if (openItem['expect'] == _this.data.currentexpect) {
                openItem['opencode'] = { red: opencodes.red, blue : opencodes.blue};
                openItem['curr_expect'] = '';
                openList[0] = openItem;
                _this.setData({
                  openList: openList
                })
              }
              cb();
            }
            _this.setData({
              openDetail: openDetail
            });
          }
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
    if (!this.data.openList) {
      var _this = this;
      wx.showLoading({
        title: '数据加载中...'
      });
      /*app.getUserInfo(function (res) {
        _this.setData({
          userInfo: res
        });
      });*/
      this.getOpenList();
    }
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
    var currentexpect = this.data.currentexpect;
    if (currentexpect) {
      this.getOpenDetail(null, currentexpect, function () {
        wx.stopPullDownRefresh();
        wx.showToast({
          title: '数据已更新'
        });
      });
      return false;
    }
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loaddingmore();
  }
})