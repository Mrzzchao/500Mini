var Ajax = require("../../../../../../utils/ajax.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: 'zst',
    jbzs : null,
    dxzs : null,
    jozs : null,
    blue : null,
    zhzs : null,
    zsttype : 'jbzs',
    oLine: [
      { xtop: 20, top: 20, xleft: 1004.5, left: 1004.5, width: 13.413813, deg: 90 },
      { xtop: 42, top: 15, xleft: 1432.5, left: 1012.5, width: 30.4138126514911, deg: 62.59242456218159 },
      { xtop: 42, top: 15, xleft: 1402.5, left: 1012.5, width: 51.62363799656123, deg: 31.534791905188296 },
      { xtop: 42, top: 15, xleft: 1372.5, left: 1012.5, width: 78.77182237323191, deg: 20.045249425421005 },
      { xtop: 42, top: 15, xleft: 1342.5, left: 1012.5, width: 107.44766167767449, deg: 14.553572790712549 },
      { xtop: 42, top: 15, xleft: 1312.5, left: 1012.5, width: 136.69308687713507, deg: 11.392135831552729 },
      { xtop: 42, top: 15, xleft: 1282.5, left: 1012.5, width: 166.20770138594662, deg: 9.348977589287276 },
      { xtop: 42, top: 15, xleft: 1252.5, left: 1012.5, width: 195.86985475054604, deg: 7.923259283378656 },
      { xtop: 42, top: 15, xleft: 1222.5, left: 1012.5, width: 225.6213642366343, deg: 6.8730299383414675 },
      { xtop: 42, top: 15, xleft: 1192.5, left: 1012.5, width: 255.43100829773977, deg: 6.067710629076163 },
      { xtop: 42, top: 15, xleft: 1162.5, left: 1012.5, width: 285.2805636562014, deg: 5.430811296710768 },
      { xtop: 42, top: 15, xleft: 1132.5, left: 1012.5, width: 315.15869018638847, deg: 4.9146183624077695 },
      { xtop: 42, top: 15, xleft: 1102.5, left: 1012.5, width: 345.05796614482034, deg: 4.487851861541667 },
      { xtop: 42, top: 15, xleft: 1072.5, left: 1012.5, width: 374.97333238511777, deg: 4.129162870403208 },
      { xtop: 42, top: 15, xleft: 1042.5, left: 1012.5, width: 404.90122252223443, deg: 3.8234876450341733 },
      { xtop: 42, top: 15, xleft: 1012.5, left: 1012.5, width: 434.8390506842733, deg: 3.559896051100919 }
    ],
    boxwidth : '1470px',
    aboxwidth: { jbzs: '1470px', hqfb: '990px', lqfb : '480px'},
    aLinePos : []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  calLinePos : function (pos1,pos2, ipos) {
    var diff = pos1 - pos2,
        index = diff == 0 ? 0 : Math.abs(diff),
        obj = this.data.oLine[index],
        temp = '';
    var oLinePos = null;
    var top = obj['top'];
    var left = obj['left'];
    var deg = obj['deg'];
    if (diff > 0) {
      top = obj['xtop'];
      left = obj['xleft'];
      deg = obj['deg'] * -1;
    }
    if (this.data.zsttype == 'lqfb') {
      left -= 990;
    }
    oLinePos = {
      top: diff <= 0 ? (diff == 0 ? (15 + ((ipos - 1) * 26) + 2) : (15 + ((ipos - 1) * 26))) :top+(ipos-1)*26, left: left + (((diff <= 0 ? pos1 : (-16+pos1+1))-1) * 30), deg : deg, width : obj['width']
    };
    return oLinePos;
  },
  getDataChartData : function (type) {
    var _this = this;
    Ajax.getZoushi('ssq', {
      data: {
        acttype: type//'jbzs'
      },
      success: function (res) {
          _this[type+'fun'](res, type);
      }
    });
  },
  jbzsfun : function (res,type) {
    var _this = this;
    var data = res.data;
    if (data && !data.code) {
      var obj = {},
        aOrder = ['appearcount', 'avgyl', 'maxyl', 'maxlc'];
      if (data['tj']) {
        data['newtj'] = [];
        for (var i = 0; i < aOrder.length; i++) {
          var item = data.tj[aOrder[i]];
          data['newtj'].push({ 'redfb': item['redfb'].split(","), 'bluefb': item['bluefb'].split(",") });
        }
      }
      if (this.zsttype == 'hqfb') {
        data['newtj']['bluefb'] = [];
        data['data']['bluefb'] = [];
      }
      if (this.zsttype == 'lqfb') {
        data['newtj']['redfb'] = [];
        data['data']['redfb'] = [];
      }
      obj[type] = data;
      this.setData(obj)
      if (data['data']) {
          var preblue = -1,
            count = 0,
            aLinePos = [];
          if (_this.data.zsttype != 'hqfb') {
              var dtemp = data['data'],
                  dlen = dtemp.length;
              for (var i = 0; i < dlen;i++) {
                var v = dtemp[i]['bluefb'],
                    vlen = v.length;
                for (var i1=0;i1<vlen;i1++) {
                  var v1 = v[i1];
                  if (preblue == -1) {
                    if (v1 == 0) {
                      preblue = i1 + 1;
                      break;
                    }
                    continue;
                  }
                  if (v1 == 0) {
                    var newblue = i1 + 1,
                      oLinePos = null;
                    oLinePos =  _this.calLinePos(preblue, newblue, count);
                    aLinePos.push(oLinePos);
                    preblue = newblue;
                    break;
                  }
                }
                count++;
              }
              setTimeout(function () {
                  _this.setData({
                    aLinePos: aLinePos
                  })
              }, 200);
          }
      }
      wx.hideLoading();
    }
  },
  changezst : function (e) {
      var dataset = e.target.dataset,
          type = dataset.type;
      if (type == this.data.zsttype) {
        return false;
      }
      this.setData({
        aLinePos : [],
        zsttype : type,
        boxwidth: this.data.aboxwidth[type]
      });
      wx.showLoading({
        title: '数据加载中...'
      })
      this.getDataChartData('jbzs');
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
    if (this.data.jbzs) {
      return false;
    }
    //jbzs||dxzs||jozs||blue||zhzs
    wx.showLoading({
      title: '数据加载中...'
    })
    this.getDataChartData('jbzs');
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