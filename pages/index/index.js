var app = getApp();
var imgSrc=app.globalData.img;
var header=app.globalData.header;
var api=app.globalData.api;
Page({
  data: {
    curArray:0,
    searchData:{
      array:['曲靖'],     
    },
    searchInput:"",
    swipeData:{
      indicatorDots: false,//是否显示面板指示点
      autoplay: true,//是否自动切换
      interval: 3000,//自动切换时间间隔
      duration: 1500, //滑动动画时长
      circular:true
    }, 
    imgUrls: [],
    myCourse:[],
    freeCourse:[],
    yourLove:[],
    hotWord:[],
    isHot:true
  },
  
  onLoad:function(options){
    var _this=this;
    // this.checkToken()
    
    // 轮播图
    this.getBanner();
    
    
    // 获取搜索热词
    wx.request({
      url: api+"api/search/hotword",
      method:'GET',
      header: header,
      success: function(res) {      
          _this.setData({
            hotWord:res.data.data
          })    
      }
    })   
    
  },
  onShow:function(){
    this.checkToken()
  },
  checkToken:function(){
    var _this=this;
    wx.checkSession({     
      success: function(){
        if(!wx.getStorageSync('token')){
          _this.registerFn()
        }else{
          //我的课程
          _this.getCourse(api+"api/user/stu/course",2,'myCourse')
          // 获取免课程
          _this.getCourse(api+"api/course/free",4,'freeCourse')
          //推荐
          _this.getCourse(api+"api/course/recm",2,'loveCourse');
        }
          
      },
      fail: function(){      
           _this.registerFn()
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
    var url=api+'api/weixin/login';
    wx.request({
      url: url,
      method:'POST',
      header:{"Content-Type": "application/x-www-form-urlencoded"},
      data:obj,
      success: function(res) {
        try{wx.hideLoading()}catch(err){console.log("当前微信版本不支持")}
        if(res.data.successed){
            wx.setStorageSync('token', res.data.data._T);
            header._T=wx.getStorageSync('token');
             //我的课程
          if(res.data.data.grade&&res.data.data.grade.code>0){
                _this.checkToken()
            }else{
              wx.showModal({
                title: '提示',
                content: '为给您推荐合适的课程，请完善个人信息！',
                success: function(res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '../userinfo/userinfo?index=1'
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
              
            }
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000,
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
  getHot:function(){
    var _this=this;
    _this.setData({
      isHot:false
    })
    
  },
  setHot:function(){
    var _this=this;
    _this.setData({
      isHot:true
    })
  },

  getBanner:function(){
    var _this=this;
     try{ wx.showLoading({
      title: '加载中',
    })}catch(err){console.log("当前微信版本不支持")}
   
    wx.request({
      url: api+"api/sys/ad",
      method:'GET',
      header: header,
      success: function(res) {
         try{wx.hideLoading()}catch(err){console.log("当前微信版本不支持")}
        
        if(res.data.successed){
            var lists=[];
            for(var i=0;i<res.data.data.length;i++){
              var obj={
                id:(((res.data.data[i].goInUrl.split("?"))[1]).split("="))[1],
                imgSrc:api+res.data.data[i].imgSrc,
                title:res.data.data[i].title
              }
              lists.push(obj)
            }
            _this.setData({
              imgUrls:lists
            })
        }       
      }
    })

  },
  getCourse:function(api,size,types){
    var _this=this;
    try{ wx.showLoading({
      title: '加载中',
    })}catch(err){console.log("当前微信版本不支持")}
    wx.request({
      url: api,
      method:'GET',
      header: header,
      data:{currentPage:1,pageSize:size},
      success: function(res) {
       try{wx.hideLoading()}catch(err){console.log("当前微信版本不支持")}
        if(res.data.records){
          if(res.data.records.length>0){
            switch(types){
              case 'myCourse':_this.setData({myCourse:res.data.records});break;
              case 'freeCourse':_this.setData({freeCourse:res.data.records});break;
              case 'loveCourse':_this.setData({loveCourse:res.data.records});break;
            }
        }
        }else{
          wx.clearStorageSync();
           _this.registerFn()
        }       
      }
    })
  },
  gotoPlay:function(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../play/play?id='+e.currentTarget.dataset.id
    })
  },
  gotoCourse:function(){
    wx.navigateTo({
      url: '../myCourse/myCourse'
    })

  },
  gotoFreeCourse:function(){
    wx.navigateTo({
      url: '../freeCourse/freeCourse'
    })

  },
  gotoLoveCourse:function(){
    wx.navigateTo({
      url: '../loveCourse/loveCourse'
    })

  },
  gotoSearch:function(){
    wx.navigateTo({
      url: '../course/course'
    })

  },

  selectArea: function(e) {
    console.log(e.detail.value)
    this.setData({
      curArray: e.detail.value
    })
  },
  searchFn:function(event){
    this.setData({
      searchInput:event.detail.value
    });
    var sublitData={
      id:this.data.curArray,
      value:this.data.searchInput
    }
    wx.navigateTo({
      url: '../course/course?val='+this.data.searchInput
    })

  },
  searchFns:function(e){
    this.setData({
      searchInput:e.currentTarget.dataset.word
    });
    wx.navigateTo({
      url: '../course/course?val='+this.data.searchInput
    })

  }

})





