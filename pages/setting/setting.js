var app = getApp();
var imgSrc=app.globalData.img;
Page({
  data:{
      

  },
  switchChange: function (e){
    console.log('switch 发生 change 事件，携带值为', e.detail.value)
  },
  onLoad:function(options){
   
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
  },
  clearFn:function(){
     wx.clearStorageSync();
     wx.showToast({
        title: '清理完成',
        icon: 'success',
        duration: 2000
      })
  },
  logout:function(out){
    wx.clearStorageSync();
    wx.navigateTo({
                url: '../login/login'
           })
  }
})