// pages/Check/Check.js
const date = new Date()
const years = []
const months = []
const days = []
var app = getApp();

for (let i = 2018; i <= date.getFullYear(); i++) {
  years.push(i)
}
for (let i = 1; i <= date.getMonth() + 1; i++) {
  months.push(i)
}
for (let i = 1; i <= 31; i++) {
  days.push(i)
}
Page({
  data: {
    // text:"这是一个页面"  
    check_list: {},
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
        "date": this.data.year + "-" + this.data.month + "-" + this.data.day,
        "user_name": app.globalData.userInfo.nickName
      },
      success: function (res) {
        console.log("/api/check返回值：")
        console.log(res.data)
        that.setData({
          check_list: res.data,
          length_1: res.data.submission_list.length,
          length_2: res.data.unsubmission_list.length,
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
    this.setData({
      value: [this.data.year, this.data.month - 1, this.data.day - 1]
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
      data:{
        "user_name": app.globalData.userInfo.nickName
      },
      success: function (res) {
        console.log("/api/check返回值：")
        console.log(res.data)
        that.setData({
          check_list: res.data,
          length_1: res.data.submission_list.length,
          length_2: res.data.unsubmission_list.length,
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
    this.setData({
      value: [date.getFullYear(), date.getMonth(), date.getDate() - 1]
    })
  },
})