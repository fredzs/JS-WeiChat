// pages/Email/Email.js
var app = getApp();
Page({

  data: {
    date: app.globalData.today_str,
    date_begin: "2018-03-01",
    date_end: app.globalData.today_str,
    toastHidden: true,
    notice_str: '',
  },

  toastChange: function (e) {
    this.setData({ toastHidden: true });
  },

  onLoad: function (options) {

  },
  Day: function (e) {
    var that = this;
    wx.request({
      url: app.get_url() + "send_range_email",
      method: 'POST',
      data: {
        "date_begin": that.data.date,
        "date_end": that.data.date,
        "user_name": app.globalData.user_name,
        "count_only": e.currentTarget.dataset.count_only
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("单日统计：" + res.data)
        if (res.data == "success"){
          var str = '邮件发送成功!'
        } else {
          var str = '邮件发送失败，请联系管理员!'
        }
        that.setData({
          toastHidden: false,
          notice_str: str
        });
      }
    })
  },
  Range: function (e) {
    var that = this;
    wx.request({
      url: app.get_url() + "send_range_email",
      method: 'POST',
      data: {
        "date_begin": that.data.date_begin,
        "date_end": that.data.date_end,
        "user_name": app.globalData.user_name,
        "count_only": e.currentTarget.dataset.count_only
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("期间统计：" + res.data)
        if (res.data == "success") {
          var str = '邮件发送成功!'
        } else {
          var str = '邮件发送失败，请联系管理员!'
        }
        that.setData({
          toastHidden: false,
          notice_str: str
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
})