// pages/shopCart/shopCart.js
const app = getApp()
Page({
  //选中
  select: function (e) {
    var sum = this.data.sum1;
    var idx = e.target.dataset.id;
    if (this.data.list1[idx]) {
      var QC = this.data.list[idx].price;
      sum -= parseFloat(QC)
      this.setData({
        sum1: sum
      })
    } else {
      var QC = this.data.list[idx].price;
      sum += parseFloat(QC)
      this.setData({
        sum1: sum
      })
    }
    //console.log(idx)
    var list2 = this.data.list1.map((item, index, list1) => {
      if (idx == index) {
        return !item
      } else { return item }
    })
    this.setData({
      list1: list2
    })
    var arr = this.data.list1
    var bo = arr.every((item, index, arr) => {
      return item == 1
    })
    if (bo) {
      this.setData({
        select: true
      })
    } else {
      this.setData({
        select: false
      })
    }
    //console.log(this.data.list1)
  },
  //全选
  selectAll: function () {
    this.setData({
      select: !this.data.select
    })
    if (this.data.select) {
      var list2 = this.data.list1.map((item, index, list1) => {
        return item = 1
      })
      this.setData({
        list1: list2,
        sum1: this.data.sum
      })
      //console.log(this.data.list1)
    } else {
      var list3 = this.data.list1.map((item, index, list1) => {
        return item = 0
      })
      this.setData({
        list1: list3,
        sum1: 0
      })
    }
  },
  addCard: function () {
    wx: wx.navigateTo({
      url: '/pages/shopCard/shopCard',
    })
  },
  del: function (e) {
    var cid = e.target.dataset.cid;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: (res) => {
        if (res.confirm) {
          wx.request({
            url: 'http://192.168.42.167:3000/delCart',
            data: { cid: cid },
            success: (res) => {
              this.setData({
                msg: res.data.msg
              });
              wx.showToast({
                title: this.data.msg,
                icon: 'success',
                duration: 1500
              })
            }
          });
          wx: wx.redirectTo({
            url: '/pages/shopCart/shopCart',
          })
        }
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    msg: "",
    select: false,
    sum: 0,
    list1: [],
    select: false,
    sum1: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(app.globalData.uid)
    wx.request({
      url: 'http://192.168.42.167:3000/getCarts',
      data: { uid: app.globalData.uid },
      success: (res) => {
        //console.log(res.data)
        this.setData({
          list: res.data.data
        });
        var sum = 0;
        var list2 = [];
        for (var i = 0; i < this.data.list.length; i++) {
          var QC = this.data.list[i].price;
          list2.push(0)
          sum += parseFloat(QC)
        }
        this.setData({
          sum: sum,
          list1: list2
        })
        //console.log(this.data.list1)
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