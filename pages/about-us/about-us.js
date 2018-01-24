var app = getApp();
var imgSrc=app.globalData.img;
var api=app.globalData.api
Page({
  data:{
    url:{
      aboutUs:api+'api/sys/about'

    },
    obj:{}
  },
  onLoad:function(options){
    var _this=this
    wx.request({
      url: this.data.url.aboutUs,
      method:'GET',
      header: app.globalData.header,
      success: function(res) {
        if(res.data.successed){
          _this.setData({
              obj:res.data.data
            })

        }
        
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  gotoForm:function(){
    wx.navigateTo({
      url: '../agree/agree'
    })

  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})