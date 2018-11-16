// pages/cards/cards.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 请求数据
    wx.request({
        url: "http://13.209.72.50/gpcka/searchCcType",
        dataType: "json",
        method: 'get',
        success(res) {
          that.setData({
            cardList: res.data
          });
        }
       })
  },
  onPostType: function(event){
    let cctype = event.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../item/item?cctype=' + cctype 
    })
  }
})