var app = getApp();
var imgSrc=app.globalData.img;
var api=app.globalData.api
Page({
  data:{
      url:{
      aboutUs:api+'api/sys/agreement'

    },
      obj:""
    
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    var _this=this
    wx.request({
      url: this.data.url.aboutUs,
      method:'GET',
      header: app.globalData.header,
      success: function(res) {
          _this.setData({
              obj:res.data.data
            })
       
      }
    })
    
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
   
  }
})