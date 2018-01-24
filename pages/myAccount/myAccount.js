var app = getApp();
var imgSrc=app.globalData.img;
Page({
  data:{
      account:"0.00",
      out:[imgSrc+"common-scroll.png"],
      url:{
      account:app.globalData.api+'/api/user/account'

    }
    
  },
  onLoad:function(options){
    var _this=this
    wx.request({
      url: this.data.url.account,
      method:'GET',
      header: app.globalData.header,
      success: function(res) {
        _this.setData({
          account:res.data.birthday
        })
        console.log(res.data)
      }
    })
    
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