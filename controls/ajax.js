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
  return WxFunc.requestPost(Api.HotList).then((res) => {
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
  return WxFunc.request(Api.HotInfo, { lotid, t: new Date().getTime()}).then((res) => {
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
  return WxFunc.request(Api.HotHistory, { lotid, t: new Date().getTime()}).then((res) => {
    hideLoading()
    if (res.status === '100') {
      return res.data
    }
  })
}

/**
 * 获取全国彩彩种奖项详情
 */
function getHotPrizeDetail({lotid, expect}) {
  showLoading()
  return WxFunc.request(Api.HotPrizeDetail, { lotid, expect, t: new Date().getTime()}).then((res) => {
    hideLoading()
    if (res.status === '100') {
      return res.data
    }
  })
}

/**
 * 获取北单期号列表
 */
function getBdExpectList() {
  showLoading()
  return WxFunc.requestPost(Api.BdExpectList, { t: new Date().getTime() }).then((res) => {
    hideLoading()
    if (res.status === '100') {
      return res.data
    }
  })
}

/**
 * 获取北单胜负期号列表
 */
function getBdsfExpectList() {
  showLoading()
  return WxFunc.requestPost(Api.BdsfExpectList, { t: new Date().getTime() }).then((res) => {
    hideLoading()
    if (res.status === '100') {
      return res.data
    }
  })
}

/**
 * 获取竞彩详情
 */
function getJcPrizeDetail({ lotid, expect, day}) {
  showLoading()
  return WxFunc.request(Api.JcPrizeDetail, { lotid, expect, day, t: new Date().getTime() }).then((res) => {
    hideLoading()
    if (res.status === '100') {
      return res.data
    }
  })
}

/**
 * 获取竞彩日期
 */
function getJcHistory() {
  showLoading()
  return WxFunc.request(Api.JcHistory, {t: new Date().getTime() }).then((res) => {
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
  return WxFunc.requestPost(Api.ProvLottery, { type, id }).then((res) => {
    hideLoading()
    if (res.status === '100') {
      return res.data
    }
  })
}

/**
 * 获取地方彩彩种详情
 */
function getLocalDetail({lotname, expect}) {
  showLoading()
  return WxFunc.requestPost(Api.LocalDetail, {lotname, expect, t: Date.now()}).then((res) => {
    hideLoading()
    if (res.status === '100') {
      return res.data
    }
  })
}

/**
 * 获取高频彩彩种详情
 */
function getGaopinList({lotname, day}) {
  showLoading()
  return WxFunc.requestPost(Api.GaopinList, { lotname, day, t: Date.now() }).then((res) => {
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

  getBdExpectList,
  getBdsfExpectList,

  getJcPrizeDetail,
  getJcHistory,

  getProvList,
  getProvLottery,

  getLocalDetail,
  getGaopinList
}
