// pages/Email/Email.js
var app = getApp();
Page({

  data: {
    date: app.globalData.today_str,
    date_begin: "2018-02-01",
    date_end: app.globalData.today_str,
    toastHidden: true,
    notice_str: '',
  },

  toastChange: function (e) {
    this.setData({ toastHidden: true });
  },

  onLoad: function (options) {

  },
  Day: function () {
    var that = this;
    wx.request({
      url: app.get_url() + "send_daily_email",
      method: 'POST',
      data: {
        "date": that.data.date,
        "user_name": app.globalData.userInfo.nickName
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          toastHidden: false,
          notice_str: '邮件发送成功!'
        });
      }
    })
  },
  bindDateChange: function (e) {
    console.log('Date发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindDateBeginChange: function (e) {
    console.log('DateBegin发送选择改变，携带值为', e.detail.value)
    this.setData({
      date_begin: e.detail.value
    })
  },
  bindDateEndChange: function (e) {
    console.log('DateEnd发送选择改变，携带值为', e.detail.value)
    this.setData({
      date_end: e.detail.value
    })
  },
  Range: function () {
  },
})