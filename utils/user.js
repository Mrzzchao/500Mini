var Config = require("./config.js");
var errorLoginTime = 1;
//检查登陆
function checkLogin(cb, isForce)
{
    //return false;
    wx.checkSession({
      success: function () {
        var _skey = Config.skey;
        var skey =  wx.getStorageSync(_skey);
        if (skey) {
          getUserInfo(cb);
        } else {
          login(cb);
        }
      },
      fail : function () {
        login(cb);
      }
    });
}
//登录入口
function login(cb, logincb)
{
    wx.login({
      success: function (res) {
        if (res.code) {
          getUserInfo(cb, res.code);
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
}
//获取用户登录信息
function getUserInfo(cb, code) {
    wx.getUserInfo({
      success: function (res) {
        authAuth(res, code, cb);
      }
    });
}
//授权登录入口
function authAuth(userInfo, code, cb) {
  auth500(userInfo, code, function (sessionId) {
    login500(sessionId, cb);
  });
}
//500登录接口（500登录）
function login500(sessionId, cb) {
  var loginUrl = "https://wx.500.com/port/wxminiapi/login.php";
  var skey = sessionId;
  if (!skey) {
    return false;
  }

  ajax(loginUrl, function (res) {
    if (res.data.code == 0) {
      wx.setStorageSync('usercheck', res.data.msg);
      typeof cb == "function" && cb(res)
    }
  }, {
      skey: skey
    }, "POST");
}
//500授权接口（微信登录授权）
function auth500(userInfo, code, cb) {
  var authUrl = "https://wx.500.com/port/wxminiapi/auth.php";
  var _skey = Config.skey;
  var bHasCode = !!code;
  var skey = bHasCode ? '' : wx.getStorageSync(_skey);

  ajax(authUrl,function (res) {
    if (res.data.code == 0) {
      var sessionId = res.data.msg;
      wx.setStorageSync(_skey, sessionId);
      cb && cb(sessionId);
    } else {
      if (errorLoginTime>0) {
        errorLoginTime--;
        login();
      }
    }
  }, {
      skey: skey,
      wtype: 'main',
      iv: userInfo.iv,
      endata: userInfo.encryptedData,
      code: code
  }, "POST");
}
//通用ajax入口
function ajax(url, success, data, method) {
  method = method || 'GET';
  data = data || {};
  var usercheck = wx.getStorageSync('usercheck');
  //data['skey'] = sessionid;
  wx.request({
    url: url,
    method: method,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': 'usercheck=' +encodeURIComponent(usercheck)
    },
    data: data,
    success: function (res) {
      success && success(res);
      return true;
    }
  });
}

module.exports = {
  checkLogin: checkLogin,
  login: login,
  login500: login500
}