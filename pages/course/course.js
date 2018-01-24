var app = getApp();
var imgSrc=app.globalData.img;
var header=app.globalData.header;
var api=app.globalData.api;
Page({
  data:{
    optPrice:'',
    page:1,
    pageSize:5,
    page1:1,
    pageSize1:3,
    query:"",
    diffics:"",
    grades:"",
    subjects:"",
    docents:"",
    bookversions:"",
    recommend:"",
    // optPrice:{start:0,end:0},
    scrollLeft: 130,
    selected0:0,
    selected:0,
    selected1:0,
    selected2:0,
    selected3:0,
    type00:[],
    type01:[],
    type02:[],
    type03:[],
    lists:[],
    hotWord:[],
    isHot:true
  },
 
  onLoad:function(options){
    var _this=this
    // 获取过滤数据
    if(options.val){
      this.setData({
            val:options.val,
            query: options.val,
            page:1,
            lists:[]
          });
      this.getSearch()
    }else{
      this.setData({
      query: "",
      page:1,
      val:"",
      lists:[]
    })
    this.getFilters()
    }
    this.filterFn()
    this.replaceFn();
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
  getDocent:function(){
    var _this=this;
     wx.request({
        url: api+"api/docent",
        method:'GET',
        data:{
            grades:_this.data.grades,
            subjects:_this.data.subjects,
            currentPage:1,
           pageSize:_this.data.pageSize1
            },
        header: header,
        success: function(res) {
          _this.setData({
            type03:res.data.data.records,
            page1:2,
          })
        }
      })

  },
  replaceFn:function(){
    var _this=this;
    wx.request({
        url: api+"api/docent",
        method:'GET',
        data:{
            grades:_this.data.grades,
            subjects:_this.data.subjects,
            currentPage:_this.data.page1,
            pageSize:_this.data.pageSize1
            },
        header: header,
        success: function(res) {
          if(res.data.data.records.length>0){
            console.log(111111111111111111)
            _this.setData({
                  page1:_this.data.page1+1,
                  type03:res.data.data.records
                })
                console.log(_this.data.page1)
          }else{
            _this.getDocent()
          }          
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
  moreFn:function(){
    this.setData({
      query: "",
      page:1,
      val:"",
      lists:[]
    })
    this.getFilters()
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
          page1:1,
          lists:[]
        })
        this.getFilters()  
        this.replaceFn()
    

  },
  selectedT02:function(e){
    this.setData({
          selected1:e.target.dataset.id,
          subjects:e.target.dataset.id==0?"":e.target.dataset.id,
          page:1,
          page1:1,
          lists:[]
        })
        this.getFilters()  
        this.replaceFn()
   

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
  selectedT04:function(e){
    var price
    if(e.target.dataset.id=="1"){
      price=0
    }else{
      price=""
    }
     this.setData({
          selected3:e.target.dataset.id,
          optPrice:price,
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
    this.getSearch()  
  },
  getSearch:function(){
    var _this=this;  
    try{
      wx.showLoading({
        title: '加载中',
      })
      }catch(err){
        console.log("当前微信版本不支持")
        }        
    
    wx.request({
          url: api+"api/search",
          method:'GET',
          header: header,
          data:{
            query:_this.data.query,
            currentPage:_this.data.page,
            pageSize:_this.data.pageSize
            },
          success: function(res) {
            try{wx.hideLoading()}catch(err){console.log("当前微信版本不支持")}       
            if(res.data.length){
              _this.setData({
                  page:_this.data.page+1,
                  lists:_this.data.lists.concat(res.data)
                })
            }else{
              wx.showToast({
                    title: '没有了！',
                    icon: 'fail',
                    duration: 2000
                  })
            }
            
            
          }
        })

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
          url: api+"api/course",
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
            optPrice:_this.data.optPrice,    //可选，课程价格范围最大值。
            currentPage:_this.data.page,
            pageSize:_this.data.pageSize
            },
          success: function(res) {
            try{wx.hideLoading()}catch(err){console.log("当前微信版本不支持")}         
            if(res.data.length){
              _this.setData({
                  page:_this.data.page+1,
                  lists:_this.data.lists.concat(res.data)
                })
            }else{
              wx.showToast({
                    title: '没有了！',
                    icon: 'fail',
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
              icon: 'fail',
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
  searchFns:function(e){
     this.setData({
            val:e.currentTarget.dataset.word,
            query: e.currentTarget.dataset.word,
            page:1,
            lists:[]
          });
      this.getSearch()

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