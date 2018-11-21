// pages/item/item.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    uhide: 0,
    cardsInfo: '',
    itemId: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var cctype = options.cctype;
    // 拼接请求url
   var url = "http://13.209.72.50/gpcka/searchByType/" + cctype;
    wx.request({
      url: url,
      dataType: "json",
      header: {
        'content-type': 'json'
      },
      method: 'post',
      success: function(res) {
        if (res.data) {
          that.setData({
            cardsInfo: res.data,
            len: res.data.length
          });
          if (res.data.length == 1) {
            that.setData({
              uhide: 1
            })
          }
        }
      },
      fail: function () {
        console.log('error');
      }
    })
  },
  //点击切换隐藏和显示
  toggleBtn: function (event) {
    var that = this;
    if (that.data.len == 1) {
      return false
    }
    var toggleBtnVal = that.data.uhide;
    var itemId = event.currentTarget.dataset.bindex;
    if (toggleBtnVal == itemId) {
      that.setData({
        uhide: 0
      })
    } else {
      that.setData({
        uhide: itemId
      })
    }
  },
  //图片加载出错，替换为默认图片
  imageError: function (e) {
    var _errImg = e.target.dataset.img
    var _errObj = {}
    _errObj[_errImg] = "http://13.209.72.50/gpcka/images/baijin.png"
    this.setData(_errObj) //注意这里的赋值方式,只是将数据列表中的此项图片路径值替换掉  
  },
  bindcard: function () {

    wx.navigateTo({

      url: '../bindcard/bindcard'

    })
  },
})