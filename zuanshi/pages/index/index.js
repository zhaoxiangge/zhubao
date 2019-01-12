//index.js
//获取应用实例
const app = getApp()


Page({
  //跳转搜索
  select: function () {
    wx: wx.navigateTo({
      url: '/pages/select/select',
    })
  },
  //跳转个人中心
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
  //刷新首页
  indexBtn() {
    wx: wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  //跳转详情页
  ring: function (e) {
    var id = e.target.dataset.id;
    wx: wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  },
  loadMore: function () {
    //1.获取二个数值 pno pageSize
    var pno = this.data.pageIndex + 1;
    var ps = this.data.pageSize;
    var hasMore = pno <= this.data.pageCount
    if (!hasMore) { return }
    //console.log(123)
    //2.发送ajax请求
    wx.request({
      url: 'http://192.168.42.167:3000/indexshops',
      data: { pno: pno, pageSize: ps },
      success: (result) => {
        //2.1保存返回数据data
        //console.log(result.data.data);
        var rows = this.data.nav3list.concat(
          result.data.data
        );

        this.setData({
          nav3list: rows,
          pageIndex: pno,
          pageCount: result.data.pageCount
        });
      },
    })
  },
  handleJump: function (e) {
    var id = e.target.dataset.id;
    var name = e.target.dataset.name;
    wx: wx.navigateTo({
      url: '/pages/shoplist/shoplist?id=' + id + "&name=" + name,
    })


  },
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    navlist: [],
    nav1list: [],
    src: "http://192.168.42.167:3000/img/png/icon_ser.jpg",
    nav3list: [],
    pageIndex: 0,
    pageSize: 8,
    pageCount: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.request({
      url: 'http://192.168.42.167:3000/getBanner',
      data: {},
      success: (res) => {
        this.setData({
          list: res.data.data,
        })
      }
    });
    wx.request({
      url: 'http://192.168.42.167:3000/getnav',
      data: {},
      success: (res) => {
        //console.log(res)
        this.setData({
          navlist: res.data.data
        })
      }
    });
    wx.request({
      url: 'http://192.168.42.167:3000/getnav1',
      data: {},
      success: (res) => {
        //console.log(res)
        this.setData({
          nav1list: res.data.data
        })
      }
    });
    this.loadMore();
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //获取用户信息
              app.globalData.userInfo = res.userInfo
              console.log(that.globalData.userInfo)
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
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})