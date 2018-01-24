//app.js
App({

  onLaunch: function () {   
    var _this=this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        _this.globalData.header._P=longitude+","+latitude;
      }
    })   
    wx.getSystemInfo({
        success: function(res) {
          _this.globalData.header._S="wex_"+res.version        
        }
      })
     

 
  },
  registerFn:function(){
    var _this=this;
    try
      {
        wx.showLoading({
          title: '请求登录中',
        })
      }
      catch(err)
      {
        console.log("当前微信版本不支持")
      }
    
     wx.login({
          success: function(res) {
            if (res.code) {
              _this.getUserInfo(res.code)
              
            } else {
              try{wx.hideLoading()}catch(err){console.log("当前微信版本不支持")}
                
                wx.showToast({
                  title: '调微信登录接口失败！',
                  icon: 'fail',
                  duration: 2000
                })
            }
          }
        }); 
  },
  sendLogin:function(obj){
    //发起网络请求
    var _this=this;
    var url=_this.globalData.api+'api/weixin/login';
    wx.request({
      url: url,
      method:'POST',
      header:{"Content-Type": "application/x-www-form-urlencoded"},
      data:obj,
      success: function(res) {
        try{wx.hideLoading()}catch(err){console.log("当前微信版本不支持")}
        if(res.data.successed){
            wx.setStorageSync('token', res.data.data._T);
            _this.globalData.header._T=wx.getStorageSync('token')
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000,
              success:function(){
                wx.switchTab({
                  url: "../index/index"
                })
              }
            })
                     

        }else{
          wx.showToast({
              title: '失败',
              icon: 'fail',
              duration: 2000
            })

        }
      },
      fail:function(){
         try{wx.hideLoading()}catch(err){console.log("当前微信版本不支持")}
        wx.showToast({
              title: '接口调用失败！',
              icon: 'fail',
              duration: 2000
        })
      }
    })

  },
  getUserInfo:function(code){
    var _this=this;
    wx.getUserInfo({
      withCredentials:true,
      success: function(res) {
        var sendData={
          "code":code,
          "ed":res.encryptedData,
          "iv":res.iv
        }
        console.log(sendData)
        _this.sendLogin(sendData)

      }
    })
  },
 

  globalData:{
    img:"http://192.168.1.106:8080/images/",
    api:'https://www.qsk12.org/sgw-v1/',
    header:{
      'content-type': 'application/json',
      '_S':'',
      '_T':wx.getStorageSync('token')||"",
      '_P':'',
      '_V':'1.0.0',
      '_PC':'KS'
    }
  },

})



// wx.getUserInfo({
//   success: function(res) {
//     var userInfo = res.userInfo
//     var nickName = userInfo.nickName
//     var avatarUrl = userInfo.avatarUrl
//     var gender = userInfo.gender //性别 0：未知、1：男、2：女
//     var province = userInfo.province
//     var city = userInfo.city
//     var country = userInfo.country
//   }
// })