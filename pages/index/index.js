//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '欢迎使用！',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    admin_password: "",
    modalHidden: true,
    toast1Hidden: true,
    notice_str: '',
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('测试开关为：' + app.globalData.running_mode + "，使用URL：" + app.get_url())
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    var that = this
    wx.authorize({
      scope: 'scope.userInfo',
      success(res) {
        //console.log('获取头像、昵称授权成功')
        wx.getUserInfo({  //获得个人信息
          success: function (res) {
            console.log("wx.authorize返回值：")
            console.log(res.userInfo)
            app.globalData.userInfo = res.userInfo
            that.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      },
      fail() {
      }
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  Daily: function () {
    var that = this
    var role = app.globalData.user_info["role"]
    if (role == 'CM' || role == 'leader' || role == 'vice_leader' ) {
      wx.navigateTo({
        url: '../Daily/Daily'
      })
    } else if (role == 'admin' || role == 'super_admin') {
      wx.navigateTo({
        url: '../Daily/Admin'
      })
    } else {
      wx.navigateTo({
        url: '../Daily/Admin'
      })
    }
  },
  History: function () {
    var that = this
    var role = app.globalData.user_info["role"]
    if (role == 'CM' || role == 'leader' || role == 'vice_leader') {
      wx.navigateTo({
        url: '../Display/History'
      })
    } else if (role == 'admin' || role == 'super_admin') {
      that.setData({
        toast1Hidden: false,
        notice_str: '您是管理员，请直接进入管理员页面！'
      });
    } else{
      that.setData({
        toast1Hidden: false,
        notice_str: '您没有权限，请联系管理员！'
      });
    }
  },
  bind_password_change: function (e) {
    console.log("输入密码改变：" + e.detail.value)
    this.setData({
      admin_password: e.detail.value
    })
  },
  bind_password_input: function (e) {
    this.setData({
      admin_password: e.detail.value
    })
  },
  toast1Change: function (e) {
    this.setData({ toast1Hidden: true });
  },
  Manage: function () {
    var that = this
    var role = app.globalData.user_info["role"]
    if (role == 'admin' || role == 'super_admin') {
      wx.navigateTo({
        url: '../index/Manage'
      })
    }
    else {
      this.setData({
        modalHidden: false
      })
    }

  },
  confirm_one: function () {
    var that = this
    console.log("admin_password:" + this.data.admin_password)
    wx.request({
      url: app.get_url() + "admin",
      data: {
        "admin_password": that.data.admin_password,
        "user_name": app.globalData.user_name,
        "page": "/index/index",
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("/api/admin返回值：")
        console.log(res.data)
        that.setData({
          admin_password: ""
        });
        if (res.data == "access") {
          that.setData({
            modalHidden: true,
            toast1Hidden: false,
            notice_str: '密码正确'
          });
          wx.navigateTo({
            url: '../index/Manage'
          })
        }
        else {
          that.setData({
            modalHidden: true,
            toast1Hidden: false,
            notice_str: '密码错误'
          });
        }
      }
    })
  },
  cancel_one: function (e) {
    console.log(e);
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '取消成功',
      admin_password: ""
    });
  },
})
