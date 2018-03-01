//app.js
var today = new Date();
function date_str(date) {
  var yy = date.getFullYear()
  var mm = date.getMonth() + 1
  var dd = date.getDate()
  if (mm < 10) {
    mm = '0' + mm
  }
  if (dd < 10) {
    dd = '0' + dd
  }
  return yy + '-' + mm + '-' + dd
};

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    today_str: date_str(today),
    request_url: 'https://fredirox.com/api/',
    local_url: 'https://127.0.0.1:5001/api/',
    test_url: 'https://fredirox.com/test/api/',
    running_mode: "developing"
  },
  get_url: function() {
    var running_mode = this.globalData.running_mode
    if (running_mode== "local_testing") {
      var url = this.globalData.local_url
    }else if(running_mode == "developing") {
      var url = this.globalData.test_url
    } else if (running_mode == "online_running") {
      var url = this.globalData.request_url
    } 
    return url
  },
})