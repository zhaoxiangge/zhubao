//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;
    wx.login({
      success: res => {
        wx.request({
          url: that.globalData.wx_url_1 + res.code + that.globalData.wx_url_2,
          header: {
            'content-type': 'application/json'
          },
          success: res => {
            that.globalData.openid = res.data.openid;
            //console.log(res.data.openid)
            //console.log(that.globalData.openid)
            //获取用户id
            wx.request({
              url: 'http://192.168.42.167:3000/addId',
              data: { openid: res.data.openid },
              success: (res) => {
                //console.log(res)
                if (res.data.data[0]) {
                  that.globalData.uid = res.data.data[0].uid
                } else {
                  that.globalData.uid = 0;
                }
              }
            });
          }
        })
      }
    });
  },
  globalData: {
    userInfo: null,
    loginName: null,
    urlPath: null,
    openid: 0,
    uid: "",
    wx_url_1: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxc0369836b29cd663&secret=52885f51ca166b0593833f26fb738315&js_code=',
    wx_url_2: '&grant_type=authorization_code'
  }
})