// pages/Fields/Fields.js
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
      url: "https://fredirox.com/api/fields",
      header: {
        "Content-Type": "application/json"
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
  bindPickerChange: function (e) {
    var that = this
    console.log('picker发送选择改变，携带值为', this.data.type_list[e.detail.value])
    wx.request({
      url: 'https://fredirox.com/api/update_field',
      method: 'POST',
      data: {
        "field_id": e.currentTarget.dataset.id,
        "update_k": "field_type",
        "update_v": that.data.type_list[e.detail.value],
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
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
      url: 'https://fredirox.com/api/update_field',
      method: 'POST',
      data: {
        "field_id": e.currentTarget.dataset.id,
        "update_k": "status",
        "update_v": that.data.status_index[e.detail.value],
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("已更新字段：", res.data)
      }
    })
    var v = that.data.fields
    v[e.currentTarget.dataset.index].status = that.data.status_index[e.detail.value]
    that.setData({
      fields: v
    })
  },
})