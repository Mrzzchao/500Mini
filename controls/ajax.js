const Api = require('../config/api.js')
const WxFunc = require('../utils/wxFunc.js')


/**
 * 显示微信加载弹窗
 */
function showLoading() {
  wx.showLoading({
    title: '数据加载中...'
  })
}

/**
 * 关闭微信加载弹窗
 */
function hideLoading() {
  wx.hideLoading()
}


/**
 * 获取全国彩列表
 */
function getQuanguo() {
  showLoading()
  return WxFunc.request(Api.HotList).then((res) => {
    hideLoading()
    if(res.status === '100') {
      return res.data
    }
  })
}

/**
 * 获取全国彩彩种信息
 */
function getHotInfo(lotid) {
  showLoading()
  return WxFunc.requestPost(Api.HotInfo, {lotid}).then((res) => {
    hideLoading()
    if (res.status === '100') {
      return res.data
    }
  })
}

/**
 * 获取全国彩彩种历史期号
 */
function getHotHistory(lotid) {
  showLoading()
  return WxFunc.requestPost(Api.HotHistory, {lotid}).then((res) => {
    hideLoading()
    if (res.status === '100') {
      return res.data
    }
  })
}

/**
 * 获取全国彩彩种奖项详情
 */
function getHotPrizeDetail(lotid, expect) {
  showLoading()
  return WxFunc.requestPost(Api.HotPrizeDetail, {lotid, expect}).then((res) => {
    hideLoading()
    if (res.status === '100') {
      return res.data
    }
  })
}

/**
 * 获取省份列表
 */
function getProvList(type) {
  showLoading()
  return WxFunc.requestPost(Api.ProvList, { type }).then((res) => {
    hideLoading()
    if (res.status === '100') {
      return res.data
    }
  })
}

/**
 * 获取省份彩种列表
 */
function getProvLottery(type, id) {
  showLoading()
  return WxFunc.request(Api.ProvLottery, { type, id }).then((res) => {
    hideLoading()
    if (res.status === '100') {
      return res.data
    }
  })
}

/**
 * 获取地方彩彩种详情
 */
function getLocalDetail(lotname, expect) {
  showLoading()
  return WxFunc.request(Api.LocalDetail, {lotname, expect, t: new Date().now()}).then((res) => {
    hideLoading()
    if (res.status === '100') {
      return res.data
    }
  })
}

/**
 * 获取高频彩彩种详情
 */
function getGaopinList(lotname, day) {
  showLoading()
  return WxFunc.request(Api.LocalDetail, { lotname, day, t: new Date().now() }).then((res) => {
    hideLoading()
    if (res.status === '100') {
      return res.data
    }
  })
}

module.exports = {
  getQuanguo,
  getHotInfo,
  getHotHistory,
  getHotPrizeDetail,
  getProvList,
  getProvLottery,
  getLocalDetail,
  getGaopinList
}
