// pages/Display/Display.js
var app = getApp();
const date = new Date()
const years = []
const months = []
const days = []
const depts = []

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
    years: years,
    year: date.getFullYear(),
    months: months,
    month: date.getMonth + 1,
    days: days,
    day: date.getDay,
    value: [9999, 1, 1, 1],
    length_1: 0,
    dept: 1,
    submit_user: "",
    submit_time: "",
    extra_fields: [],
    modalHidden: true,
    comments: "",
    dept_name: "",
    user_name: ""
  },
  bindChange: function (e) {
    //console.log('Date发送选择改变，携带值为', e.detail.value)
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
    })
    var that = this
    wx.request({
      url: app.get_url() + "display",
      header: {
        "Content-Type": "application/json"
      },
      data: {
        "date": that.data.year + "-" + that.data.month + "-" + that.data.day,
        "dept_name": app.globalData.dept_info.dept_name,
        "user_name": that.data.user_name
      },
      success: function (res) {
        console.log("/api/display返回值：")
        console.log(res.data)
        if (res.data.submit_user != "empty") {
          that.setData({
            modalHidden: false,
            submit_user: res.data.submit_user,
            submit_time: res.data.submit_time,
            comments: res.data.comments,
            extra_fields: res.data.extra_fields,
          })
        } else {
          that.setData({
            modalHidden: true
          })
        }
      }
    })
    that.setData({
      value: [that.data.year, that.data.month - 1, that.data.day - 1]
    })
    // this.setData({
    //   value: [this.data.year, this.data.month - 1, this.data.day - 1, this.data.dept - 1]
    // })
  },

  onLoad: function (options) {
    var that = this
    this.setData({
      user_name: app.globalData.user_name
    })
    wx.request({
      url: app.get_url() + "dept",
      header: {
        "Content-Type": "application/json"
      },
      data: {
        "user_name": that.data.user_name
      },
      success: function (res) {
        console.log("/api/dept返回值：")
        console.log(res.data)
        that.setData({
          dept_name: app.globalData.dept_info.dept_name
        })
        wx.request({
          url: app.get_url() + "display",
          header: {
            "Content-Type": "application/json"
          },
          data: {
            "date": app.globalData.today_str,
            "dept_name": that.data.dept_name,
            "user_name": that.data.user_name
          },
          success: function (res) {
            console.log("/api/display返回值：")
            console.log(res.data)
            if (res.data.submit_user != "empty") {
              that.setData({
                modalHidden: false,
                submit_user: res.data.submit_user,
                submit_time: res.data.submit_time,
                comments: res.data.comments,
                extra_fields: res.data.extra_fields,
              })
            } else {
              that.setData({
                modalHidden: true
              })
            }
          },
        }),
          that.setData({
            value: [date.getFullYear(), date.getMonth(), date.getDate() - 1]
          })
      },
    })
    
  },
})