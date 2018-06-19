/**
 * 封装微信的request
 */
function request(url, data = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method,
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
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
  let {timeStamp, nonceStr, signType, paySign} = obj
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      timeStamp,
      nonceStr,
      signType,
      paySign,
      "package": obj.package,

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
