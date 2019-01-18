// pages/profile/profile.js
Page({
  //刷新个人中心
  profile: function () {
    wx: wx.navigateTo({
      url: '/pages/profile/profile',
    })
  },
  //跳转购物车
  shopCard: function () {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx: wx.navigateTo({
            url: '/pages/shopCart/shopCart',
          })
        } else {
          wx: wx.navigateTo({
            url: '/pages/login/login',
          })
        }
      }
    })
  },
  //跳转首页
  indexBtn() {
    wx: wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    url: "http://127.0.0.1:3000/img/info/info-01.jpg"
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