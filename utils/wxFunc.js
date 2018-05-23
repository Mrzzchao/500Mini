/**
 * 封装微信的request
 */
function request(url, data = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method,
      success: (res) => {
        resolve(res.data)
      },
      fail: (res) => {
        reject(res.data)
      }
    })
  }).catch((e) => {
    console.log('请求错误:', e)
  })
}

/**
 * 封装微信的request
 */
function requestPost(url, data = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method: 'POST',
      success: (res) => {
        resolve(res.data)
      },
      fail: (res) => {
        reject(res.data)
      }
    })
  }).catch((e) => {
    console.log('请求错误:', e)
  })
}

/**
 * 封装微信的requestPayment
 */
function requestPayment(obj) {
  let {timeStamp, nonceStr, package, signType, paySign} = obj
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      timeStamp,
      nonceStr,
      package,
      signType,
      paySign,

      success: (res) => {
        resolve(res.data)
      },
      fail: (res) => {
        reject(res.data)
      }
    })
  }).catch((e) => {
    console.log('请求错误:', e)
  })
}



module.exports = {
  request,
  requestPost,
  requestPayment
}
