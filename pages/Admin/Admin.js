// pages/Admin/Admin.js
Page({
  data: {
  },
  onLoad: function (options) {
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