// pages/editName/editName.js
Page({
  data: {
    currentLength: 0,
    Bio: ''
  },

  onInput(event) {
    this.setData({
      currentLength: event.detail.value.length,
      Bio: event.detail.value // 更新简介
    });
  },

  inputContent() {
    // 获取当前存储的用户信息
    const userInfo = wx.getStorageSync('userInfo') || {};
  
    console.log('UserInfo:', userInfo); // 检查获取的用户信息
  
    // 更新简介并存储到本地存储
    userInfo.Bio = this.data.Bio;
    wx.setStorageSync('userInfo', userInfo);
  
    // 获取 token 和其他信息
    const token = wx.getStorageSync('userToken'); // 获取 token
    const uid = userInfo.Uid || wx.getStorageSync('Uid'); // 确保获取到的 UID
    const nickname = userInfo.nickname || wx.getStorageSync('nickname');
    const intro_user = userInfo.Bio; // 使用更新后的 Bio 作为简介
  
    console.log('Token:', token); // 检查 token
    console.log('Uid:', uid); // 检查 uid
    console.log('Nickname:', nickname); // 检查 nickname
    console.log('Bio:', intro_user); // 检查 Bio
  
    if (!token || !uid || !intro_user) {
      wx.showToast({
        title: '缺少必要的信息',
        icon: 'none',
        duration: 2000
      });
      console.error('缺少必要的信息:', { token, uid, intro_user });
      return;
    }
  
    // 发送请求到服务器
    wx.request({
      url: 'http://localhost:3000/saveUserBio', // 后端接口地址
      method: 'POST',
      data: {
        nickname, // 将 nickname 也发送到服务器
        Uid: uid,
        userImage: userInfo.userImage,
        intro_user
      },
      header: {
        'Authorization': token,
        'Content-Type': 'application/json' // 确保请求内容类型正确
      },
      success(res) {
        if (res.data.code === 200) {
          wx.showToast({
            title: '简介已保存',
            icon: 'success',
            duration: 2000
          });
          console.log('服务器响应:', res.data);
          wx.navigateBack(); // 返回上一页
        } else {
          wx.showToast({
            title: '保存失败',
            icon: 'none',
            duration: 2000
          });
          console.error('服务器错误:', res.data.msg);
        }
      },
      fail(err) {
        wx.showToast({
          title: '请求失败',
          icon: 'none',
          duration: 2000
        });
        console.error('请求失败:', err);
      }
    });
  }
});
