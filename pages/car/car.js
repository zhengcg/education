var app = getApp();
var imgSrc=app.globalData.img;
var header=app.globalData.header;
var api=app.globalData.api;
var imgSrc=app.globalData.img;
Page({
  data:{
    car: [],
    money:0,
    pay:[],
    checked:false,
    checkAll:false,
    code:""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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
            try{
        wx.hideLoading() 
      }catch(err){
        console.log("当前微信版本不支持")
        }    
           
            if(res.data.successed){
               _this.setData({
                  car:res.data.data,                 
                }) 

            }        
           
          }
        })


  },
  removeCar:function(e){
    var _this=this; 
    var index=e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确认要删除吗？',
      success: function(res) {
        if (res.confirm) {
           try{
      wx.showLoading({
            title: '删除中',
          })
      }catch(err){
        console.log("当前微信版本不支持")
        }    
          
          header["content-type"]="application/x-www-form-urlencoded"
          wx.request({
                url: api+"api/order/user/cart/delete",
                method:'POST',
                header: header,
                data:{id:e.currentTarget.dataset.id,type:1},
                success: function(res) {
                  try{
      wx.hideLoading() 
      }catch(err){
        console.log("当前微信版本不支持")
        }    
                 
                  if(res.data.successed){
                    _this.data.car.splice(index,1)
                    _this.setData({
                        car:_this.data.car,                 
                      }) 
                      wx.showToast({
                        title: res.data.message,
                        icon: 'success',
                        duration: 2000             
                      })      

                  }        
                
                }
              })
           
        } else if (res.cancel) {
          console.log('用户点击取消')
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
  checkboxChange: function(e) {

    if(e.detail.value.length==this.data.car.length){
        this.setData({
          checkAll:true
        })
    }else{
      this.setData({
          checkAll:false
        })
    }
    this.setData({
      pay:e.detail.value
    })
    var array=[];
    for(var i=0;i<e.detail.value.length;i++){
      for(var j=0;j<this.data.car.length;j++){
        if(e.detail.value[i]==this.data.car[j].businessId){
          array.push(this.data.car[j].price);
        }
      }
    }
    var yuan=0;
    for(var m=0;m<array.length;m++){
      yuan+=array[m]
    }
    this.setData({
      money:yuan
    })


  },
  checkedAll:function(e){
    var yuan=0;
    var pays=[]
    for(var i=0;i<this.data.car.length;i++){
      yuan+=this.data.car[i].price;
      pays.push(this.data.car[i].businessId)
    }
    if(e.detail.value.length){
      this.setData({
        checked:true,
        pay:pays,
        money:yuan
      })
    }else{
       this.setData({
        checked:false,
        pay:[],
        money:0
      })
    }
   
    

  },
  gotoPay:function(){
    var _this=this; 
    console.log(this.data.pay)
    header["content-type"]="application/x-www-form-urlencoded";
    if(this.data.pay.length>0){
      wx.login({
          success: function(res) {
            if (res.code) {
               _this.setData({
                code:res.code,                 
              }) 
               wx.request({
                  url: api+"api/order/user/settlement",
                  method:'POST',
                  header: header,
                  data:{code:_this.data.code,products:_this.data.pay.toString()},
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

                              wx.request({
                                  url: api+"api/order/user/cart",
                                  method:'GET',
                                  header: header,
                                  success: function(res) {
                                   try{
      wx.hideLoading() 
      }catch(err){
        console.log("当前微信版本不支持")
        }    
                                    if(res.data.successed){
                                      _this.setData({
                                          car:res.data.data,
                                          checked:false,
                                          checkAll:false

                                        }) 

                                    }        
                                  
                                  }
                                })
  
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
                try{
      wx.hideLoading() 
      }catch(err){
        console.log("当前微信版本不支持")
        }    
                wx.showToast({
                  title: 'code获取失败',
                  icon: 'fail',
                  duration: 2000
                })
            }
          }
        }); 
   
    }else{
      wx.showToast({
                  title: '请选择要购买的课程!',
                  icon: 'fail',
                  duration: 2000
                })
    }
    

  },
  gotoSearch:function(){
    wx.navigateTo({
      url: '../course/course'
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