// pages/index/Manage.js
var app = getApp();
Page({
  data: {
  },
  onLoad: function (options) {
    wx.request({
      url: app.get_url() + "log",
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        "user_name": app.globalData.user_name,
        "page": "/index/Manage",
        "method": "browse",
        "content": "管理员页面"
      }
    })
  },
  Check: function () {
    wx.navigateTo({
      url: '../Check/Check'
    })
  },
  Statistics: function () {
    wx.navigateTo({
      url: '../Statistics/Statistics'
    })
  },
  Display: function () {
    wx.navigateTo({
      url: '../Display/Display'
    })
  },
  Admin: function () {
    wx.navigateTo({
      url: '../Admin/Admin'
    })
  }
})