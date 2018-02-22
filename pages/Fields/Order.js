// pages/Fields/Order.js
var app = getApp();
var x, y, x1, y1, x2, y2, index, n, yy;

var current_index = 0;
var start_point = { x: 0, y: 0 };
var box_offset = { x: 0, y: 0 };
var end_point = { x: 0, y: 0 };
var new_order = [];
Page({
  data: {
    mainx: 0,
    start_point: { x: 0, y: 0 },
    fields: [],
  },
  // 开始触摸
  movestart: function (e) {
    current_index = e.target.dataset.index;
    start_point = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    box_offset = { x: e.currentTarget.offsetLeft, y: e.currentTarget.offsetTop}
    console.log(current_index, start_point, box_offset)
  },
  //触摸点移动
  move: function (e) {
    //yy = e.currentTarget.offsetTop;
    end_point = { x: e.touches[0].clientX - start_point.x + box_offset.x, y: e.touches[0].clientY - start_point.y + box_offset.y }
    // x2 = e.touches[0].clientX - x + x1;
    // y2 = e.touches[0].clientY - y + y1;
    // console.log(end_point)
    this.setData({
      mainx: current_index,
      opacity: 0.7,
      start_point: { x: end_point.x, y: end_point.y }
    })
  },
  //触摸结束
  moveend: function () {
    y2 = end_point.y
    if (y2 != 0) {
      var old_order = [];
      for (var i = 0; i < this.data.fields.length; i++) {
        var obj = this.data.fields[i].order_index
        old_order.push(obj);
      }
      console.log("old_order", old_order);
      var nx = this.data.fields.length;
      n = 1;
      for (var k = 2; k < nx; k++) {
        if (y2 > (52 * (k - 1) + k * 2 - 26)) {
          n = k;
        }
      }
      if (y2 > (52 * (nx - 1) + nx * 2 - 26)) {
        n = nx;
      }
      old_order.splice((current_index - 1), 1);
      console.log("old_order", old_order);
      old_order.splice((n - 1), 0, new_order[current_index - 1]);
      console.log("old_order", old_order);
      new_order = [];
      for (var m = 0; m < this.data.fields.length; m++) {
        old_order[m] = m + 1;
        new_order.push(old_order[m]);
      }
      console.log("old_order", old_order);
      console.log("new_order", new_order);
      this.setData({
        mainx: "",
        fields: old_order,
        opacity: 1
      })
    }
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
        })
      },
    })
  },
})