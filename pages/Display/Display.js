// pages/Display/Display.js
const date = new Date()
const years = []
const months = []
const days = []
const depts = []
function date_str() {
  var date = new Date()
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
  /**
   * 页面的初始数据
   */
  data: {
    // text:"这是一个页面"  
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
    submit_date: "",
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
      url: "https://fredirox.com/api/check",
      header: {
        "Content-Type": "application/json"
      },
      data: {
        "date": this.data.year + "-" + this.data.month + "-" + this.data.day
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
            url: "https://fredirox.com/api/display",
            header: {
              "Content-Type": "application/json"
            },
            data: {
              "date": that.data.year + "-" + that.data.month + "-" + that.data.day,
              "dept_name": that.data.depts[that.data.dept - 1].dept_name
            },
            success: function (res) {
              console.log("/api/display返回值：")
              console.log(res.data)
              that.setData({
                modalHidden: false,
                submit_user: res.data.submit_user,
                submit_date: res.data.submit_date,
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
            url: "https://fredirox.com/api/display",
            header: {
              "Content-Type": "application/json"
            },
            data: {
              "date": date_str(),
              "dept_name": that.data.depts[that.data.dept - 1].dept_name
            },
            success: function (res) {
              console.log("/api/display返回值：")
              console.log(res.data)
              that.setData({
                modalHidden: false,
                submit_user: res.data.submit_user,
                submit_date: res.data.submit_date,
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