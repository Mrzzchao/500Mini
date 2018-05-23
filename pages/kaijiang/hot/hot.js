
var app = getApp()
Page({
  data: {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loadOpenInfo(28);
    this.loadOpenInfo(3);
    this.loadOpenInfo(4);
  },
  onLoad: function () {
    this.weekList = ["日", "一", "二", "三", "四", "五", "六"];
    this.lottery = { 28: 'dlt', 3: 'ssq', 4: 'qxc', 5: 'pls', 7: 'sd', 11: 'qlc', 10001: 'plw', 45: 'xyxw', 53: 'nxyxw', 1: 'sfc', 15: 'bqc', 17: 'jqc', 46: 'jczq', 47: 'jclq', 9: 'bjdc' };
    this.setData({ 'lottery': this.lottery });
    this.setData({ 'current_date': new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() });
    this.setData({ 'current_week': '星期' + this.weekList[new Date().getDay()] });
    this.lotIdList = [4, 11, 5, 7, 10001, 45, 53, 1, 15, 17, 46, 47, 9];
  },
  loadOpenInfo: function (lotId) {
    var _this = this;
    wx.request({
      url: 'https://passport.500.com/wechatapp/kaijiang/wechat',
      data: { 'lotid': lotId, 't': new Date().getTime() },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        try {
          if (res.data.data.opencode) {
            if (res.data.data.opencode.indexOf('|') > -1) {
              var str = res.data.data.opencode.split('|');
              res.data.data['fore'] = str[0].split(',');
              res.data.data['back'] = str[1].split(',');
            } else {
              res.data.data.opencode = res.data.data.opencode.split(',')
            }
          }
          var obj = {};
          if (res.data.data.result_time || res.data.data.date) {
            res.data.data.result_time = res.data.data.result_time || res.data.data.date;
            res.data.data.result_time = res.data.data.result_time.substring(0, 10);
            obj[_this.lottery[lotId] + 'Week'] = '星期' + _this.weekList[new Date(Date.parse(res.data.data.result_time.replace(/-/g, '/'))).getDay()];
            _this.setData(obj);
          }
          obj = {};
          obj[_this.lottery[lotId]] = res.data.data;
          _this.setData(obj);
        } catch (e) {
        }


      },
      fail: function () {

      },
      complete: function () {
        if (lotId != 28 && lotId != 3) {
          _this.lotIdList = _this.lotIdList.slice(1);
          _this.lotIdList[0] && (_this.loadOpenInfo(_this.lotIdList[0]));
        }
      }
    })
  }
})
