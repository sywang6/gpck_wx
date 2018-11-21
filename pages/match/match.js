// pages/match/match.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
      skip:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
  },
  // 重画
  reDraw: function () {
    var pages = getCurrentPages(); //当前页面
    var beforePage = pages[pages.length - 2]; //前一个页面
    wx.navigateBack({
      success: function () {
        beforePage.onLoad(); //执行前一个页面的onload方法
      }
    })
  },
  keyWord: function () {
    wx.switchTab({
      url: '../search/search'
    })
  },
  kinds: function () {
    wx.switchTab({
      url: '../cards/cards'
    })
  },
  bindcard: function () {
    wx.navigateTo({
      url: '../bindcard/bindcard'
    })
  },
  //当页面隐藏时，跳转到指定页面
  onHide: function () {
    console.log(this.data.skip);
    if (this.data.skip){
      wx.reLaunch({
        url: '../draw/draw'
      })
    }else{
      wx.reLaunch({
        url: '../index/index'
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res){
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '猜画小卡',
      path: '/page/index'
    }
  }
})