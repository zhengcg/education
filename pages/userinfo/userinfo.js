var app = getApp();
var imgSrc=app.globalData.img;
var header=app.globalData.header;
var api=app.globalData.api;
Page({
  data:{
    gradeCode:[0,1,2,3,4,5,6,7,8,9,10,11,12],
    areaCode:[1,2,3,4],
    curArray:0,
    curArea:0,
    classAge:{
      array:[' ','小一', '小二', '小三','小四','小五','小六','初一','初二','初三','高一','高二','高三'],     
    },
    classArea:{
      array:['北京','上海','广州','深圳']
      },
    birthday: '2016-09-01',
    items: [
      {name: 'y', value: '男',checked: 'true'},
      {name: 'x', value: '女'},
      {name: 'xy', value: '保密'},
      
    ] ,
    tel:'',
    wx:'',
    QQ:'',
    email:'' ,
    index:'' 
  },
  radioChange: function(e) {

    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      sex:e.detail.value
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var _this=this;
    this.setData({
      index:options.index
    })
    wx.getUserInfo({
      success: function(res) {
        _this.setData({
          avatarUrl:res.userInfo.avatarUrl,
          nickName:res.userInfo.nickName,          

        })

      }
    })


  },
  onReady:function(){ 
    // 页面渲染完成
  },
  onShow:function(){
    var _this=this;
    // 页面显示
        wx.request({
      url: api+'api/user', //仅为示例，并非真实的接口地址
      method:'GET',
      header:header,
      success: function(res) {
        if(res.data.successed){
            _this.setData({
                code:res.data.data.code,
                avatarUrl:res.data.data.phont,
                name:res.data.data.name,
                id:res.data.data.id,
                curArray:res.data.data.grade.code,
                birthday:res.data.data.birthday,
                tel:res.data.data.phone,
                wx:'',
                QQ:res.data.data.qq,
                email:res.data.data.email
              })
        }else{
            wx.clearStorageSync();
            wx.navigateTo({
                  url: '../login/login'
            })
        }
        
      }
    })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
    // 获取用户信息
  },
  selectArea: function(e) {
    this.setData({
      curArray: e.detail.value
    })
  },
  changeArea:function(e){
      this.setData({
        curArea: e.detail.value
      })
  },
  bindDateChange: function(e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  chooseImg:function(){
    var _this=this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        wx.getImageInfo({
          src: tempFilePaths[0],
          success: function (res) {
            _this.setData({
              header:tempFilePaths[0]
            })
          }
        })
      }
    })

  },
  setName:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  setMotto:function(e){
    this.setData({
      motto:e.detail.value
    })
  },
  setPhone:function(e){
    this.setData({
      phone:e.detail.value
    })
  },
  setQQ:function(e){
    this.setData({
      QQ:e.detail.value
    })
  },
  setEmail:function(e){
    this.setData({
      email:e.detail.value
    })
  },
  submitForm:function(){
      var _this=this;
      var obj={
        id:this.data.id,
        code:this.data.code,
        name:this.data.name,
        motto:this.data.motto,
        phone:this.data.phone,
        email:this.data.email,
        region:this.data.classArea.array[this.data.curArea],
        grade:{
          code:this.data.gradeCode[this.data.curArray],
          name:this.data.classAge.array[this.data.curArray]
        },
        level:{},
        birthday:this.data.birthday,
        country:'',
        sex:this.data.sex,
        qq:this.data.QQ

      }
      if(obj.grade.code==0){
        wx.showModal({
            title: '提示',
            content: '请选择年级',
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
      }else{
          try{
          wx.showLoading({
            title: '加载中',
          })
          }catch(err){
            console.log("当前微信版本不支持")
            }        
         wx.request({
            url: api+'api/user', //仅为示例，并非真实的接口地址
            method:'PUT',
            header: app.globalData.header,
            data:obj,
            success: function(res) {
              try{wx.hideLoading()}catch(err){console.log("当前微信版本不支持")}
              if(res.data.successed){
                  wx.showToast({
                    title: '修改成功',
                    icon: 'success',
                    duration: 2000,
                  })  
                  if(_this.data.index==1){
                    wx.switchTab({
                        url: '../index/index'
                      })
                  }                  

              }else{
                wx.showToast({
                    title: '修改失败',
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

      }

     
    
  }
})