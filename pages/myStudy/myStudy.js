var app = getApp();
var imgSrc=app.globalData.img;
var header=app.globalData.header;
var api=app.globalData.api;
Page({
  data:{
      selected:true,
      selected1:false,
      selected2:false,
      selected3:false,
      selected4:false,
      uid:1,
      listData:[],
      videoIcon:["../../imagesvideo.png"],
      audioIcon:["../../imagesvideo.png"],
    
  },
  selected:function(){
      this.setData({
            selected:true,
            selected1:false,
            selected2:false,
            selected3:false,
            selected4:false,
            uid:1
        })
        this.getSlog();
  },
  selected1:function(){
      this.setData({
            selected:false,
            selected1:true,
            selected2:false,
            selected3:false,
            selected4:false,
            uid:2
        })
        this.getSlog();
  },
  selected2:function(){
      this.setData({
            selected:false,
            selected1:false,
            selected2:true,
            selected3:false,
            selected4:false,
            uid:3
        })
        this.getSlog();
  },
  selected3:function(){
      this.setData({
            selected:false,
            selected1:false,
            selected2:false,
            selected3:true,
            selected4:false,
            uid:4
        })
        this.getSlog();
  },
  selected4:function(){
      this.setData({
            selected:false,
            selected1:false,
            selected2:false,
            selected3:false,
            selected4:true,
            uid:5
        })
  },
  getSlog:function(){
     var _this=this;      
     try{
      wx.showLoading({
        title: '加载中',
      })
      }catch(err){
        console.log("当前微信版本不支持")
        }        
      wx.request({
            url: api+"api/user/stu/course/slog",
            method:'GET',
            header: header,
            data:{
              statPeriod:this.data.uid
              },
            success: function(res) {
              try{wx.hideLoading()}catch(err){console.log("当前微信版本不支持")}
              if(res.successed){
                if(res.data.records.length>0){
                  _this.setData({
                    listData:res.data,                    
                  })  
                }
              }        
              
            }
          })

  },
  onLoad:function(options){
    this.getSlog();
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