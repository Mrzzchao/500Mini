var Config = require("./config.js");
var User = require("./user.js");
var rechecktimes = 5;
var app = getApp();
var baseUrl = 'https://open.500.com/api/index.php?a={$act}&c=xcxkaijiang&vip=500vip',
    oAction = {
      sid: 'getenableid',
      list: 'kjlist',
      detail: 'kjdetail',
      zhongjiang: 'szczhongjiang',
      zoushi : 'szczoushi',
      zxlist : 'zxlist',
      shahaoinfo: 'shahaoinfo',
      currentkj: 'currentkj',
      articledetail: 'articledetail'
    },
    ajaxUrl = {
      ssq : {
        sid : '&wtype={$wtype}',
        list : '&type=ssq&act=expect&records={$records}',
        detail: '&type=ssq&act=detail&expect={$expect}&records={$records}',
        zhongjiang: '&red={$redball}&blue={$blueball}&expect={$expect}&type=ssq&records={$records}',
        zoushi:'&type=ssq&act={$acttype}',
        zxlist: '&type=ssq&od={$od}&lastaid={$lastid}&size={$size}',
        shahaoinfo: '&type=ssq',
        currentkj: '&type=ssq',
        articledetail : '&id={$id}'
      }
    },
    skey = Config.skey;
function getBaseUrl(act, type, params) {
  var url = '';
  if (type) {
    url = ajaxUrl[type][act];

    url = url.replace(/\{\$(.*?)\}/g, function (i, v) {
      return params[v];
    });
  }
  return baseUrl.replace("{$act}", oAction[act]) + url;
}
function ajax(url, success, data) {
  //var sessionid = wx.getStorageSync(skey);
  data = data || {};
  //data['skey'] = sessionid;
  wx.request({
    url: url,
    data: data,
    success: function (res) {
      success && success(res);
      return true;
      //checkIsLogin(res, url, success, data);
    }
  });
}

function checkIsLogin(res, url, success, data)
{
    var data = res.data;
    if (data.code && data.code == '4001' && data.msg == 'nosessionid') {
      if (app.globalData.rechecktimes > rechecktimes) {
        wx.showToast({
          title: '系统繁忙，稍后重试',
        });
        app.globalData.rechecktimes -= rechecktimes;
        return false;
      }
      app.globalData.rechecktimes ++;
      getSessionid(function (res) {
          ajax(url, success, data);
      });
      return false;
    }
    success && success(res);
    return true;
}
/**
 * 根据微信授权code获取sessionid
 */
function getSessionid(success)
{
    var url = getBaseUrl('sid', 'ssq', { wtype : 'main'});
    var sessionid = wx.getStorageSync(skey);
    //发起网络请求
    User.login(null, function (res) {
        ajax(url, function (res1) {
          wx.setStorageSync(skey, res1.data.key);
          success && success(res1);
        }, {
          code: res.code
        });
    });
}
/**
 * 查询中奖信息
 * type  彩种类型
 * params 包含：success（回调参数）, expect（期号）, redball（红球，必须传入，逗号分隔号码）,blueball（蓝球，必须传入，逗号分隔号码）
 */
function getZhongJiang(type, params)
{
    var data = params.data || {};
    var url = getBaseUrl('zhongjiang', type, data);
    
    ajax(url, params.success);
}
/**
 * 获取开奖详情
 * type  彩种类型
 * params 包含：success（回调参数）, expect（期号）
 */
function getKjDetail(type, params) {
  var data = params.data || {};
  var url = getBaseUrl('detail', type, data);
  params['baseurl'] = url;
  ajax(url, params.success);
}
/**
 * 获取开奖列表
 * type  彩种类型
 * params 包含：success（回调参数）, records（必须传入，记录数）
 */
function getKjList(type, params) {
  var data = params.data || {};
  var url = getBaseUrl('list', type, data);
  params['baseurl'] = url;
  ajax(url, params.success);
}
/**
 * 获取走势图数据
 * type  彩种类型
 * params 包含：success（回调参数）, acttype（必须传入，走势图类型）
 */
function getZoushi(type, params) {
  var data = params.data || {};
  var url = getBaseUrl('zoushi', type, data);
  params['baseurl'] = url;
  ajax(url, params.success);
}
/**
 * 获取资讯列表
 * type  彩种类型
 * params 包含：success（回调参数）
 */
function getZixunList(type, params)
{
  var data = params.data || {od : 0};
  var url = getBaseUrl('zxlist', type, data);
  params['baseurl'] = url;
  ajax(url, params.success);
}

/**
 * 获取专家杀号信息
 * type  彩种类型
 * params 包含：success（回调参数）
 */
function getShahaoInfo(type, params)
{
  var data = params.data || {};
  var url = getBaseUrl('shahaoinfo', type, data);
  params['baseurl'] = url;
  ajax(url, params.success);
}

/**
 * 获取资讯详情
 * type  彩种类型
 * params 包含：success（回调参数）
 */
function getArticleDetail(type, params) {
  var data = params.data || {};
  var url = getBaseUrl('articledetail', type, data);
  params['baseurl'] = url;
  ajax(url, params.success);
}

/**
 * 获取当前期信息
 */
function getCurrentExpect(type, params)
{
  var data = params.data || {};
  var url = getBaseUrl('currentkj', type, data);
  params['baseurl'] = url;
  ajax(url, params.success);
}


module.exports = {
  ajax: ajax,
  getSessionid: getSessionid,
  getKjList: getKjList,
  getZhongJiang: getZhongJiang,
  getKjDetail: getKjDetail,
  getZoushi: getZoushi,
  getZixunList: getZixunList,
  getShahaoInfo: getShahaoInfo,
  getArticleDetail: getArticleDetail,
  getCurrentExpect: getCurrentExpect
}