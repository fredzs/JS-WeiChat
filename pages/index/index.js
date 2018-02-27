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
    wx.navigateTo({
      url: '../Daily/Daily'
    })
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
    this.setData({
      modalHidden: false
    })
  },
  confirm_one: function () {
    var that = this
    console.log("admin_password:" + this.data.admin_password)
    wx.request({
      url: 'https://fredirox.com/api/admin',
      data: {
        "admin_password": that.data.admin_password,
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
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
