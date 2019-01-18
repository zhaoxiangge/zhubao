// pages/detail/detail.js
const app = getApp()
Page({
  //跳转首页
  indexBtn: function () {
    wx: wx.navigateTo({
      url: '/pages/index/index'
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
  //加入购物车
  addCard: function () {
    // 查看是否授权
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.request({
            url: 'http://192.168.42.167:3000/addCart',
            data: { id: this.data.id, uid: app.globalData.uid },
            success: (res) => {
              wx.showToast({
                title: res.data.msg,
                icon: "success",
                duration: 1500
              });
            }
          });
        } else {
          wx: wx.navigateTo({
            url: '/pages/login/login',
          })
        }
      }
    })
  },
  //切换商品详情
  changeArea: function (e) {
    var area = e.target.dataset.area;
    this.setData({
      select: area
    })
  },
  //加载详情页初始数据
  header: function () {
    wx.request({
      url: 'http://192.168.42.167:3000/getdetail',
      data: { id: this.data.id },
      success: (res) => {
        this.setData({
          list: res.data.data
        })
      }
    });
  },
  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    list: [
      { id: 1, img: "http://192.168.42.167:3000/img/banner/banner-01.jpg" },
      { id: 2, img: "http://192.168.42.167:3000/img/banner/banner-02.jpg" },
      { id: 3, img: "http://192.168.42.167:3000/img/banner/banner-03.jpg" },
      { id: 4, img: "http://192.168.42.167:3000/img/banner/banner-01.jpg" }
    ],
    list1: [],
    list2: [],
    select: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options.id)
    this.setData({
      id: options.id
    });
    this.header();
    //初始数据加载商品详情查询
    wx.request({
      url: 'http://192.168.42.167:3000/getdetail1',
      data: { id: this.data.id },
      success: (res) => {
        this.setData({
          list1: res.data.data[0]
        })
      }
    });
    //商品图文详情查询
    wx.request({
      url: 'http://192.168.42.167:3000/getdetail2',
      data: { id: this.data.id },
      success: (res) => {
        this.setData({
          list2: res.data.data
        })
      }
    });
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