// pages/item/item.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    // 拼接请求url
    //const url = "https://api.douban.com/v2/movie/subject/" + options.id;
    /**wx.request({
        url: url,
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
      cards: [
        {
          'name': '交通银行标准信用卡',
          'src': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540361832554&di=7d0d8ff4eff3f9743534505babfeaab8&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170704%2F0a4b78fc08924af1ad4226b96e73b696_th.png',
          'id': '0011',
          'detail': '信用卡描述信用卡描述信用卡描述信用卡描述信用卡描述信用卡描述信用卡描述信用卡描述信用卡描述信用卡描述信用卡描述信用卡描述信用卡描述'
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