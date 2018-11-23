// pages/match/match.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chanceFlag:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'recommendedCard',
      success(res) {
        that.setData({
          pic:res.data.pic,
          ccname:res.data.ccname
        });
      }
    })
    wx.getStorage({
      key: 'chanceFlag',
      success(res) {
        that.setData({
          chanceFlag: res.data
        });
      }
    })
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
  keyWord: function (){
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
  },
  onHide: function(e){
    console.log(e);
  }
})