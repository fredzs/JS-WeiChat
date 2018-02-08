var app = getApp();
var today = new Date();
function date_str(date){
  var yy = date.getFullYear()
  var mm = date.getMonth() + 1
  var dd = date.getDate()
  if (mm <10) {
    mm = '0' + mm
  }
  if (dd < 10) {
    dd = '0' + dd
  }
  return yy+'-'+mm+'-'+dd
};

Page({
  data: {
    // text:"这是一个页面"  
    dept_list: {},
    dept_id: 1,
    date: date_str(today),
    submit_user: "test",
    extra_fields: {},
    array: ["营业部", "首都机场", "香河园", "四元桥"],
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    notice_str: '',
    index: 0
  },
  toast1Change: function (e) {
    this.setData({ toast1Hidden: true });
  },
  //弹出确认框  
  modalTap: function (e) {
    this.setData({
      modalHidden: false
    })
  },
  confirm_one: function (e) {
    console.log(e);
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '提交成功'
    });
  },
  cancel_one: function (e) {
    console.log(e);
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '取消成功'
    });
  },
  //弹出提示框  
  modalTap2: function (e) {
    this.setData({
      modalHidden2: false
    })
  },
  modalChange2: function (e) {
    this.setData({
      modalHidden2: true
    })
  },
  bindPickerChange: function (e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      dept_id: that.data.dept_list[e.detail.value].dept_id
    })
    console.log("dept_id:", this.data.dept_id)
  },
  bindDateChange: function (e) {
    console.log('Date发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  onLoad: function (options) {
    var that = this
    //获取网点列表  
    wx.request({
      url: "http://127.0.0.1:5000/api/branches",
      header: {
        "Content-Type":"application/json"
      },
      success: function (res) {
        //console.log(res.data);
        that.setData({
          dept_list: res.data,
          index: 0//res.data[0].dept_id
        })
        console.log(that.data.dept_list)
      },
      fail: function (err) {
        console.log(err)
      }
    })
    // 页面初始化 options为页面跳转所带来的参数  
  },
  onReady: function () {
    // 页面渲染完成  
  },
  onShow: function () {
    // 页面显示  
  },
  onHide: function () {
    // 页面隐藏  
  },
  onUnload: function () {
    // 页面关闭  
  },
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    console.log(formData)
    wx.request({
      url: 'http://127.0.0.1:5000/api/submit',
      method: 'POST',
      data: {
        "dept_id":that.data.dept_id,
        "date":that.data.date,
        "submit_user": formData.submit_user,
        "extra_fields":{"field1":"test"}
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(that.data)
        //that.modalTap();
      }
    })
  },
  formReset: function () {
    console.log('form发生了reset事件');
    this.modalTap2();
  }
})  