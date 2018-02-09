// pages/Check/Check.js
const date = new Date()
const years = []
const months = []
const days = []

for (let i = 2018; i <= date.getFullYear(); i++) {
  years.push(i)
}
for (let i = 1; i <= 12; i++) {
  months.push(i)
}
for (let i = 1; i <= 31; i++) {
  days.push(i)
}
var today = new Date();
function date_str(date) {
  var yy = date.getFullYear()
  var mm = date.getMonth() + 1
  var dd = date.getDate()
  if (mm < 10) {
    mm = '0' + mm
  }
  if (dd < 10) {
    dd = '0' + dd
  }
  return yy + '-' + mm + '-' + dd
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // text:"这是一个页面"  
    check_list: {},
    date: date_str(today),
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 9,
    year: date.getFullYear(),
    value: [9999, 1, 1],
    length_1: 0,
    length_2: 0,
  },
  bindChange: function (e) {
    console.log('Date发送选择改变，携带值为', e.detail.value)
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
    var that = this
    wx.request({
      url: "https://fredirox.com/api/check",
      header: {
        "Content-Type": "application/json"
      },
      data: {
        "date": this.data.year + "-" + this.data.month + "-" + this.data.day
      },
      success: function (res) {
        that.setData({
          check_list: res.data,
          length_1: res.data.submission_list.length,
          length_2: res.data.unsubmission_list.length,
        })
        console.log(that.data.check_list)
        console.log(that.data.length_1, that.data.length_2)
      },
      fail: function (err) {
        console.log(err)
      }
    })
    this.setData({
      value: [this.data.year, this.data.month-1, this.data.day - 1]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: "https://fredirox.com/api/check",
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        that.setData({
          check_list: res.data,
          length_1: res.data.submission_list.length,
          length_2: res.data.unsubmission_list.length,
        })
        console.log(that.data.check_list)
        console.log(that.data.length_1, that.data.length_2)
      },
      fail: function (err) {
        console.log(err)
      }
    })
    this.setData({
      value: [date.getFullYear(),date.getMonth(),date.getDate()-1]
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