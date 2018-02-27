var app = getApp();
//var focus_list=[]
Page({
  data: {
    // text:"这是一个页面"  
    nick_name: "",
    dept_list: {},
    fields_name: {},
    //focus_list: [],
    dept_id: 1,
    date: "",
    submit_user: "",
    extra_fields: {},
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    modalHidden3: true,
    modalHidden4: true,
    modalHidden5: true,
    notice_str: '',
    index: 0
  },
  check_input: function () {
    var f = this.data.extra_fields
    var l = this.data.fields_name
    for (var field in l) {
      if (f[l[field].field_id] == "") {
        return false
      }
    }
    return true
  },
  submint_user_input: function (e) {
    console.log("报送人姓名改变：" + e.detail.value)
    this.setData({
      submit_user: e.detail.value
    })
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
  confirm_one: function (){
    var that = this;
    wx.request({
      url: 'https://fredirox.com/api/find',
      data: {
        "dept_id": that.data.dept_id,
        "date": that.data.date,
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res.data)
        var submit_user = res.data.submit_user
        var submit_time = res.data.submit_time
        that.setData({
          submit_user: submit_user,
          submit_time: submit_time,
        })
        if (submit_user != ""){
          that.setData({
            modalHidden: true,
            modalHidden5: false,
          })
        } else{
          that.submit()
        }
      },
    })
  },
  confirm_two: function () {
    this.submit()
  },
  submit: function () {
    var that = this;
    wx.request({
      url: 'https://fredirox.com/api/submit',
      method: 'POST',
      data: {
        "dept_id": that.data.dept_id,
        "date": that.data.date,
        "submit_user": that.data.nick_name,//that.data.submit_user,
        "extra_fields": that.data.extra_fields
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          modalHidden: true,
          modalHidden5: true,
          toast1Hidden: false,
        })
        if (res.data == "success") {
          that.setData({
            notice_str: '提交成功'
          });
        } else {
          that.setData({
            notice_str: '提交失败：' + res.data
          });
        }
      }
    })
  },
  cancel_one: function (e) {
    console.log(e);
    this.setData({
      modalHidden: true,
      modalHidden5: true,
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
  modalChange3: function (e) {
    this.setData({
      modalHidden3: true
    })
  },
  modalChange4: function (e) {
    wx.navigateTo({
      url: '../index/index'
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
  // bind_next: function (e) {
  //   console.log('输入完毕，跳到下一个input', e.detail)
  //   focus_list[e]
  // },
  onLoad: function (options) {
    this.setData({
      nick_name: app.globalData.userInfo.nickName,
      date: app.globalData.today_str
    })
    var that = this
    //获取网点列表  
    wx.request({
      url: "https://fredirox.com/api/branches",
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log("/api/branches返回值：")
        console.log(res.data)
        if (res.statusCode == 502) {
          that.setData({
            modalHidden4: false
          })
        } else {
          that.setData({
            dept_list: res.data,
            index: 0, //res.data[0].dept_id
          })
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
    //获取字段名列表
    wx.request({
      url: "https://fredirox.com/api/fields_name",
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log("/api/fields_name返回值：")
        console.log(res.data)
        if (res.statusCode == 502) {
          that.setData({
            modalHidden4: false
          })
        } else {
          that.setData({
            fields_name: res.data,
          })
          // var field_amount = res.data.length
          // for (var i = 0; i < field_amount; i++) {
          //   focus_list.push(false)
          // }
          // that.setData({
          //   focus_list: focus_list,
          // })
          // console.log(that.data.focus_list)
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
    // 页面初始化 options为页面跳转所带来的参数  
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件');
    this.setData({
      extra_fields: e.detail.value
    })
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