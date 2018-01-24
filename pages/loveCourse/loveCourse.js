var app = getApp();
var imgSrc=app.globalData.img;
var header=app.globalData.header;
var api=app.globalData.api;
Page({
  data:{
    page:1,
    pageSize:5,
    query:"",
    diffics:"",
    grades:"",
    subjects:"",
    docents:"",
    bookversions:"",
    recommend:"",
    optPrice:{start:0,end:0},
    scrollLeft: 130,
    selected0:0,
    selected:0,
    selected1:0,
    selected2:0,
    type00:[],
    type01:[],
    type02:[],
    type03:[],
    lists:[]
  },
 
  onLoad:function(options){
    // 获取过滤数据
    // this.filterFn()
    this.getFilters();
    // this.getDocent();
  },
  getDocent:function(){
    var _this=this;
     wx.request({
        url: api+"api/docent",
        method:'GET',
        header: header,
        success: function(res) {
          _this.setData({
            type03:res.data.data.records
          })
        }
      })

  },
  filterFn:function(){
    var _this=this;
     wx.request({
        url: api+"api/course/category",
        method:'GET',
        header: header,
        success: function(res) {
          _this.setData({
            type00:res.data.diffics,
            type01:res.data.grades,
            type02:res.data.subjects,
          })
        }
      })

  },

   selectedT00:function(e){
        this.setData({
          selected0:e.target.dataset.id,
          diffics:e.target.dataset.id==0?"":e.target.dataset.id,
          page:1,
          lists:[]
        })
        this.getFilters()   

  },
   selectedT01:function(e){
      this.setData({
          selected:e.target.dataset.id,
          grades:e.target.dataset.id==0?"":e.target.dataset.id,
          page:1,
          lists:[]
        })
        this.getFilters()  
    

  },
  selectedT02:function(e){
    this.setData({
          selected1:e.target.dataset.id,
          subjects:e.target.dataset.id==0?"":e.target.dataset.id,
          page:1,
          lists:[]
        })
        this.getFilters()  
   

  },
  selectedT03:function(e){
     this.setData({
          selected2:e.target.dataset.id,
          docents:e.target.dataset.id==0?"":e.target.dataset.id,
          page:1,
          lists:[]
        })
        this.getFilters()  
  },
  searchFn:function(e){
    console.log(e.detail.value)
    this.setData({
      query: e.detail.value,
      page:1,
      lists:[]
    })
    this.getFilters()
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
          url: api+"api/course/recm",
          method:'GET',
          header: header,
          data:{
            query:_this.data.query,
            diffics:_this.data.diffics,
            grades :_this.data.grades,         //可选，年级的编码，多个用逗号隔开。
            subjects :_this.data.subjects,       //可选，科目的编码，多个用逗号隔开。
            docents :_this.data.docents,    //可选，讲师的id，多个用逗号隔开。
            bookversions :_this.data.bookversions,  //可选，教材版本id，多个用逗号隔开。
            recommend :_this.data.recommend,      //可选，是否推荐。
            // optPrice:_this.data.optPrice,    //可选，课程价格范围最大值。
            currentPage:_this.data.page,
            pageSize:_this.data.pageSize
            },
          success: function(res) {
            try{wx.hideLoading()}catch(err){console.log("当前微信版本不支持")}       
            if(res.data.records.length>0){
              _this.setData({
                  page:_this.data.page+1,
                  lists:_this.data.lists.concat(res.data.records)
                })
            }else{
              wx.showToast({
                  title: '没有了!',
                  icon: 'success',
                  duration: 2000
              })      
            }
            
            
          }
        })

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
              icon: 'success',
              duration: 2000
            })
        }
      }
    })

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
                  page:1,
                  lists:[]
                })
            _this.getFilters()  
            
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
  gotoPlay:function(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../play/play?id='+e.currentTarget.dataset.id
    })
  },
  gotoCar:function(){
    wx.navigateTo({
      url: '../car/car'
    })

  },
  onReachBottom:function(){
    this.getFilters()   
  }
})