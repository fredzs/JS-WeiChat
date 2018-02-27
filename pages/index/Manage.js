// pages/index/Manage.js
Page({
  data: {
  },
  onLoad: function (options) {
  },
  Check: function () {
    wx.navigateTo({
      url: '../Check/Check'
    })
  },
  Email: function () {
    wx.navigateTo({
      url: '../Email/Email'
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