var upng = require('../../utils/upng-js/UPNG.js')
var context = null;// 使用 wx.createContext 获取绘图上下文 context
var isButtonDown = false;//是否在绘制中
var arrx = [];//动作横坐标
var arry = [];//动作纵坐标
var arrz = [];//总做状态，标识按下到抬起的一个组合
var canvasw = 0;//画布宽度
var canvash = 0;//画布高度
// pages/shouxieban/shouxieban.js
Page({
  /**
 * 页面的初始数据
 */
  data: {
    //canvas宽高
    canvasw: 0,
    canvash: 0,
    //canvas生成的图片路径
    canvasimgsrc: ""
  },
  onHide: function () {

  },
  //画布初始化执行
  startCanvas: function () {
    var that = this;
    //创建canvas
    this.initCanvas();
    //获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        //canvasw = res.windowWidth - 0;//设备宽度
        canvasw = res.windowWidth - 100;//设备宽度
        canvash = canvasw;
        that.setData({ 'canvasw': canvasw });
        that.setData({ 'canvash': canvash });
      }
    });

  },
  //初始化函数
  initCanvas: function () {
    // 使用 wx.createContext 获取绘图上下文 context
    context = wx.createCanvasContext('canvas');
    context.beginPath()
    context.setStrokeStyle('#000000');
    context.setLineWidth(4);
    context.setLineCap('round');
    context.setLineJoin('round');
  },
  //事件监听
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },
  canvasStart: function (event) {
    isButtonDown = true;
    arrz.push(0);
    arrx.push(event.changedTouches[0].x);
    arry.push(event.changedTouches[0].y);

  },
  canvasMove: function (event) {
    if (isButtonDown) {
      arrz.push(1);
      arrx.push(event.changedTouches[0].x);
      arry.push(event.changedTouches[0].y);

    };

    for (var i = 0; i < arrx.length; i++) {
      if (arrz[i] == 0) {
        context.moveTo(arrx[i], arry[i])
      } else {
        context.lineTo(arrx[i], arry[i])
      };

    };
    context.clearRect(0, 0, canvasw, canvash);
    context.setStrokeStyle('#000000');
    context.setLineWidth(4);
    context.setLineCap('round');
    context.setLineJoin('round');
    context.stroke();

    context.draw(false);
  },
  canvasEnd: function (event) {
    isButtonDown = false;
  },
  //清除画布
  cleardraw: function () {
    //清除画布
    arrx = [];
    arry = [];
    arrz = [];
    if (context) {
      context.clearRect(0, 0, canvasw, canvash);
      context.draw(true);
    }

  },
  //提交签名内容
  setSign: function () {
    var that = this;
    if (arrx.length == 0) {
      wx.showModal({
        title: '提示',
        content: '画板内容不能为空！',
        showCancel: false
      });
      return false;
    };
    console.log("不是空的，canvas即将生成图片");
    //生成图片
    wx.canvasToTempFilePath({
      canvasId: 'canvas',
      success: function (res) {
        console.log("canvas可以生成图片")
        console.log(res.tempFilePath, 'canvas图片地址');
        //that.setData({ canvasimgsrc: res.tempFilePath })
        //that.setData({ src: res.tempFilePath })
        //code 比如上传操作   图片上传
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
        wx.navigateTo({
          url: '../match/match?src=' + res.tempFilePath
        })
        console.log('跳转完成');

      },
      fail: function () {
        console.log("canvas不可以生成图片")
        wx.showModal({
          title: '提示',
          content: '微信当前版本不支持，请更新到最新版本！',
          showCancel: false
        });
      },
      complete: function () {
        //canvas返回图片像素数据
        wx.canvasGetImageData({
          canvasId: 'canvas',
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          success(res) {
            console.log(res.width) // 100
            console.log(res.height) // 100
            console.log(res.data) //返回图片像素数据
            //console.log(res.data instanceof Uint8ClampedArray) // true
            console.log(res.data.length) // 100 * 100 * 4

            //图片转换为base64格式
            let arrayBuffer = upng.encode([res.data.buffer], res.width, res.height)
            var imageBase64 = wx.arrayBufferToBase64(arrayBuffer);
            //console.log(imageBase64);
          }
        });

      }
    });


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.cleardraw();
    //画布初始化执行
    this.startCanvas();

  }
})
