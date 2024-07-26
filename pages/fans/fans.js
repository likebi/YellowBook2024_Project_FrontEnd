// pages/fansList/fansList.js
Page({
  data: {
    fansList: []
  },

  onLoad() {
    this.fetchFansList();
  },

  fetchFansList() {
    const token = wx.getStorageSync('userToken'); // 从本地存储中获取 token
    let Uid = wx.getStorageSync('Uid');
  
    if (!token) {
      console.error('未找到授权 token');
      return;
    }
    wx.request({
      url: `http://localhost:3000/follow/getFansList/${Uid}`, // 替换为你的后端 API 地址
      method: 'GET',
      header: {
        'Authorization': token
      },
      success: (res) => {
        console.log('Response data:', res.data); // 调试输出
        if (res.data.code === 200) {
          // 将返回的数据设置到 page 的 fansList 数据中
          this.setData({
            fansList: res.data.data
          });
        } else {
          console.error('获取数据失败:', res.data.msg);
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
      }
    });
  },

  // 处理返回事件
  onBack() {
    wx.navigateBack();
  }
});
