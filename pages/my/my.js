var app = getApp();
var imgSrc=app.globalData.img;
Page({
  data:{
    icon1: ["../../images/icon1.png"],
    icon2: ["../../images/icon2.png"],
    icon3: ["../../images/icon3.png"],
    icon4: ["../../images/icon4.png"],
    icon5: ["../../images/icon5.png"],
    icon6: ["../../images/icon6.png"],
    icon7: ["../../images/icon7.png"],
    out: ["../../images/common-scroll.png"]
  },
  
   //订单
  gotoForm: function() {
    wx.navigateTo({
      url: '../myOrder/myOrder'
    })
  },
  gotoMyAccount:function(){
    wx.navigateTo({
      url: '../myAccount/myAccount'
    })
  },
  gotoMyMessage:function(){
    wx.navigateTo({
      url: '../myMessage/myMessage'
    })
  },
  gotoMyStudy:function(){
    wx.navigateTo({
      url: '../myStudy/myStudy'
    })
  },
  gotoCar:function(){
    console.log("出发了呀")
    wx.navigateTo({
      url: '../car/car'
    })

  },
  setting:function(){
    wx.navigateTo({
      url: '../setting/setting'
    })

  },
   //个人信息
   toUserInfo: function() {
    wx.navigateTo({
      url: '../userinfo/userinfo'
    })
  },
    toaboutUs: function() {
    wx.navigateTo({
      url: '../about-us/about-us'
    })
  },
  onLoad:function(){
    var _this=this;
    wx.getUserInfo({
      success: function(res) {
        _this.setData({
          avatarUrl:res.userInfo.avatarUrl,
          nickName:res.userInfo.nickName
        })

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