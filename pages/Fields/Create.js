// pages/Fields/Create.js
var app = getApp();
Page({
  data: {
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    modalHidden3: true,
    modalHidden4: true,
    modalHidden5: true,
    notice_str: '',
    type_list: ["请选择", "int", "string", "bool"],
    type_index: { "请选择": 0, "int": 1, "string":2, "bool": 3 },
    field_name: "",
    field_type: 0,
    field_unit: ""
  },
  onLoad: function (options) {
    wx.request({
      url: app.get_url() + "logs",
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        "user_name": app.globalData.user_name,
        "page": "/WeChat/Fields/Create",
        "method": "browse",
        "content": "新增字段页面"
      }
    })
  },
  check_input: function () {
    if (this.data.field_name == "") {
      return 1
    }
    if (this.data.field_type == 0) {
      return 2
    }
    if (this.data.field_unit == "") {
      return 3
    }
    return 0
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
  modalTap3: function (e) {
    this.setData({
      modalHidden3: false
    })
  },
  modalTap4: function (e) {
    this.setData({
      modalHidden4: false
    })
  },
  modalTap5: function (e) {
    this.setData({
      modalHidden5: false
    })
  },
  confirm_one: function () {
    var that = this;
    wx.request({
      url: app.get_url() + "fields",
      method: 'POST',
      data: {
        "field_name": that.data.field_name,
        "field_type": that.data.field_type[0],
        "field_unit": that.data.field_unit,
        "user_name": app.globalData.user_name,
        "page": "/Fields/Create",
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("/api/fields 返回值：")
        console.log(res.data)
        if (res.data=="success"){
          that.setData({
            notice_str: '提交成功'
          });
        } else{
          that.setData({
            notice_str: '提交失败'
          });
        }
        that.setData({
          modalHidden: true,
          toast1Hidden: false,
        })
      }
    })
  },
  cancel_one: function (e) {
    console.log(e);
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '取消成功'
    });
  }, 
  bind_name_change: function (e) {
    var that = this
    //console.log('field_name发送选择改变，携带值为', e.detail.value)
    this.setData({
      field_name: e.detail.value,
    })
  },
  bind_name_input: function (e) {
    var that = this
    this.setData({
      field_name: e.detail.value,
    })
  },
  bind_type_change: function (e) {
    //console.log('field_type发送选择改变，携带值为', e.detail.value)
    const val = e.detail.value
    this.setData({
      field_type: e.detail.value,
    })
  },
  bind_unit_change: function (e) {
    var that = this
    //console.log('field_unit发送选择改变，携带值为', e.detail.value)
    this.setData({
      field_unit: e.detail.value,
    })
  },
  bind_unit_input: function (e) {
    var that = this
    this.setData({
      field_unit: e.detail.value,
    })
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
  modalChange3: function (e) {
    this.setData({
      modalHidden3: true
    })
  },
  modalChange4: function (e) {
    this.setData({
      modalHidden4: true
    })
  },
  modalChange5: function (e) {
    this.setData({
      modalHidden5: true
    })
  },
  formSubmit: function (e) {
    //console.log('form发生了submit事件');
    var check = this.check_input();
    if (check == 1){
      this.modalTap3();
    } else if (check == 2){
      this.modalTap4();
    } else if (check == 3) {
      this.modalTap5();
    }else if (check == 0){
      this.modalTap();
    }
  },
  formReset: function () {
    //console.log('form发生了reset事件');
    this.modalTap2();
  }
})