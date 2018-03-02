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
    modalHidden: false
  },
  bindChange: function (e) {
    //console.log('Date发送选择改变，携带值为', e.detail.value)
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      dept: this.data.days[val[3]],
    })
    var that = this
    wx.request({
      url: app.get_url() + "check",
      header: {
        "Content-Type": "application/json"
      },
      data: {
        "date": this.data.year + "-" + this.data.month + "-" + this.data.day,
        "user_name": app.globalData.user_name
      },
      success: function (res) {
        console.log("/api/check返回值：")
        console.log(res.data)
        that.setData({
          depts: res.data.submission_list,
          length_1: res.data.submission_list.length,
        })
        if (that.data.dept - 1 >= that.data.depts.length) {
          that.data.dept = that.data.depts.length
        }
        if (that.data.dept - 1 < 0) {
          that.data.dept = 1
        }
        //console.log(that.data.dept - 1, that.data.length_1)
        if (that.data.depts.length != 0) {
          wx.request({
            url: app.get_url() + "display",
            header: {
              "Content-Type": "application/json"
            },
            data: {
              "date": that.data.year + "-" + that.data.month + "-" + that.data.day,
              "dept_name": that.data.depts[that.data.dept - 1].dept_name,
              "user_name": app.globalData.user_name
            },
            success: function (res) {
              console.log("/api/display返回值：")
              console.log(res.data)
              that.setData({
                modalHidden: false,
                submit_user: res.data.submit_user,
                submit_time: res.data.submit_time,
                extra_fields: res.data.extra_fields,
              })
            },
          })
        } else {
          that.setData({
            modalHidden: true
          })
        }
        that.setData({
          value: [that.data.year, that.data.month - 1, that.data.day - 1, that.data.dept - 1]
        })
      },
    })
    this.setData({
      value: [this.data.year, this.data.month - 1, this.data.day - 1, this.data.dept - 1]
    })
  },

  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.get_url() + "check",
      header: {
        "Content-Type": "application/json"
      },
      data:{
        "user_name": app.globalData.user_name
      },
      success: function (res) {
        console.log("/api/check返回值：")
        console.log(res.data)
        that.setData({
          depts: res.data.submission_list,
          length_1: res.data.submission_list.length,
        })
        //console.log(that.data.depts)
        if (that.data.dept - 1 >= that.data.depts.length) {
          that.data.dept = that.data.depts.length
        }
        //console.log(that.data.dept - 1, that.data.length_1)
        if (that.data.depts.length != 0) {
          wx.request({
            url: app.get_url() + "display",
            header: {
              "Content-Type": "application/json"
            },
            data: {
              "date": app.globalData.today_str,
              "dept_name": that.data.depts[that.data.dept - 1].dept_name,
              "user_name": app.globalData.user_name
            },
            success: function (res) {
              console.log("/api/display返回值：")
              console.log(res.data)
              that.setData({
                modalHidden: false,
                submit_user: res.data.submit_user,
                submit_time: res.data.submit_time,
                extra_fields: res.data.extra_fields,
              })
            },
          })
        } else {
          that.setData({
            modalHidden: true
          })
        }
      },
    })
    this.setData({
      value: [date.getFullYear(), date.getMonth(), date.getDate() - 1, this.data.dept - 1]
    })
  },
})