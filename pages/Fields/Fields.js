// pages/Fields/Fields.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fields:[],
    type_list:["string","int","bool"],
    type_index: {"string":0,"int":1, "bool":2},
    status_list: [false, true],
    status_index: { 0: false, 1: true},
    index: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
        //console.log(that.data.depts)
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
        //console.log(that.data.fields)
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
    console.log('picker发送选择改变，携带值为', e.detail.value, this.data.status_index[e.detail.value])
    console.log(e)
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
        //console.log(that.data.fields)
      }
    })
    var v = that.data.fields
    v[e.currentTarget.dataset.index].status = that.data.status_index[e.detail.value]
    that.setData({
      fields: v
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})