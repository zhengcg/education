var app = getApp();
var imgSrc=app.globalData.img;
var header=app.globalData.header;
var api=app.globalData.api;
Page({
  data:{
    videoUrl:"",
    videoUrls:"",
    course:{},
    comments:[],
    courseList:[],
    selected:'1',
    name:"playCon",
    price:0,
    content:'',
    code:"",
    pay:[],
    zan:0,
    isShade:false,
    isMine:false,
    imgUrl:"",
    imgUrls:""
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    console.log(options.id);
    var pay=[options.id];
    this.setData({
      pay:pay
    })
    pay.push()
    this.getFilters(options.id)
    this.getComments(options.id);
    this.getCourseList(options.id);
    this.getZan(options.id)
    

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

  },
  authPlay:function(){
    
  },
  getFilters:function(uid){
    var _this=this;      
    try{
      wx.showLoading({
        title: '加载中',
      })
      }catch(err){
        console.log("当前微信版本不支持")
        }        
    wx.request({
          url: api+"api/course/detail",
          method:'GET',
          header: header,
          data:{
            id:uid
            },
          success: function(res) {
            try{wx.hideLoading()}catch(err){console.log("当前微信版本不支持")}      
            _this.setData({
              course:res.data.course,
              videoUrls:res.data.mp4Flu?res.data.mp4Flu:res.data.mp4Hd,
              price:res.data.course.optPrice,
              isMine:res.data.course.mine,
              imgUrls:res.data.course.imgUrl
            }) 
            if(_this.data.price){
                _this.isAuth();
            }
              
          }
        })

  },
  getComments:function(uid){
    var _this=this;      
    try{
      wx.showLoading({
        title: '加载中',
      })
      }catch(err){
        console.log("当前微信版本不支持")
        }        
    wx.request({
          url: api+"api/comment",
          method:'GET',
          header: header,
          // data:{
          //   id:uid
          //   },
          success: function(res) {
            console.log(res.data)
            try{wx.hideLoading()}catch(err){console.log("当前微信版本不支持")}         
            _this.setData({
              comments:res.data.records,           
            })  
          }
        })

  },
  getCourseList:function(uid){
    var _this=this;      
   try{
      wx.showLoading({
        title: '加载中',
      })
      }catch(err){
        console.log("当前微信版本不支持")
        }        
    wx.request({
          url: api+"api/group/courseList",
          method:'GET',
          header: header,
          data:{
            courseId:uid
            },
          success: function(res) {
            console.log(res.data)
            try{wx.hideLoading()}catch(err){console.log("当前微信版本不支持")}         
            _this.setData({
              courseList:res.data.records         
            })  
          }
        })

  },
  
  play:function(){
    var _this=this;
    if(!_this.data.isShade){
      wx.request({
          url: api+"api/course/moniting",
          method:'GET',
          header: header,
          data:{
            id:this.data.course.id,
            uevent:1
            },
          success: function(res) {
            console.log(res.data)           
          }
        })
     
    }
    
    
  },
  ended:function(){
    var _this=this;
    wx.request({
          url: api+"api/course/moniting",
          method:'GET',
          header: header,
          data:{
            id:this.data.course.id,
            uevent:2
            },
          success: function(res) {
            console.log(res.data)           
          }
        })

  },
  tishi:function(){
    wx.showToast({
                    title: '请先购买！',
                    icon: 'fail',
                    duration: 2000
                })

  },
  bofang:function(e){
    this.setData({
      bId:e.currentTarget.dataset.id
    })
    console.log(this.data.bId)
    this.getFilters(e.currentTarget.dataset.id);
    
    
  },
  isAuth:function(){
    var _this=this;
    wx.request({
          url: api+"api/course/detail/auth",
          method:'GET',
          header: header,
          data:{
            id:this.data.course.id
            },
          success: function(res) {
            if(res.data.successed)  {
                _this.setData({
                  isShade:false
                }) 
                          
            }else{
              _this.setData({
                  isShade:true
                }) 
            }
          }
        })

  },
  bindFormSubmit:function(e){
    var _this=this;
    header["content-type"]="application/x-www-form-urlencoded"   
    if(e.detail.value.textarea){
       wx.request({
          url: api+"api/comment",
          method:'POST',
          header: header,
          data:{
            id:_this.data.course.id,
            content:e.detail.value.textarea
            },
          success: function(res) {
            if(res.data.successed){
              wx.showToast({
                    title: '发表成功！',
                    icon: 'fail',
                    duration: 2000
                })
                _this.getComments(_this.data.course.id)       

            }
                  
          }
        })

    }else{
      wx.showToast({
                    title: '请输入评价内容！',
                    icon: 'fail',
                    duration: 2000
                })
    }  
   
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    var _this=this;
    return {
      title: _this.data.course.title, // 分享标题
      path: 'pages/play/play?id='+_this.data.course.id // 分享路径
    }
  },
    addCourse:function(e){
    var _this=this;
    try{
      wx.showLoading({
        title: '加载中',
      })
      }catch(err){
        console.log("当前微信版本不支持")
        }        
       header["content-type"]="application/x-www-form-urlencoded"
     wx.request({
      url: api+"api/user/stu/course",
      method:'POST',
      header:header,
      data:{id:e.currentTarget.dataset.id},
      success: function(res) {
        try{wx.hideLoading()}catch(err){console.log("当前微信版本不支持")}
        if(res.data.successed){
           _this.setData({
              isMine:false
            }) 
            console.log(_this.data.isMine)  
            wx.showToast({
              title: '加入成功',
              icon: 'success',
              duration: 2000             
            })  
                           
        }else{
          wx.showToast({
              title: '加入失败',
              icon: 'fail',
              duration: 2000
            })
        }
      }
    })

  },
   addCar:function(e){
    var _this=this;
    try{
      wx.showLoading({
        title: '加载中',
      })
      }catch(err){
        console.log("当前微信版本不支持")
        }        
      header["content-type"]="application/x-www-form-urlencoded"
     wx.request({
      url: api+"api/order/user/cart",
      method:'POST',
      header:header,
      data:{id:e.currentTarget.dataset.id,type:1},
      success: function(res) {
        try{wx.hideLoading()}catch(err){console.log("当前微信版本不支持")}
        if(res.data.successed){         
            wx.showToast({
              title: '加入成功',
              icon: 'success',
              duration: 2000             
            })  
                             
        }else{
          wx.showToast({
              title: '加入失败',
              icon: 'fail',
              duration: 2000
            })
        }
      }
    })

  },
  gotoPay:function(){
    var _this=this; 
    console.log(this.data.pay)
    header["content-type"]="application/x-www-form-urlencoded";
    wx.login({
          success: function(res) {
            if (res.code) {
               _this.setData({
                code:res.code,                 
              }) 
               wx.request({
                  url: api+"api/order/user/pay",
                  method:'POST',
                  header: header,
                  data:{code:_this.data.code,products:_this.data.pay.toString(),type:1},
                  success: function(res) {
                    if(res.data.successed){
                      var data=res.data.data
                        wx.requestPayment({
                            'timeStamp': data.timeStamp,
                            'nonceStr': data.nonceStr,
                            'package': data.package,
                            'signType': data.signType,
                            'paySign': data.paySign,
                            'success':function(res){
                               wx.showToast({
                                title: "支付成功！",
                                icon: 'success',
                                duration: 2000             
                              })
                             _this.isAuth()
                            },
                            'fail':function(res){
                               wx.showToast({
                                  title: "支付失败！！",
                                  icon: 'success',
                                  duration: 2000             
                                })  
                            }
                          })

                    }else{
                       wx.showToast({
                        title: "支付失败！",
                        icon: 'success',
                        duration: 2000             
                      })  
                    }
                                           
                  }
              })
              
            } else {
                try{wx.hideLoading()}catch(err){console.log("当前微信版本不支持")}
                wx.showToast({
                  title: 'code获取失败',
                  icon: 'fail',
                  duration: 2000
                })
            }
          }
        }); 
   

  },
  removeCourse:function(e){
    var _this=this;
    try{
      wx.showLoading({
        title: '移除中',
      })
      }catch(err){
        console.log("当前微信版本不支持")
        }        
      header["content-type"]="application/x-www-form-urlencoded"
     wx.request({
      url: api+"api/user/stu/course?method=delete",
      method:'POST',
      header:header,
      data:{id:e.currentTarget.dataset.id},
      success: function(res) {
        try{wx.hideLoading()}catch(err){console.log("当前微信版本不支持")}
        if(res.data.successed){         
            wx.showToast({
              title: '移除成功',
              icon: 'success',
              duration: 2000             
            })  
            _this.setData({
              isMine:false
            })                  
        }else{
          wx.showToast({
              title: '移除失败',
              icon: 'fail',
              duration: 2000
            })
        }
      }
    })

  },
  getZan:function(uid){
    var _this=this;      
    try{
      wx.showLoading({
        title: '加载中',
      })
      }catch(err){
        console.log("当前微信版本不支持")
        }        
    wx.request({
          url: api+"api/comment/praise",
          method:'GET',
          header: header,
          data:{
            id:uid
            },
          success: function(res) {
            console.log(res.data)
            try{wx.hideLoading()}catch(err){console.log("当前微信版本不支持")}        
            _this.setData({
              zan:res.data          
            })  
          }
        })

  },
  zan:function(){
    var _this=this;
    header["content-type"]="application/x-www-form-urlencoded"   
       wx.request({
          url: api+"api/comment/praise",
          method:'POST',
          header: header,
          data:{
            id:_this.data.course.id,
            },
          success: function(res) {        
            _this.setData({
              zan:res.data          
            })  
                  
          }
        })

   
  },
  selectTab:function(e){
      console.log(e.target.dataset.id)
      this.setData({
          selected:e.target.dataset.id
      });
      switch(e.target.dataset.id){
        case "1":this.setData({name:"playCon"});break;
        case "2":this.setData({name:"comment"});break;
        case "3":this.setData({name:"course"});break;
      }
  }
})