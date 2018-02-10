// pages/Fields/Order.js
var app = getApp();
var x, y, x1, y1, x2, y2, index, currindex, n, yy;
var arr1 = [{ content: 11, id: 1 }, { content: 22, id: 2 }, { content: 33, id: 3 }, { content: 44, id: 4 }, { content: 55, id: 5 }];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainx: 0,
    content: [{ content: 11, id: 1 }, { content: 22, id: 2 }, { content: 33, id: 3 }, { content: 44, id: 4 }, { content: 55, id: 5 }],
    start: { x: 0, y: 0 }
  },
  movestart: function (e) {
    currindex = e.target.dataset.index;
    x = e.touches[0].clientX;
    y = e.touches[0].clientY;
    x1 = e.currentTarget.offsetLeft;
    y1 = e.currentTarget.offsetTop;
  },
  move: function (e) {
    yy = e.currentTarget.offsetTop;
    x2 = e.touches[0].clientX - x + x1;
    y2 = e.touches[0].clientY - y + y1;
    this.setData({
      mainx: currindex,
      opacity: 0.7,
      start: { x: x2, y: y2 }
    })
  },
  moveend: function () {
    if (y2 != 0) {
      var arr = [];
      for (var i = 0; i < this.data.content.length; i++) {
        arr.push(this.data.content[i]);
      }
      var nx = this.data.content.length;
      n = 1;
      for (var k = 2; k < nx; k++) {
        if (y2 > (52 * (k - 1) + k * 2 - 26)) {
          n = k;
        }
      }
      if (y2 > (52 * (nx - 1) + nx * 2 - 26)) {
        n = nx;
      }
      console.log(arr);
      console.log(arr1)
      arr.splice((currindex - 1), 1);
      arr.splice((n - 1), 0, arr1[currindex - 1]);
      arr1 = [];
      for (var m = 0; m < this.data.content.length; m++) {
        console.log(arr[m]);
        arr[m].id = m + 1;
        arr1.push(arr[m]);
      }
      // console.log(arr1);
      this.setData({
        mainx: "",
        content: arr,
        opacity: 1
      })
    }
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
  
  }
})