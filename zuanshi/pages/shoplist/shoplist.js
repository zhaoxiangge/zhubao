// pages/shoplist/shoplist.js
Page({
  ring:function(e){
    var id = e.target.dataset.id;
    wx: wx.navigateTo({
      url: '/pages/detail/detail?id='+id,
    })
  },
  price:function(){
    if(this.data.istop){
      this.setData({
        istop:false
      })
    }else{
      this.setData({
        istop: true
      })
    }
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
      url: 'http://192.168.42.167:3000/indexshops1',
      data: { pno: pno, pageSize: ps,id:this.data.id },
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
  handleJump:function(){
    wx.request({
      url: 'http://192.168.42.167:3000/shophander',
      data: { id: this.data.id },
      success: (res) => {
        this.setData({
          list: res.data.data[0]
        })
      }
    });
  },
  /**
   * 页面的初始数据
   */
  data: {
    nav3list:[],
    pageIndex:0,
    pageSize:8,
    pageCount:1,
    id:"",
    name:"",
    list:[],
    istop:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id,
      name:options.name
    });
    this.loadMore();
    wx.setNavigationBarTitle({
      title: this.data.name
    });
    this.handleJump();
    this.price();
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
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})