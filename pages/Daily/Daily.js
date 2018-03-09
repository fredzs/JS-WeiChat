var app = getApp();
var empty_list = []
var wrong_float_list = []
var flist = new Set()
Page({
  data: {
    dept_name: "",
    fields_name: {},
    date: "",
    submit_user: "",
    extra_fields: {},
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    modalHidden3: true,
    modalHidden4: true,
    modalHidden5: true,
    modalHidden6: true,
    modalHidden7: true,
    notice_str: '',
    empty_fields: "",
    wrong_floats: "",
    comments: ""
  },
  check_input: function () {
    var that = this
    var f = this.data.extra_fields
    var l = this.data.fields_name
    empty_list = []
    wrong_float_list = []
    for (var field in l) {
      var value = f[l[field].field_id]
      if (value == "") {
        empty_list.push("[" + l[field].field_name + "]")
      }
      else if (flist.has(l[field].field_id)) {
        if (!that.check_float(value)) {
          wrong_float_list.push("[" + l[field].field_name + "]")
        }
      }
    }
    return
  },
  check_float: function (str) {
    var r = /^\d+(\.\d+)?$/　　//非负浮点数
    var result = r.test(str); //str为你要判断的字符 执行返回结果 true 或 false 
    return result
  },
  submint_user_input: function (e) {
    //console.log("报送人姓名改变：" + e.detail.value)
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
  modalTap3: function () {
    this.setData({
      modalHidden3: false,
      empty_fields: empty_list
    })
  },
  modalTap4: function () {
    this.setData({
      modalHidden7: false,
      wrong_floats: wrong_float_list
    })
  },
  confirm_one: function () {
    var that = this;
    wx.request({
      url: app.get_url() + "find",
      data: {
        "dept_id": app.globalData.dept_info.dept_id,
        "date": that.data.date,
        "user_name": app.globalData.user_name,
        "page": "/Daily/Daily",
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log("/api/find返回值：")
        console.log(res.data)
        var submit_user = res.data.submit_user
        var submit_time = res.data.submit_time
        that.setData({
          submit_user: submit_user,
          submit_time: submit_time,
        })
        if (submit_user != "") {
          that.setData({
            modalHidden: true,
            modalHidden5: false,
          })
        } else {
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
      url: app.get_url() + "performance",
      method: 'POST',
      data: {
        "dept_id": app.globalData.dept_info.dept_id,
        "date": that.data.date,
        "submit_user": app.globalData.user_name,
        "extra_fields": that.data.extra_fields,
        "user_name": app.globalData.user_name,
        "comments": that.data.comments,
        "page": "/Daily/Daily",
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("/api/performance返回值：")
        console.log(res.data)
        if (res.data == "success") {
          that.setData({
            notice_str: '提交成功'
          });
        } else {
          that.setData({
            notice_str: '提交失败：' + res.data
          });
        }
        that.setData({
          modalHidden: true,
          modalHidden5: true,
          toast1Hidden: false,
        })
      }
    })
  },
  cancel_one: function (e) {
    //console.log(e);
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
  modalChange7: function (e) {
    this.setData({
      modalHidden7: true
    })
  },
  modalChange4: function (e) {
    wx.navigateTo({
      url: '../index/index'
    })
  },
  bindDateChange: function (e) {
    //console.log('Date发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  onLoad: function (options) {
    wx.request({
      url: app.get_url() + "log",
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        "user_name": app.globalData.user_name,
        "page": "/Daily/Daily",
        "method": "browse",
        "content": "提交业绩页面"
      }
    })
    if (app.globalData.userInfo != null) {
      this.setData({
        date: app.globalData.today_str,
        dept_name : app.globalData.dept_info.dept_name,
        submit_user: app.globalData.user_name
      })
      var that = this
      //获取字段名列表
      wx.request({
        url: app.get_url() + "fields_name",
        header: {
          "Content-Type": "application/json"
        },
        data: {
          "user_name": app.globalData.user_name,
          "page": "/Daily/Daily",
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
          }
        },
        fail: function (err) {
          console.log(err)
        }
      })
    } else {
      console.log('无获取昵称权限');
      this.setData({
        modalHidden6: false
      })
    }
  },
  bind_comments: function (e) {
    console.log('输入备注：' + e.detail.value);
    this.setData({
      comments: e.detail.value
    })
  },
  bind_float: function (e) {
    console.log(e);
    var t = e.currentTarget.dataset.t
    if (t == 'f') {
      var idd = e.currentTarget.dataset.idd
      console.log(idd);      
      var d = { idd: t}
      flist.add(idd)
    }
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件');
    console.log(e);
    this.setData({
      extra_fields: e.detail.value
    })
    this.check_input();
    if (wrong_float_list.length == 0) {
      if (empty_list.length == 0) {
        this.modalTap();
      }
      else {
        this.modalTap3();
      }
    } else {
      this.modalTap4();
    }
  },
  formReset: function () {
    console.log('form发生了reset事件');
    this.modalTap2();
  }
})  