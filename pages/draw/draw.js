var upng = require('../../utils/upng-js/UPNG.js')
var context = null;// 使用 wx.createContext 获取绘图上下文 context
var isButtonDown = false;//是否在绘制中
var arrx = [];//动作横坐标
var arry = [];//动作纵坐标
var arrz = [];//总做状态，标识按下到抬起的一个组合
var canvasw = 0;//画布宽度
var canvash = 0;//画布高度
var arrE = [];//每一笔动作路径
var arrPath = [];//总动作路径
Page({
  /**
 * 页面的初始数据
 */
  data: {
    //canvas宽高
    canvasw: 0,
    canvash: 0,
    //canvas生成的图片路径
    canvasimgsrc: "",
    arrlx :[],
    arrly:[],
  },
  scale: function (b) {
    var len = b.length;
    for (var i = 0;i < len; i++) {
      if (b[i] instanceof Array) {
        this.scale(b[i]);
      } else {
        b[i] /= 1.2;
      }
    }
    return b;
  },
  //画布初始化执行
  startCanvas: function () {
    var that = this;
    //创建canvas
    this.initCanvas();
    //获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        canvasw = res.windowWidth - 0;//设备宽度
        //canvasw = res.windowWidth - 100;//设备宽度
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
    arrE=[];
    arrz.push(0);
    arrx.push(event.changedTouches[0].x);
    arry.push(event.changedTouches[0].y);

  },
  canvasMove: function (event) {
    if (isButtonDown) {
      if (event.changedTouches[0].x > 275 ||
        event.changedTouches[0].x <0 ||
        event.changedTouches[0].y<0 || event.changedTouches[0].y > 275) {
          isButtonDown = false;
          return;
        }
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
    var that = this;
    var lenx = that.data.arrlx.length;
    var leny = that.data.arrly.length;
    var arrx1 = arrx.slice(lenx, arrx.length);
    var arry1 = arry.slice(leny, arry.length);
    isButtonDown = false;
    arrE.push(arrx1);
    arrE.push(arry1);
    arrPath.push(arrE);
    that.setData({
      arrlx: arrx,
      arrly: arry,
    })
  },
  //清除画布
  cleardraw: function () {
    var that = this;
    //清除画布
    arrE = [];
    arrPath = [];
    arrx = [];
    arry = [];
    arrz = [];
    that.setData({
      arrlx: [],
      arrly: []
    })
    if (context) {
      context.clearRect(0, 0, canvasw, canvash);
      context.draw(true);
    }

  },
  //提交签名内容
  setSign: function () {
    console.log(this.scale(arrPath));
   // console.log(arrPath);
    var that = this;
    if (arrx.length == 0) {
      wx.showModal({
        title: '提示',
        content: '画板内容不能为空！',
        showCancel: false
      });
      return false;
    };

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.cleardraw();
    //画布初始化执行
    this.startCanvas();
  },

}) 
