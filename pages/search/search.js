// pages/search/search.js
var url = "http://13.209.72.50/gpcka/search/";
var searchValue = '';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    centent_Show: false,
    centent: false,
    searchValue: '',
    hidden: true,
    uhide: 0,
    cardsInfo: '',
    itemId: '',
    load: false,
    timeout: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //这里要注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
  
  },
  //UTF-8转UTF-16
  change: function(str) {
    //debugger
    return encodeURI(str,"utf-8");
  },
  searchValueInput: function(e) {
    var value = e.detail.value;
    this.setData({
      searchValue: value
    });
    if (value || this.data.searchValue.length != 0) {
      this.setData({
        centent: false
      });
    };
    this.setData({
      cententInner: false,
      centent_Show: false,
      hidden: true,
      uhide: 0,
      cardsInfo: '',
      itemId: '',
      timeout: false
    });
  },

  suo: function(e) {
    var that = this;
    that.setData({
      load: false
    });
    if (!that.data.searchValue || this.data.searchValue.length == 0) {
      this.setData({
        centent: true
      });
    }
    if (!that.data.centent && that.data.hidden) {
      that.setData({
        hidden: false
      });
      var str = that.data.searchValue;
      wx.request({
       url: "http://13.209.72.50/gpcka/search/" + that.change(str),
        dataType: "json",
        method: 'post',
        success: function(res) {
          that.setData({
            load: true,
            hidden: true
          });
          console.log(res.data);
          if (res.data.length > 0) {
            that.setData({
              cardsInfo: res.data,
              cententInner: true,
              len: res.data.length
            });
            if (res.data.length == 1) {
              that.setData({
                uhide: 1
              })
            }
          } else {
            that.setData({
              centent_Show: true
            });
          }
        },
        fail: function() {
          console.log('error');
          that.setData({
            load: true,
            timeout: true
          });
        }
      });
    } else {
      return false;
    }
  },
  //点击切换隐藏和显示
  toggleBtn: function(event) {
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
  imageError: function(e) {
    var _errImg = e.target.dataset.img
    var _errObj = {}
    _errObj[_errImg] = "../../images/timg.png"
    this.setData(_errObj) //注意这里的赋值方式,只是将数据列表中的此项图片路径值替换掉  
  },
  
  bindcard: function() {

    wx.navigateTo({

      url: '../bindcard/bindcard', //

      success: function() {

        console.log('success');

      }, //成功后的回调；

      fail: function() {
        console.log('error');
      }, //失败后的回调；

      complete: function() {} //结束后的回调(成功，失败都会执行)

    })
  },




})