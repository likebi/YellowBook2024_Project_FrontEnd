// pages/editName/editName.js
Page({
  data: {
    currentLength: 0,
    Bio: ''
  },


  onInput(event) {
    this.setData({
      currentLength: event.detail.value.length,
      Bio: event.detail.value // 更新昵称
    });
  },

  inputContent() {
    // 获取当前存储的用户信息
    const userInfo = wx.getStorageSync('userInfo') || {};
    
    // 更新昵称并存储到本地存储
    userInfo.Bio = this.data.Bio;
    wx.setStorageSync('userInfo', userInfo);

    wx.showToast({
      title: '简介已保存',
      icon: 'success',
      duration: 2000
    });
    console.log('提交的简介:', this.data.Bio);
    wx.navigateBack(); // 返回上一页
  },
});
