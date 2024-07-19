// pages/editName/editName.js
Page({
  data: {
    currentLength: 0,
    nickname: ''
  },

  onLoad(options) {
    this.loadNickname(); // 加载存储中的昵称
  },

  onInput(event) {
    this.setData({
      currentLength: event.detail.value.length,
      nickname: event.detail.value // 更新昵称
    });
  },

  inputContent() {
    // 获取当前存储的用户信息
    const userInfo = wx.getStorageSync('userInfo') || {};
    
    // 更新昵称并存储到本地存储
    userInfo.nickname = this.data.nickname;
    wx.setStorageSync('userInfo', userInfo);

    wx.showToast({
      title: '昵称已保存',
      icon: 'success',
      duration: 2000
    });
    console.log('提交的昵称:', this.data.nickname);
    wx.navigateBack(); // 返回上一页
  },
});
