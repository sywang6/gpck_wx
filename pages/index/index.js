const app = getApp();

Page({
  data: {
    userInfo: null,
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      userInfo: app.globalData.userInfo
    });
  },
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '猜画小卡'
    });
  },
  about: function (e) {
    wx.showModal({
      title: '提示',
      content: app.globalData.about || '',
      showCancel: false
    });
  },
  skipDraw: function (e) {
    wx.navigateTo({
      url: '/pages/draw/draw'
    })
  }
});
