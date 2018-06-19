const RootUrl = 'https://passport.500.com'
const subPath = '/wechatapp' // 线上环境加该路径

const domain = RootUrl + subPath

module.exports = {
  // 全国彩
  HotList: domain + '/kaijiang/quanguo',
  HotInfo: domain + '/kaijiang/wechat',
  HotHistory: domain + '/kaijiang/history',
  HotPrizeDetail: domain + '/kaijiang/wechatinfo',

  BdExpectList: domain + '/kaijiang/bdexpectlist',
  BdsfExpectList: domain + '/kaijiang/bdsfexpectlist',

  JcPrizeDetail: domain + '/kaijiang/wechatinfo',
  JcHistory: domain + '/kaijiang/datelist',

  // 地方彩
  LocalDetail: domain + '/kaijiang/lotinfo',

  // 高频彩
  GaopinList: domain + '/kaijiang/lotlist',

  // 省份
  ProvList: domain + '/kaijiang/province',
  ProvLottery: domain + '/kaijiang/lotprov',

  // 双色球
  Ssq: 'https://open.500.com/api/index.php'
}