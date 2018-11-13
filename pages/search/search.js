// pages/search/search.js
var url = "http://www.imooc.com/course/ajaxlist";
var page = 0;
var page_size = 5;
var sort = "last";
var is_easy = 0;
var lange_id = 0;
var pos_id = 0;
var unlearn = 0;

var searchValue = '';
//请求数据 
var loadMore = function (that) {

  wx.request({
    url: url,
    data: {
      page: page,
      page_size: page_size,
      sort: sort,
      is_easy: is_easy,
      lange_id: lange_id,
      pos_id: pos_id,
      unlearn: unlearn
    },
    /** header: {
       'content-type': 'application/json' // 默认值
     },**/
    success: function (res) {
      that.setData({
        cententInner: true
      });
      var list = that.data.list;
      for (var i = 0; i < res.data.list.length; i++) {
        list.push(res.data.list[i]);
      }
      that.setData({
        list: list
      });
      page++;
      that.setData({
        hidden: true
      });
    }
  });
};

Page({
  /**
   * 页面的初始数据
   */
  data: {
    centent_Show: true,
    centent: false,

    searchValue: '',
    hidden: true,
    list: [],
    scrollTop: 0,
    scrollHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //这里要注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    /**if (that.data.hidden) {
      that.setData({
        hidden: false
      });
      loadMore(that);
    } else {
      return false;
    }**/
  },
  searchValueInput: function (e) {
    var value = e.detail.value;
    this.setData({
      searchValue: value,
      cententInner: false
    });
    if (value || this.data.searchValue.length != 0) {
      this.setData({
        centent: false,
        cententInner: false
      });
    }

  },
  //页面滑动到底部
  bindDownLoad: function () {
    var that = this;
    if (that.data.hidden) {
      that.setData({
        hidden: false
      });
      loadMore(that);
    } else {
      return false;
    }

    //console.log("lower");
  },
  scroll: function (event) {
    //该方法绑定了页面滚动时的事件，这里记录了当前position.y的值，为了请求数据之后把页面定位到这里来。
    /* this.setData({
       scrollTop:event.detail.scrollTop
     });*/
  },
  topLoad: function (event) {
    //该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    page = 0;
    this.setData({
      list: [],
      scrollTop: 0
    });
    var that = this;
    if (that.data.hidden) {
      that.setData({
        hidden: false
      });
      loadMore(that);
    } else {
      return false;
    }
    //console.log("upper");
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  suo: function (e) {
    //这里要注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    /** var that = this;
      if (!that.data.searchValue || this.data.searchValue.length == 0) {
        this.setData({
          centent: true
        });
      }
    wx.getSystemInfo({
        success: function (res) {
          that.setData({
            scrollHeight: res.windowHeight
          });
        }
      });
      if (!that.data.centent && that.data.hidden) {
        that.setData({
          hidden: false
        });
        loadMore(that);
      } else {
        return false;
      }**/
    var str = '白金';
    console.log(str);
    wx.request({
      url: "http://13.209.72.50/gpcka/search/" + str,
      dataType: "json",
      method: 'post',
      success: function (res) {
        console.log(res.data);
      }
    });
  },

  bindcard: function () {

    wx.navigateTo({

      url: '../bindcard/bindcard', //

      success: function () {

        console.log('success');

      },       //成功后的回调；

      fail: function () { console.log('error'); },         //失败后的回调；

      complete: function () { }      //结束后的回调(成功，失败都会执行)

    })
  },




})