// 工具函数库
import config from '../config'
export function get(url, data) {
  return request(url, "GET", data)
}
export function post(url, data) {
  return request(url, "POST", data)
}
export function request(url, method, data, ) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,    
      method,
      url: config.host + url,
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          ShowModal('失败', res.data.data.msg);
          reject(res.data)
        }
      }
    })
  })
}
export function ShowSuccess(text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}
export function ShowModal(title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false,
  })
}
