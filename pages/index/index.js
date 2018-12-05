const app = getApp();
Page({
  data: {
    userInfo: null
  },
  onLoad: function(options) {
    var that = this;
    that.setData({
      userInfo: app.globalData.userInfo
    });
  },
  onShow: function() {
    wx.setNavigationBarTitle({
      title: '猜画小卡'
    });
  },
  change: function(str) {
    //debugger
    return encodeURI(str, "utf-8");
  },
  about: function(e) {
    wx.showModal({
      title: '提示',
      content: app.globalData.about || '',
      showCancel: false
    });
  },
  skipDraw: function(e) {
    wx.navigateTo({
      url: '/pages/draw/draw'
    })
  },
  keySearch: function (event) {
    var key = event.currentTarget.dataset.key;
    var that = this;
    wx.request({
      url: "http://13.209.72.50/gpcka/search/" + that.change(key),
      dataType: "json",
      method: 'post',
      success: function(res) {
        if(res.data[0]){
          wx.setStorage({
            key: "recommendedCard",
            data: res.data[0]
          });
          wx.setStorage({
            key: "chanceFlag",
            data: false
          });
          wx.navigateTo({
            url: '/pages/match/match'
          });
        }
      },
      fail: function() {
        console.log('error');
      }
    });
   
  }
});