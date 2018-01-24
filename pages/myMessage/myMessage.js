var app = getApp();
var imgSrc=app.globalData.img;
var header=app.globalData.header;
var api=app.globalData.api;
var imgSrc=app.globalData.img;
Page({
  data:{
      lists:[]
    
  },
  onLoad:function(options){
    var _this=this;      
   try{
      wx.showLoading({
        title: '加载中',
      })
      }catch(err){
        console.log("当前微信版本不支持")
        }        
    wx.request({
          url: api+"api/order/user/cart",
          method:'GET',
          header: header,
          success: function(res) {
            try{wx.hideLoading()}catch(err){console.log("当前微信版本不支持")}
            if(res.data.successed){
               _this.setData({
                  lists:res.data.data,                 
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
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})