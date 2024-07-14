// pages/editId/editId.js
Page({
  data: {
    currentLength:0,
    Uid:''
  },

 
  onLoad(options) {
  },

 onInput(event){
    this.setData({
      currentLength:event.detail.value.length,
      Uid:event.detail.value
    })
 },
 
 inputContent(){
   const userInfo =wx.getStorageSync('userInfo')||{};
   userInfo.Uid=this.data.Uid;
   wx.setStorageSync('userInfo', userInfo);
   wx.showToast({
     title: '小黄书号已保存',
     icon:'success',
     duration:2000
   });
   console.log('Uid:',this.data.Uid);
   wx.navigateBack();
 },
  onShow() {

  },

})