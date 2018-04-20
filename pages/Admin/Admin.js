// pages/Admin/Admin.js
var app = getApp();
Page({
  data: {
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
        "page": "/WeChat/Admin/Admin",
        "method": "browse",
        "content": "后台维护页面"
      }
    })
  },
  fields_config: function () {
    wx.navigateTo({
      url: '../Fields/Fields'
    })
  },
  fields_order: function () {
    wx.navigateTo({
      url: '../Fields/Order'
    })
  },
  field_create: function () {
    wx.navigateTo({
      url: '../Fields/Create'
    })
  },
  order: function () {
    wx.navigateTo({
      url: '../Fields/Order'
    })
  },
  depts: function () {
    wx.navigateTo({
      url: '../Depts/Depts'
    })
  },
  setting: function () {
    wx.navigateTo({
      url: '../Admin/Setting'
    })
  },
})