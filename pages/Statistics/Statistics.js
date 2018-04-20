// pages/Email/Email.js
var app = getApp();
Page({

  data: {
    today: app.globalData.today_str,
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
    wx.request({
      url: app.get_url() + "logs",
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        "user_name": app.globalData.user_name,
        "page": "/WeChat/Statistics/Statistics",
        "method": "browse",
        "content": "业绩统计页面"
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  statistics: function (e) {
    var that = this;
    var mode = e.currentTarget.dataset.mode;
    var t1,t2;
    if (mode=="daily"){
      t1 = that.data.date;
      t2 = that.data.date;
    } else {
      t1 = that.data.date_begin;
      t2 = that.data.date_end;
    }
    wx.request({
      url: app.get_url() + "statistics",
      method: 'GET',
      data: {
        "date_begin": t1,
        "date_end": t2,
        "user_name": app.globalData.user_name,
        "mode": mode,
        "page": "/Statistics/Statistics",
        "content": "手机端统计业绩"
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log("/api/statistics 返回值：")
        console.log("单日统计：" + res.data)
        var str=""
        if (res.data == "success"){
          str = "统计完毕"
        } else {
          str = '统计失败，请联系管理员!'
        }e
        that.setData({
          toastHidden: false,
          notice_str: str
        });
      }
    })
  },
  email: function (e) {
    var that = this;
    var mode = e.currentTarget.dataset.mode;
    var t1,t2;
    if (mode == "daily") {
      t1 = that.data.date;
      t2 = that.data.date;
    } else {
      t1 = that.data.date_begin;
      t2 = that.data.date_end;
    }
    wx.request({
      url: app.get_url() + "email",
      method: 'GET',
      data: {
        "date_begin": t1,
        "date_end": t2,
        "user_name": app.globalData.user_name,
        "mode": mode,
        "page": "/Statistics/Statistics",
        "content": "手机端发送邮件"
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log("/api/email返回值：")
        console.log("期间统计：" + res.data)
        var str = ""
        if (res.data == "success") {
          str = "邮件发送成功"
        } else {
          str = '邮件发送失败，请联系管理员!'
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