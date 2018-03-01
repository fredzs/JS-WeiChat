// pages/Fields/Fields.js
var app = getApp();
Page({
  data: {
    fields: [],
    type_list: ["string", "int", "bool"],
    type_index: { "string": 0, "int": 1, "bool": 2 },
    status_list: [false, true],
    status_index: { false: 0, true: 1 },
    index: 1,
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.get_url() + "fields",
      header: {
        "Content-Type": "application/json"
      },
      data:{
        "user_name": app.globalData.userInfo.nickName
      },
      success: function (res) {
        console.log("/api/fields返回值：")
        console.log(res.data)
        that.setData({
          fields: res.data,
          index: 0,
        })
      },
    })
  },
  bind_unit_change: function (e) {
    var that = this
    console.log('field_unit改变，携带值为', e.detail.value)
    wx.request({
      url: app.get_url() + "update_field",
      method: 'POST',
      data: {
        "field_id": e.currentTarget.dataset.id,
        "update_k": "field_unit",
        "update_v": e.detail.value,
        "user_name": app.globalData.userInfo.nickName
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data == "success") {
          console.log("已更新字段")
        } else {
          console.log("更新字段失败：" + res.data)
        }
      }
    })
  },
  bindPickerChange: function (e) {
    var that = this
    console.log('picker发送选择改变，携带值为', this.data.type_list[e.detail.value])
    wx.request({
      url: app.get_url() + "update_field",
      method: 'POST',
      data: {
        "field_id": e.currentTarget.dataset.id,
        "update_k": "field_type",
        "update_v": that.data.type_list[e.detail.value],
        "user_name": app.globalData.userInfo.nickName
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data == "success") {
          console.log("已更新字段")
        } else {
          console.log("更新字段失败：" + res.data)
        }
      }
    })
    var v = that.data.fields
    v[e.currentTarget.dataset.index].field_type = that.data.type_list[e.detail.value]
    that.setData({
      fields: v
    })
  },
  bindSwitchChange: function (e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    wx.request({
      url: app.get_url() + "update_field",
      method: 'POST',
      data: {
        "field_id": e.currentTarget.dataset.id,
        "update_k": "status",
        "update_v": that.data.status_index[e.detail.value],
        "user_name": app.globalData.userInfo.nickName
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data == "success") {
          console.log("已更新字段")
        } else {
          console.log("更新字段失败：" + res.data)
        }
      }
    })
    var v = that.data.fields
    v[e.currentTarget.dataset.index].status = that.data.status_index[e.detail.value]
    that.setData({
      fields: v
    })
  },
})