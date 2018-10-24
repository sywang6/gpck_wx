// pages/cards/cards.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardList : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    // 请求数据
     /**wx.request({
          url: 'test.php', //仅为示例，并非真实的接口地址
          data: {
            x: '',
            y: ''
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res.data)
          }
        })**/
        this.setData({
          cardList: [
            {
              'type': '交通银行标准信用卡',
              'id': '001'
            },
            {
              'type': '交通银行Y-power信用卡',
              'id': '002'
            },
            {
              'type': '交通银行bilibili主题卡',
              'id': '003'
            },
            {
              'type': '交通银行高达主题信用卡',
              'id': '004'
            },
            {
              'type': '交通银行程序员主题信用卡',
              'id': '005'
            }
          ]
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})