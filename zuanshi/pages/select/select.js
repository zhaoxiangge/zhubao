// pages/select/select.js
const app = getApp()
Page({
  history: function () {
    //存历史
    var inputValue = this.data.inputValue;
    var sercherStorage = this.data.sercherStorage;
    if (inputValue == "") {
      //输入为空时
    } else {
      // 将搜索历史放入记录
      if (sercherStorage.length < 6) {
        //遍历数组取出value值存入新数组
        var arr1 = [];
        sercherStorage.forEach((item, index, sercherStorage) => {
          arr1.push(item.value)
        })
        //判断数组中是否已存在
        var arrnum = arr1.indexOf(this.data.inputValue)
        if (arrnum == -1) {
          sercherStorage.unshift({
            value: inputValue,
            id: sercherStorage.length
          })
        } else {
          sercherStorage.splice(arrnum, 1);
          sercherStorage.unshift({
            value: inputValue,
            id: sercherStorage.length
          })
        }

      } else {
        sercherStorage.pop()//删除就记录
        //遍历数组取出value值存入新数组
        var arr1 = [];
        sercherStorage.forEach((item, index, sercherStorage) => {
          arr1.push(item.value)
        })
        //判断数组中是否已存在
        var arrnum = arr1.indexOf(this.data.inputValue)
        if (arrnum == -1) {
          sercherStorage.unshift({
            value: inputValue,
            id: sercherStorage.length
          })
        } else {
          sercherStorage.splice(arrnum, 1);
          sercherStorage.unshift({
            value: inputValue,
            id: sercherStorage.length
          })
        }
      }
      //将历史记录数组整体放入缓存
      wx.setStorageSync('sercherStorage', sercherStorage)
    }
  },
  //清楚缓存历史并关闭历史搜索框
  clearSearchStorage: function () {
    wx.clearStorageSync('sercherStorage')
    this.setData({
      sercherStorage: [],
      StorageFlag: false,
    })
  },


  //跳转详情页
  ring: function (e) {
    var id = e.target.dataset.id;
    console.log(id)
    wx: wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  },
  search: function (e) {
    this.setData({
      name: e.detail.value,
      inputValue: e.detail.value
    })
    //console.log(e.detail.value)
    //console.log(e.detail.value.length)
    if (!e.detail.value.length && !this.data.list1) {
      this.setData({
        isShow: true,
        isShow1: false
      })
    }
  },
  search2: function (e) {
    if (!e.detail.value.length && !this.data.list1) {
      this.setData({
        isShow: true
      })
    }
  },
  //搜索按钮
  search1: function () {
    if (this.data.name) {
      this.setData({
        isShow: false
      });
      //存历史
      history();
      wx.request({
        url: 'http://192.168.42.167:3000/search1',
        data: { keyword: this.data.name },
        success: (res) => {
          this.setData({
            list1: res.data.data
          })
          if (this.data.list1.length > 0) {
            this.setData({
              isShow1: false
            })
          } else {
            this.setData({
              isShow1: true
            })
          }
        }
      });
    }
  },
  //热门搜索、历史搜索
  handleJump: function (e) {
    this.setData({
      isShow: false
    })
    var idx = e.target.dataset.id;
    var name = this.data.list[idx].name
    this.setData({
      inputValue: name
    })
    //console.log(name)
    wx.request({
      url: 'http://192.168.42.167:3000/search1',
      data: { keyword: name },
      success: (res) => {
        this.setData({
          list1: res.data.data
        })
      }
    });
    //存历史
    //存历史
    var inputValue = this.data.inputValue;
    var sercherStorage = this.data.sercherStorage;
    if (inputValue == "") {
      //输入为空时
    } else {
      // 将搜索历史放入记录
      if (sercherStorage.length < 6) {
        //遍历数组取出value值存入新数组
        var arr1 = [];
        sercherStorage.forEach((item, index, sercherStorage) => {
          arr1.push(item.value)
        })
        //判断数组中是否已存在
        var arrnum = arr1.indexOf(this.data.inputValue)
        if (arrnum == -1) {
          sercherStorage.unshift({
            value: inputValue,
            id: sercherStorage.length
          })
        } else {
          sercherStorage.splice(arrnum, 1);
          sercherStorage.unshift({
            value: inputValue,
            id: sercherStorage.length
          })
        }

      } else {
        sercherStorage.pop()//删除就记录
        //遍历数组取出value值存入新数组
        var arr1 = [];
        sercherStorage.forEach((item, index, sercherStorage) => {
          arr1.push(item.value)
        })
        //判断数组中是否已存在
        var arrnum = arr1.indexOf(this.data.inputValue)
        if (arrnum == -1) {
          sercherStorage.unshift({
            value: inputValue,
            id: sercherStorage.length
          })
        } else {
          sercherStorage.splice(arrnum, 1);
          sercherStorage.unshift({
            value: inputValue,
            id: sercherStorage.length
          })
        }
      }
      //将历史记录数组整体放入缓存
      wx.setStorageSync('sercherStorage', sercherStorage)
    }
  },
  //热门搜索、历史搜索
  handleJump1: function (e) {
    this.setData({
      isShow: false
    })
    var idx = e.target.dataset.lid;
    var name = this.data.sercherStorage[idx].value
    this.setData({
      inputValue: name
    })
    //console.log(name)
    wx.request({
      url: 'http://192.168.42.167:3000/search1',
      data: { keyword: name },
      success: (res) => {
        this.setData({
          list1: res.data.data
        })
      }
    });
    //存历史
    //存历史
    var inputValue = this.data.inputValue;
    var sercherStorage = this.data.sercherStorage;
    if (inputValue == "") {
      //输入为空时
    } else {
      // 将搜索历史放入记录
      if (sercherStorage.length < 6) {
        //遍历数组取出value值存入新数组
        var arr1 = [];
        sercherStorage.forEach((item, index, sercherStorage) => {
          arr1.push(item.value)
        })
        //判断数组中是否已存在
        var arrnum = arr1.indexOf(this.data.inputValue)
        if (arrnum == -1) {
          sercherStorage.unshift({
            value: inputValue,
            id: sercherStorage.length
          })
        } else {
          sercherStorage.splice(arrnum, 1);
          sercherStorage.unshift({
            value: inputValue,
            id: sercherStorage.length
          })
        }

      } else {
        sercherStorage.pop()//删除就记录
        //遍历数组取出value值存入新数组
        var arr1 = [];
        sercherStorage.forEach((item, index, sercherStorage) => {
          arr1.push(item.value)
        })
        //判断数组中是否已存在
        var arrnum = arr1.indexOf(this.data.inputValue)
        if (arrnum == -1) {
          sercherStorage.unshift({
            value: inputValue,
            id: sercherStorage.length
          })
        } else {
          sercherStorage.splice(arrnum, 1);
          sercherStorage.unshift({
            value: inputValue,
            id: sercherStorage.length
          })
        }
      }
      //将历史记录数组整体放入缓存
      wx.setStorageSync('sercherStorage', sercherStorage)
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    src: "http://192.168.42.167:3000/img/png/icon_ser.jpg",
    list: [
      { uid: 1, name: "北极光" },
      { uid: 2, name: "永恒之约" },
      { uid: 3, name: "群花绮丽" },
      { uid: 4, name: "关爱之心" },
      { uid: 1, name: "美丽年华" }
    ],
    name: "",
    lsit1: [],
    isShow: true,
    isShow1: false,
    inputValue: "",//搜索框输入的值
    sercherStorage: [],
    StorageFlag: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      sercherStorage: wx.getStorageSync("sercherStorage") || []
    })
    if (this.data.sercherStorage.length > 0) {
      this.setData({
        StorageFlag: true
      })
    } else {
      this.setData({
        StorageFlag: false
      })
    }
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