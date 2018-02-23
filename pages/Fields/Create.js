// pages/Fields/Create.js
Page({
  data: {
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    modalHidden3: true,
    notice_str: '',
    type_list: ["string", "int", "bool"],
    type_index: { "string": 0, "int": 1, "bool": 2 },
    field_name: "",
    field_type: 0,
  },
  check_input: function () {
    if (this.data.field_name == "") {
      return false
    }
    return true
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
  confirm_one: function () {
    var that = this;
    wx.request({
      url: 'https://127.0.0.1:5000/api/create_field',
      method: 'POST',
      data: {
        "field_name": that.data.field_name,
        "field_type": that.data.field_type[0]
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          modalHidden: true,
          toast1Hidden: false,
          notice_str: '提交成功'
        });
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
    console.log('field_name发送选择改变，携带值为', e.detail.value)
    this.setData({
      field_name: e.detail.value,
    })
  },
  bind_type_change: function (e) {
    console.log('field_type发送选择改变，携带值为', e.detail.value)
    const val = e.detail.value
    this.setData({
      field_type: e.detail.value,
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
  formSubmit: function (e) {
    console.log('form发生了submit事件');
    var check = this.check_input();
    if (check) {
      this.modalTap();
    }
    else {
      this.modalTap3();
    }
  },
  formReset: function () {
    console.log('form发生了reset事件');
    this.modalTap2();
  }
})