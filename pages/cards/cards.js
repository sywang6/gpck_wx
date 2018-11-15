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
          'ccname': '交通银行标准信用卡',
          'cctype': 'platiunm'
        },
        {
          'ccname': '交通银行Y-power信用卡',
          'cctype': '002'
        },
        {
          'ccname': '交通银行bilibili主题卡',
          'cctype': '003'
        },
        {
          'ccname': '交通银行高达主题信用卡',
          'cctype': '004'
        },
        {
          'ccname': '交通银行程序员主题信用卡',
          'cctype': '005'
        }
      ]
    })

  },
  onPostType: function(event){
    let cctype = event.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../item/item?cctype=' + cctype 
    })
  }
})