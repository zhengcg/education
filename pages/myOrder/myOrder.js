var app = getApp();
var imgSrc=app.globalData.img;
var header=app.globalData.header;
var api=app.globalData.api;
Page({
  data:{
    lists:[],
    selected:'1',
    page:1,
    pageSize:5,
    code:""
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    this.getFilters()
    

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
  getFilters:function(){
     var _this=this;      
   try{
      wx.showLoading({
        title: '加载中',
      })
      }catch(err){
        console.log("当前微信版本不支持")
        }        
    wx.request({
          url: api+"api/user/order",
          method:'GET',
          header: header,
          data:{state:this.data.selected,currentPage:this.data.page},
          success: function(res) {
           try{wx.hideLoading()}catch(err){console.log("当前微信版本不支持")}
            if(res.data.successed){
               if(res.data.data.records){
                 if(res.data.data.records.length){
                  _this.setData({
                      page:_this.data.page+1,
                      lists:_this.data.lists.concat(res.data.data.records)
                    })
                   
                }else{
                  wx.showToast({
                        title: '没有了！',
                        icon: 'fail',
                        duration: 2000
                      })
                }

               }
              
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

  deleteOrder:function(e){
      var orderId=e.currentTarget.dataset.id;
      var index=e.currentTarget.dataset.index;
      console.log(orderId);
      var _this=this; 
        wx.showModal({
        title: '提示',
        content: '确认要删除吗？',
        success: function(res) {
            if (res.confirm) {
            try{
      wx.showLoading({
        title: '加载中',
      })
      }catch(err){
        console.log("当前微信版本不支持")
        }        
            header["content-type"]="application/x-www-form-urlencoded"
            wx.request({
                    url: api+"api/user/order/delete",
                    method:'POST',
                    header: header,
                    data:{orderId:orderId},
                    success: function(res) {
                   try{wx.hideLoading()}catch(err){console.log("当前微信版本不支持")}
                    if(res.data.successed){
                        _this.setData({
                                    page:1,
                                    lists:[]
                                    })
                        _this.getFilters();  
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
  payOrder:function(e){
      var orderId=e.currentTarget.dataset.id;
      console.log(orderId);
      var _this=this; 
    header["content-type"]="application/x-www-form-urlencoded";
    wx.login({
          success: function(res) {
            if (res.code) {
               _this.setData({
                code:res.code,                 
              }) 
               wx.request({
                  url: api+"api/user/order",
                  method:'POST',
                  header: header,
                  data:{code:_this.data.code,orderId:orderId},
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
                                _this.setData({
                                    page:1,
                                    lists:[]
                                    })
                                _this.getFilters()
                               wx.showToast({
                                title: "支付成功！",
                                icon: 'success',
                                duration: 2000             
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

  selectTab:function(e){
      this.setData({
          selected:e.target.dataset.id,
          page:1,
          lists:[]
          })
                          
        this.getFilters()  
  },
  onReachBottom:function(){
    this.getFilters()   
  }
})