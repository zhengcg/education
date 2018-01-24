var app = getApp();
var imgSrc=app.globalData.img;
Page({
  data:{
    onload: ["../../images/common/onlond.png"],
    // 底部组件按钮
    menu1: [imgSrc+"index-light1.png"],
    menu2: [imgSrc+"index-2.png"],
    menu3: [imgSrc+"index-book1.png"],
    menu4: [imgSrc+"index-head2.png"],

  },
   // 首页
  gotoIndex: function() {
    wx.navigateTo({
      url: '../index/index'
    })
  },

  // 会员
  gotoMember: function() {
    wx.navigateTo({
      url: '../../my/my'
    })
  },

  // 个人中心
  gotoCenter: function() {
    wx.navigateTo({
      url: '../my/my'
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})