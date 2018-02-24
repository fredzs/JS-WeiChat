// pages/Email/Email.js
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
    date: date_str(today),
    date_begin: "2018-02-01",
    date_end: date_str(today),
    toastHidden: true,
    notice_str: '',
  },

  toastChange: function (e) {
    this.setData({ toastHidden: true });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },
  Day: function () {
    var that = this;
    wx.request({
      url: 'https://fredirox.com/api/send_daily_email',
      method: 'POST',
      data: {
        "date": that.data.date
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          toastHidden: false,
          notice_str: '邮件发送成功!'
        });
      }
    })
  },
  bindDateChange: function (e) {
    console.log('Date发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindDateBeginChange: function (e) {
    console.log('DateBegin发送选择改变，携带值为', e.detail.value)
    this.setData({
      date_begin: e.detail.value
    })
  },
  bindDateEndChange: function (e) {
    console.log('DateEnd发送选择改变，携带值为', e.detail.value)
    this.setData({
      date_end: e.detail.value
    })
  },
  Range: function () {
  },
})